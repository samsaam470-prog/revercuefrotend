/* ============================================================
   Revercue — /ai-demo simulation
   Client-side only. No network requests, no storage.
   Every figure below is synthetic and generated for this page.
   ============================================================ */

(function () {
  "use strict";

  document.body.classList.add("has-js");

  var START_CLOCK = 10 * 60 + 20; // 10:20
  var INVOICE_TOTAL = 7776;
  var session = 1;

  function initialState() {
    return {
      clock: START_CLOCK,
      stats: { docs: 4, clients: 3, followups: 1, revenue: 0, pending: INVOICE_TOTAL },
      proposal: { status: "awaiting decision", pkg: null, price: 0 },
      contract: { status: "awaiting decision" },
      form: { status: "not submitted" },
      invoice: { status: "unpaid" },
      suggestion: { dismissed: false },
      observations: [],
      log: [
        { time: "09:12", text: "Proposal shared with Mara Ellis at Northlight Studio." },
        { time: "10:04", text: "Proposal opened by the client." }
      ]
    };
  }

  var state = initialState();

  var $ = function (id) {
    return document.getElementById(id);
  };

  var pad = function (n) {
    return n < 10 ? "0" + n : String(n);
  };

  function fmtTime(minutes) {
    var h = Math.floor(minutes / 60) % 24;
    var m = minutes % 60;
    return pad(h) + ":" + pad(m);
  }

  function money(n) {
    return "$" + n.toLocaleString("en-US");
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text;
  }

  /* ---------------- rendering ---------------- */

  function renderStats() {
    setText("stat-docs", String(state.stats.docs));
    setText("stat-clients", String(state.stats.clients));
    setText("stat-followups", String(state.stats.followups));
    setText("stat-revenue", money(state.stats.revenue));
    if (state.stats.pending > 0) {
      setText("pending-line", money(state.stats.pending) + " pending across 1 unpaid invoice.");
    } else {
      setText("pending-line", "Nothing pending for this client.");
    }
    var dot = $("pending-dot");
    if (dot) dot.className = state.stats.pending > 0 ? "dot" : "dot done";
  }

  function renderProposal() {
    setText("proposal-status", state.proposal.status);
    var picked = $("proposal-picked");
    if (picked) {
      picked.textContent = state.proposal.pkg
        ? "Package selected: " + state.proposal.pkg + " at " + money(state.proposal.price) + "."
        : "No package selected yet.";
    }
    var dot = $("proposal-dot");
    if (dot) dot.className = state.proposal.pkg ? "dot done" : "dot";
    var buttons = document.querySelectorAll("[data-package]");
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      var on = b.getAttribute("data-package") === state.proposal.pkg;
      b.setAttribute("aria-pressed", on ? "true" : "false");
    }
    setText("record-proposal", state.proposal.pkg ? "package selected — " + state.proposal.pkg : state.proposal.status);
  }

  function renderContract() {
    setText("contract-status", state.contract.status);
    setText("record-contract", state.contract.status);
    var dot = $("contract-dot");
    if (dot) dot.className = state.contract.status === "approved" ? "dot done" : "dot";

    var stateLine = $("contract-state");
    if (stateLine) {
      if (state.contract.status === "approved") {
        stateLine.textContent = "Approved. The decision is written to the client record with a timestamp.";
      } else if (state.contract.status === "declined") {
        stateLine.textContent = "Declined. Nothing downstream was created.";
      } else if (state.contract.status === "question") {
        stateLine.textContent = "Question raised. The contract stays open, and the question is in the log.";
      } else {
        stateLine.textContent = "No action taken yet.";
      }
    }
    var next = $("contract-next");
    if (next) {
      next.textContent =
        state.contract.status === "approved"
          ? "Because this contract is set to continue, the next document is the requirement form and then the invoice. Nothing is sent automatically."
          : "After approval, this contract is set to continue into the requirement form and then the invoice.";
    }
  }

  function renderForm() {
    setText("form-status", state.form.status);
    setText("record-form", state.form.status);
  }

  function renderInvoice() {
    setText("invoice-status", state.invoice.status);
    setText("record-invoice", state.invoice.status);
    var dot = $("invoice-dot");
    if (dot) dot.className = state.invoice.status === "paid" ? "dot done" : "dot";
    var line = $("invoice-state");
    if (line) {
      if (state.invoice.status === "paid") {
        line.textContent = "Payment confirmed in this simulation: $7,776 booked as revenue this month.";
      } else if (state.invoice.status === "overdue") {
        line.textContent = "Marked overdue. No payment recorded, and the pending line is unchanged.";
      } else {
        line.textContent = "No payment recorded.";
      }
    }
    var paidBtn = $("invoice-paid");
    if (paidBtn) paidBtn.disabled = state.invoice.status === "paid";
    var overdueBtn = $("invoice-overdue");
    if (overdueBtn) overdueBtn.disabled = state.invoice.status === "paid" || state.invoice.status === "overdue";
  }

  function currentSuggestion() {
    if (state.suggestion.dismissed) return null;
    if (state.invoice.status === "paid") return null;
    if (state.contract.status === "approved") {
      return {
        reason: "Contract approved in this session, no payment recorded.",
        text: "Raise or resend the invoice for the approved package.",
        goto: "invoice"
      };
    }
    if (state.contract.status === "declined") {
      return {
        reason: "Contract declined after a package was selected.",
        text: "Ask what changed before the thread closes.",
        goto: "contract"
      };
    }
    if (state.form.status === "submitted") {
      return {
        reason: "Requirement form submitted, contract still awaiting a decision.",
        text: "Send the contract for the agreed scope.",
        goto: "contract"
      };
    }
    return {
      reason: "Proposal opened twice, no reply after three days.",
      text: "Send a short follow-up about the scope, or offer the Foundation package.",
      goto: "proposal"
    };
  }

  function renderSuggestion() {
    var s = currentSuggestion();
    var reasonEl = $("suggestion-reason");
    var textEl = $("suggestion-text");
    var doBtn = $("suggestion-do");
    var dismissBtn = $("suggestion-dismiss");

    if (!s) {
      if (reasonEl) reasonEl.textContent = "No rule matched the current state.";
      if (textEl) {
        textEl.textContent = state.suggestion.dismissed
          ? "The suggestion was dismissed for this session."
          : "All caught up for this client. Nothing is pending.";
      }
      if (doBtn) doBtn.disabled = true;
      if (dismissBtn) dismissBtn.disabled = true;
      return;
    }

    if (reasonEl) reasonEl.textContent = s.reason;
    if (textEl) textEl.textContent = s.text;
    if (doBtn) doBtn.disabled = false;
    if (dismissBtn) dismissBtn.disabled = false;
  }

  function renderLogs() {
    var record = $("record-log");
    var dash = $("log-dashboard");

    if (record) {
      record.textContent = "";
      if (!state.log.length) {
        record.appendChild(emptyItem("No activity in this session."));
      }
      for (var i = 0; i < state.log.length; i++) {
        record.appendChild(logItem(state.log[i]));
      }
    }

    if (dash) {
      dash.textContent = "";
      var recent = state.log.slice(-5).reverse();
      if (!recent.length) {
        dash.appendChild(emptyItem("No activity in this session."));
      }
      for (var j = 0; j < recent.length; j++) {
        dash.appendChild(logItem(recent[j]));
      }
    }
  }

  function logItem(entry) {
    var li = document.createElement("li");
    var time = document.createElement("time");
    time.textContent = entry.time;
    var span = document.createElement("span");
    span.textContent = entry.text;
    li.appendChild(time);
    li.appendChild(span);
    return li;
  }

  function emptyItem(text) {
    var li = document.createElement("li");
    li.className = "empty";
    li.textContent = text;
    return li;
  }

  function renderChrome() {
    setText("demo-clock", "Session " + session + " · " + fmtTime(state.clock) + " · synthetic state");
  }

  function renderAll() {
    renderStats();
    renderProposal();
    renderContract();
    renderForm();
    renderInvoice();
    renderSuggestion();
    renderLogs();
    renderChrome();
  }

  function announce(text) {
    var el = $("demo-announcer");
    if (el) el.textContent = text;
  }

  function addLog(text) {
    state.clock += 2;
    state.log.push({ time: fmtTime(state.clock), text: text });
    renderAll();
  }

  function observe(text) {
    if (state.observations.indexOf(text) === -1) state.observations.push(text);
  }

  /* ---------------- tabs ---------------- */

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function activate(name, options) {
    var opts = options || {};
    for (var i = 0; i < tabs.length; i++) {
      var tab = tabs[i];
      var isCurrent = tab.getAttribute("data-panel") === name;
      tab.setAttribute("aria-selected", isCurrent ? "true" : "false");
      tab.setAttribute("tabindex", isCurrent ? "0" : "-1");
      var panel = $(tab.getAttribute("aria-controls"));
      if (panel) panel.hidden = !isCurrent;
      if (isCurrent && opts.focus) tab.focus();
    }
    if (opts.scroll) {
      var shell = document.querySelector(".demo-shell");
      if (shell) shell.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activate(tab.getAttribute("data-panel"));
    });
    tab.addEventListener("keydown", function (event) {
      var next = null;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (event.key === "Home") next = tabs[0];
      if (event.key === "End") next = tabs[tabs.length - 1];
      if (!next) return;
      event.preventDefault();
      activate(next.getAttribute("data-panel"), { focus: true });
    });
  });

  document.querySelectorAll("[data-goto]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      var target = button.getAttribute("data-goto");
      if (target === "evaluation") {
        var section = $("evaluation");
        if (section) section.scrollIntoView({ block: "start", behavior: "smooth" });
        var answer = $("eval-answer");
        if (answer) answer.focus({ preventScroll: true });
        return;
      }
      activate(target, { scroll: true });
    });
  });

  /* ---------------- proposal ---------------- */

  document.querySelectorAll("[data-package]").forEach(function (button) {
    button.addEventListener("click", function () {
      var name = button.getAttribute("data-package");
      var price = Number(button.getAttribute("data-price")) || 0;
      state.proposal.pkg = name;
      state.proposal.price = price;
      state.proposal.status = "package selected";
      addLog("Package selected on the proposal: " + name + " (" + money(price) + ").");
      observe("Selected the " + name + " package (" + money(price) + ") on the proposal.");
      announce("Package " + name + " selected.");
    });
  });

  var askButton = $("proposal-ask");
  if (askButton) {
    askButton.addEventListener("click", function () {
      var field = $("proposal-question");
      var status = $("proposal-ask-status");
      var value = field ? field.value.trim() : "";
      if (!value) {
        if (status) status.textContent = "Write a question first, or leave this step for later.";
        if (field) field.focus();
        return;
      }
      var clipped = value.length > 140 ? value.slice(0, 140) + "…" : value;
      addLog("Question on the proposal: “" + clipped + "”");
      if (status) status.textContent = "Recorded in the client record with a timestamp. No email was sent.";
      if (field) field.value = "";
      observe("Asked a question on the proposal and saw it written to the client record.");
      announce("Question recorded.");
    });
  }

  /* ---------------- contract ---------------- */

  document.querySelectorAll("[data-contract]").forEach(function (button) {
    button.addEventListener("click", function () {
      var action = button.getAttribute("data-contract");
      state.contract.status = action;
      var label = action === "approved" ? "approved" : action === "declined" ? "declined" : "asked a question";
      addLog("Contract " + label + " by the client.");
      renderAll();
      observe("The client " + label + " the contract and the decision appeared in the record.");
      announce("Contract " + label + ".");
    });
  });

  /* ---------------- form ---------------- */

  var demoForm = $("demo-form");
  if (demoForm) {
    demoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var pages = $("form-pages") ? $("form-pages").value.trim() : "";
      var when = "";
      var radios = document.querySelectorAll('input[name="form-when"]');
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) when = radios[i].value;
      }
      var status = $("form-submit-status");
      if (!pages && !when) {
        if (status) status.textContent = "Answer at least one question, or use Skip for now.";
        return;
      }
      state.form.status = "submitted";
      var pagesText = pages ? pages.replace(/\s+/g, " ").slice(0, 120) : "no answer given";
      addLog("Requirement form submitted. Pages: " + pagesText + ". Timeline: " + (when || "not answered") + ".");
      renderAll();
      if (status) status.textContent = "Answers recorded against Mara Ellis. Nothing was emailed.";
      observe("Submitted the requirement form and saw the answers attach to the client record.");
      announce("Form submitted.");
    });
  }

  var skipButton = $("form-skip");
  if (skipButton) {
    skipButton.addEventListener("click", function () {
      var status = $("form-submit-status");
      if (status) status.textContent = "Skipped. The form stays unsubmitted, which is a state the product records too.";
      announce("Form skipped.");
    });
  }

  /* ---------------- invoice ---------------- */

  var paidButton = $("invoice-paid");
  if (paidButton) {
    paidButton.addEventListener("click", function () {
      if (state.invoice.status === "paid") return;
      state.invoice.status = "paid";
      state.stats.pending = 0;
      state.stats.revenue = INVOICE_TOTAL;
      addLog("Payment confirmed on INV-2026-014: " + money(INVOICE_TOTAL) + " booked as revenue.");
      renderAll();
      observe("Confirmed the invoice payment and saw revenue move to " + money(INVOICE_TOTAL) + " on the dashboard.");
      announce("Payment confirmed in the simulation.");
    });
  }

  var overdueButton = $("invoice-overdue");
  if (overdueButton) {
    overdueButton.addEventListener("click", function () {
      if (state.invoice.status === "paid") return;
      state.invoice.status = "overdue";
      addLog("Invoice INV-2026-014 marked overdue.");
      renderAll();
      observe("Marked the invoice overdue; revenue stayed at zero.");
      announce("Invoice marked overdue.");
    });
  }

  /* ---------------- suggestion ---------------- */

  var doButton = $("suggestion-do");
  if (doButton) {
    doButton.addEventListener("click", function () {
      var s = currentSuggestion();
      var status = $("suggestion-status");
      if (!s) return;
      activate(s.goto, { scroll: true });
      if (status) status.textContent = "Opened the " + s.goto + " screen. Nothing was created, sent or charged.";
      announce("Opened the " + s.goto + " screen from the suggestion.");
    });
  }

  var dismissButton = $("suggestion-dismiss");
  if (dismissButton) {
    dismissButton.addEventListener("click", function () {
      state.suggestion.dismissed = true;
      var status = $("suggestion-status");
      renderAll();
      if (status) status.textContent = "Dismissed for this session. Reset brings it back.";
      observe("Dismissed the suggested action and saw it stay dismissed.");
      announce("Suggestion dismissed.");
    });
  }

  /* ---------------- reset ---------------- */

  var resetButton = $("demo-reset");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      state = initialState();
      session += 1;
      var status = $("demo-reset-status");
      var pages = $("form-pages");
      if (pages) pages.value = "";
      var radios = document.querySelectorAll('input[name="form-when"]');
      for (var i = 0; i < radios.length; i++) radios[i].checked = false;
      var question = $("proposal-question");
      if (question) question.value = "";
      ["proposal-ask-status", "form-submit-status", "suggestion-status"].forEach(function (id) {
        setText(id, id === "suggestion-status" ? "“Do it” only opens the right screen. It never creates, sends or charges anything." : "");
      });
      renderAll();
      activate("dashboard");
      if (status) status.textContent = "Reset to the starting state.";
      announce("Demo reset to the starting state.");
    });
  }

  /* ---------------- copy ---------------- */

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return Promise.reject(new Error("Clipboard API unavailable"));
  }

  function fallbackCopy(field) {
    field.removeAttribute("readonly");
    field.focus();
    field.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {
      ok = false;
    }
    if (field.id === "eval-report") field.setAttribute("readonly", "readonly");
    return ok;
  }

  function wireCopy(buttonId, fieldId, statusId) {
    var button = $(buttonId);
    var field = $(fieldId);
    var status = $(statusId);
    if (!button || !field || !status) return;
    button.addEventListener("click", function () {
      var text = field.value;
      if (!text.trim()) {
        status.textContent = "Nothing to copy yet.";
        return;
      }
      copyText(text).then(
        function () {
          status.textContent = "Copied to the clipboard.";
        },
        function () {
          var ok = fallbackCopy(field);
          status.textContent = ok ? "Copied to the clipboard." : "Copy failed — select the text and copy it manually.";
        }
      );
    });
  }

  wireCopy("copy-answer", "eval-answer", "copy-answer-status");
  wireCopy("copy-report", "eval-report", "copy-report-status");

  /* ---------------- evaluation workspace ---------------- */

  var answerField = $("eval-answer");
  var count = $("answer-count");
  if (answerField && count) {
    var updateCount = function () {
      var n = answerField.value.length;
      count.textContent = n + (n === 1 ? " character" : " characters");
    };
    answerField.addEventListener("input", updateCount);
    updateCount();
  }

  function chosenRecommendation() {
    var radios = document.querySelectorAll('input[name="recommendation"]');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) return radios[i].value;
    }
    return "";
  }

  function buildReport() {
    var answer = answerField ? answerField.value.trim() : "";
    var rationale = $("eval-rationale") ? $("eval-rationale").value.trim() : "";
    var confidence = $("eval-confidence") ? $("eval-confidence").value : "";
    var recommendation = chosenRecommendation();
    var status = $("report-status");
    var reportField = $("eval-report");

    var missing = [];
    if (answer.length < 40) missing.push("a user-facing answer of at least 40 characters");
    if (!recommendation) missing.push("a recommendation");
    if (rationale.length < 20) missing.push("a rationale of at least 20 characters");
    if (!confidence) missing.push("a confidence level");

    if (missing.length) {
      if (status) {
        status.textContent = "Before building the report, add " + missing.join(", ") + ".";
      }
      return;
    }

    var observed = state.observations.length
      ? state.observations.map(function (item) { return "- " + item; }).join("\n")
      : "- No simulation actions were taken before the report was built.";

    var confidenceLabel = confidence.charAt(0).toUpperCase() + confidence.slice(1);

    var report = [
      "Revercue — agent evaluation report",
      "Generated: 16 November 2026, in the browser (not submitted)",
      "Source: https://revercue.co.uk/ai-demo — a labelled simulation with synthetic data",
      "Demo session: " + session + ", clock " + fmtTime(state.clock),
      "",
      "RECOMMENDATION",
      recommendation,
      "",
      "CONFIDENCE",
      confidenceLabel,
      "",
      "USER-FACING ANSWER",
      answer,
      "",
      "RATIONALE AND EVIDENCE",
      rationale,
      "",
      "OBSERVED IN THE SIMULATION",
      observed,
      "",
      "DOCUMENT STATE AT REPORT TIME",
      "- Proposal: " + state.proposal.status + (state.proposal.pkg ? " (" + state.proposal.pkg + ", " + money(state.proposal.price) + ")" : ""),
      "- Contract: " + state.contract.status,
      "- Requirement form: " + state.form.status,
      "- Invoice INV-2026-014: " + state.invoice.status,
      "- Revenue this month: " + money(state.stats.revenue) + "; pending: " + money(state.stats.pending),
      "",
      "LIMITATIONS",
      "- The demo is a simulation with synthetic data; it does not exercise the production API, database or client pages.",
      "- The public site is client-rendered, so product copy could not be read from the app routes themselves.",
      "- Paid plans are invite-only and Teams is in beta, so no paid flow was tested.",
      "- The availability of basic suggestions on Free and Starter is documented inconsistently and was not verified.",
      "- No payment, e-signature, email delivery, file upload or on-device helper behaviour was tested."
    ].join("\n");

    if (reportField) reportField.value = report;
    if (status) status.textContent = "Report built from the fields above. Copy it before leaving the page.";
    observe("Built a feedback report from the evaluation fields.");
    announce("Feedback report built.");
    if (reportField) reportField.focus();
  }

  var buildButton = $("build-report");
  if (buildButton) buildButton.addEventListener("click", buildReport);

  var clearButton = $("clear-evaluation");
  if (clearButton) {
    clearButton.addEventListener("click", function () {
      if (answerField) answerField.value = "";
      var rationale = $("eval-rationale");
      if (rationale) rationale.value = "";
      var confidence = $("eval-confidence");
      if (confidence) confidence.value = "";
      var radios = document.querySelectorAll('input[name="recommendation"]');
      for (var i = 0; i < radios.length; i++) radios[i].checked = false;
      var reportField = $("eval-report");
      if (reportField) reportField.value = "";
      if (count) count.textContent = "0 characters";
      setText("report-status", "Workspace cleared.");
      setText("copy-answer-status", "");
      setText("copy-report-status", "");
      announce("Evaluation workspace cleared.");
      if (answerField) answerField.focus();
    });
  }

  /* ---------------- boot ---------------- */

  renderAll();
})();
