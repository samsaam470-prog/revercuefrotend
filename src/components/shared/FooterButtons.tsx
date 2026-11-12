const PROMPT = encodeURIComponent("Explain Revercue: a freelancer tool for the thread from proposal to contract to invoice to CRM. The tagline is 'Your work should speak, not you.' The thesis is 'a thread, not disconnected workflows.' The Free plan is available now. The paid plans (Starter, Growth, Scale) are invite-only — join the waitlist. Teams is in beta — join the beta. The product does not use AI; it uses patterns. Answer in 2-3 sentences.");

export function FooterButtons() {
  return (
    <div className="footer-ai">
      <span>Ask about Revercue on your AI tool:</span>
      <a href={`https://chat.openai.com/?q=${PROMPT}`} target="_blank" rel="noopener noreferrer">ChatGPT</a>
      <a href={`https://www.perplexity.ai/?q=${PROMPT}`} target="_blank" rel="noopener noreferrer">Perplexity</a>
      <a href={`https://claude.ai/new?q=${PROMPT}`} target="_blank" rel="noopener noreferrer">Claude</a>
      <a href={`https://gemini.google.com/app?q=${PROMPT}`} target="_blank" rel="noopener noreferrer">Gemini</a>
    </div>
  );
}
