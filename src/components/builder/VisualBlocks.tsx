import { sanitiseSvg } from "../../lib/visuals";
import type { Block } from "../../types";

/**
 * The visual blocks. Each one renders from its own structured data, so the
 * editor can change the figures, steps or icon instead of replacing a picture.
 * Nothing here draws sample data: a chart with no series says so.
 */

function widthOf(block: Block): string | undefined {
  const value = Number(block.meta?.width);
  return Number.isFinite(value) && value > 0 && value <= 100 ? `${value}%` : undefined;
}

function captioned(block: Block) {
  const caption = block.caption?.trim();
  const source = block.source?.trim() || block.meta?.source?.toString();
  if (!caption && !source) return null;
  return (
    <figcaption style={{ fontSize: 11, color: "#8a857a", marginTop: 6 }}>
      {caption}
      {caption && source ? " · " : ""}
      {source ? `Source: ${source}` : ""}
    </figcaption>
  );
}

function EmptyVisual({ label, hint, editable }: { label: string; hint: string; editable: boolean }) {
  return (
    <div
      style={{
        border: "1px dashed #d8d2c4",
        borderRadius: 6,
        padding: 16,
        color: "#8a857a",
        fontSize: 12,
        background: "#faf8f4",
      }}
    >
      <b style={{ color: "#4a4a4a" }}>{label}</b>
      {editable ? <div style={{ marginTop: 4 }}>{hint}</div> : null}
    </div>
  );
}

export function ChartBlock({
  block,
  brandPrimary = "#c9a961",
  editable = false,
}: {
  block: Block;
  brandPrimary?: string;
  editable?: boolean;
}) {
  const chart = block.chart;
  const series = chart?.series ?? [];
  const style = { margin: "12px 0", maxWidth: widthOf(block) };

  if (series.length === 0) {
    return (
      <div style={style}>
        <EmptyVisual label="Chart" hint="Add labels and values in the properties panel." editable={editable} />
      </div>
    );
  }

  const values = series.map((point) => Math.abs(point.value));
  const max = Math.max(...values, 1);
  const unit = chart?.unit ? ` ${chart.unit}` : "";
  const kind = chart?.kind ?? "bar";
  const summary = series.map((point) => `${point.label}: ${point.value}${unit}`).join(", ");

  return (
    <figure style={style} aria-label={`Chart — ${summary}`}>
      {chart?.title ? (
        <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}>{chart.title}</div>
      ) : null}

      {kind === "line" ? (
        <svg viewBox="0 0 100 44" preserveAspectRatio="none" role="img" aria-hidden="true" style={{ width: "100%", height: 120 }}>
          <polyline
            points={series
              .map((point, index) => {
                const x = series.length === 1 ? 0 : (index / (series.length - 1)) * 100;
                const y = 40 - (Math.abs(point.value) / max) * 36;
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke={brandPrimary}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
          {series.map((point, index) => {
            const x = series.length === 1 ? 0 : (index / (series.length - 1)) * 100;
            const y = 40 - (Math.abs(point.value) / max) * 36;
            return <circle key={`${point.label}-${index}`} cx={x} cy={y} r={1.6} fill={brandPrimary} vectorEffect="non-scaling-stroke" />;
          })}
        </svg>
      ) : (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130 }}>
          {series.map((point, index) => (
            <div key={`${point.label}-${index}`} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
              <span style={{ fontSize: 10, color: "#4a4a4a", textAlign: "center", marginBottom: 4 }}>
                {point.value}
                {unit}
              </span>
              <span
                style={{
                  height: `${Math.max((Math.abs(point.value) / max) * 100, 2)}%`,
                  background: brandPrimary,
                  borderRadius: "2px 2px 0 0",
                  opacity: 0.9,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        {series.map((point, index) => (
          <span key={`${point.label}-label-${index}`} style={{ flex: 1, fontSize: 10, color: "#8a857a", textAlign: "center" }}>
            {point.label}
          </span>
        ))}
      </div>
      {captioned(block)}
    </figure>
  );
}

export function DiagramBlock({
  block,
  brandPrimary = "#c9a961",
  editable = false,
}: {
  block: Block;
  brandPrimary?: string;
  editable?: boolean;
}) {
  const diagram = block.diagram;
  const steps = diagram?.steps ?? [];
  const style = { margin: "12px 0", maxWidth: widthOf(block) };

  if (steps.length === 0) {
    return (
      <div style={style}>
        <EmptyVisual label="Diagram" hint="Add the process steps in the properties panel." editable={editable} />
      </div>
    );
  }

  return (
    <figure style={style} aria-label={`Process — ${steps.map((step) => step.title).join(" to ")}`}>
      {diagram?.title ? (
        <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}>{diagram.title}</div>
      ) : null}
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`} style={{ display: "flex", gap: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span
                aria-hidden="true"
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: brandPrimary,
                  color: "#101010",
                  fontSize: 11,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {index + 1}
              </span>
              {index < steps.length - 1 ? (
                <span style={{ width: 1, flex: 1, minHeight: 14, background: "#d8d2c4" }} aria-hidden="true" />
              ) : null}
            </div>
            <div style={{ paddingBottom: 12 }}>
              <b style={{ fontSize: 12, color: "#1a1a1a" }}>{step.title}</b>
              {step.detail ? <div style={{ fontSize: 12, color: "#4a4a4a", marginTop: 2 }}>{step.detail}</div> : null}
            </div>
          </li>
        ))}
      </ol>
      {captioned(block)}
    </figure>
  );
}

function sizedSvg(markup: string, size: number): string {
  return markup
    .replace(/<svg([^>]*?)\swidth="[^"]*"/i, "<svg$1")
    .replace(/<svg([^>]*?)\sheight="[^"]*"/i, "<svg$1")
    .replace(/<svg/i, `<svg width="${size}" height="${size}"`);
}

export function IconBlock({ block, editable = false }: { block: Block; editable?: boolean }) {
  const icon = block.icon;
  const size = Number(block.meta?.size) > 0 ? Number(block.meta?.size) : 24;
  const markup = sanitiseSvg(icon?.svg);
  const label = icon?.label || block.alt || "";

  if (!markup && !icon?.name) {
    return (
      <div style={{ margin: "8px 0" }}>
        <EmptyVisual label="Icon" hint="Choose an icon name in the properties panel." editable={editable} />
      </div>
    );
  }

  return (
    <figure
      style={{ margin: "8px 0", display: "inline-flex", alignItems: "center", gap: 8, color: icon?.color || "inherit" }}
      aria-label={label || icon?.name || "Icon"}
    >
      {markup ? (
        <span
          style={{ display: "inline-flex", width: size, height: size }}
          dangerouslySetInnerHTML={{ __html: sizedSvg(markup, size) }}
        />
      ) : (
        <img
          src={`https://api.iconify.design/${String(icon?.name).replace(":", "/")}.svg?height=${size * 2}`}
          alt=""
          width={size}
          height={size}
          loading="lazy"
        />
      )}
      {label ? <span style={{ fontSize: 12 }}>{label}</span> : null}
    </figure>
  );
}

export function SvgBlock({ block, editable = false }: { block: Block; editable?: boolean }) {
  const markup = sanitiseSvg(block.svg);
  if (!markup) {
    return (
      <div style={{ margin: "12px 0", maxWidth: widthOf(block) }}>
        <EmptyVisual label="Graphic" hint="Paste SVG markup in the properties panel." editable={editable} />
      </div>
    );
  }
  const constrained = /viewBox/i.test(markup) && !/style=/i.test(markup)
    ? markup.replace(/<svg/i, '<svg style="max-width:100%;height:auto"')
    : markup;
  return (
    <figure style={{ margin: "12px 0", maxWidth: widthOf(block) }}>
      <span role="img" aria-label={block.alt || "Graphic"} dangerouslySetInnerHTML={{ __html: constrained }} />
      {captioned(block)}
    </figure>
  );
}
