import { useId } from "react";

export type CoverKind =
  | "proposals"
  | "contracts"
  | "pricing"
  | "followups"
  | "product"
  | "essay";

const W = 640;
const H = 400;

/* Paper, not screen: the covers are printed jackets on a cream page. */
const PAPER: [string, string][] = [
  ["#faf5e9", "#eee5d1"],
  ["#f7f1e3", "#eae0c9"],
  ["#fbf7ee", "#f0e8d6"],
  ["#f6efe0", "#e7dcc4"],
  ["#f9f3e6", "#ece2cc"],
];

const GOLD = ["#a9853f", "#b8934b", "#8f6f33", "#bf9d55"];
const INK = "#231d15";

/* A tiny deterministic generator: the same slug always draws the same cover. */
function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seeded(seed: number) {
  let state = seed || 1;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T,>(random: () => number, list: T[]): T =>
  list[Math.floor(random() * list.length) % list.length];

const between = (random: () => number, min: number, max: number) =>
  min + random() * (max - min);

type Props = {
  seed: string;
  kind: CoverKind;
  label?: string;
  /** A single letter set large in the paper, usually the title's first letter. */
  monogram?: string;
  className?: string;
  /** Hero covers keep the artwork still; cards drift a little on hover. */
  variant?: "card" | "hero";
};

export function CoverArt({
  seed,
  kind,
  label,
  monogram,
  className = "",
  variant = "card",
}: Props) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const seedNumber = hashString(`${kind}:${seed}`);
  const random = seeded(seedNumber);
  const bg = pick(random, PAPER);
  const gold = pick(random, GOLD);
  const rotate = between(random, -7, 7);

  return (
    <svg
      className={`cover-art cover-art-${variant} ${className}`}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ?? "Cover illustration"}
      data-cover={kind}
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bg[0]} />
          <stop offset="100%" stopColor={bg[1]} />
        </linearGradient>
        <radialGradient id={`glow${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={gold} stopOpacity="0.17" />
          <stop offset="55%" stopColor={gold} stopOpacity="0.06" />
          <stop offset="100%" stopColor={gold} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gold${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gold} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#f3e6c4" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id={`vignette${uid}`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="55%" stopColor="#2a2015" stopOpacity="0" />
          <stop offset="100%" stopColor="#2a2015" stopOpacity="0.16" />
        </radialGradient>
        <linearGradient id={`fade${uid}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={gold} stopOpacity="0.17" />
          <stop offset="100%" stopColor={gold} stopOpacity="0" />
        </linearGradient>
        <filter id={`grain${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seedNumber % 90} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <clipPath id={`clip${uid}`}>
          <rect width={W} height={H} rx="14" />
        </clipPath>
      </defs>

      <g clipPath={`url(#clip${uid})`}>
        <rect width={W} height={H} fill={`url(#bg${uid})`} />

        {/* the sheet grid that sits under every cover */}
        <g stroke={INK} strokeOpacity="0.06" strokeWidth="1">
          {Array.from({ length: 9 }, (_, index) => (
            <line key={`v${index}`} x1={index * 80} y1="0" x2={index * 80} y2={H} />
          ))}
          {Array.from({ length: 6 }, (_, index) => (
            <line key={`h${index}`} x1="0" y1={index * 80} x2={W} y2={index * 80} />
          ))}
        </g>

        <ellipse
          cx={between(random, 300, 520)}
          cy={between(random, 120, 260)}
          rx="230"
          ry="185"
          fill={`url(#glow${uid})`}
        />

        <g transform={`rotate(${rotate} ${W - 150} ${H / 2})`}>
          {kind === "proposals" && <ProposalsMotif random={random} uid={uid} gold={gold} />}
          {kind === "contracts" && <ContractsMotif random={random} uid={uid} gold={gold} />}
          {kind === "pricing" && <PricingMotif random={random} uid={uid} gold={gold} />}
          {kind === "followups" && <FollowUpsMotif random={random} uid={uid} gold={gold} />}
          {kind === "product" && <ProductMotif random={random} uid={uid} gold={gold} />}
          {kind === "essay" && <EssayMotif random={random} uid={uid} gold={gold} />}
        </g>

        {monogram && (
          <text
            x="52"
            y="300"
            fill={INK}
            fillOpacity="0.22"
            fontSize="260"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontStyle="italic"
          >
            {monogram.toUpperCase()}
          </text>
        )}

        {/* an inset hairline frame, like a printed cover */}
        <rect
          x="14"
          y="14"
          width={W - 28}
          height={H - 28}
          rx="8"
          fill="none"
          stroke={INK}
          strokeOpacity="0.16"
        />

        <g fontFamily="Inter, system-ui, -apple-system, sans-serif">
          <text
            x="34"
            y={H - 30}
            fill={INK}
            fillOpacity="0.62"
            fontSize="9.5"
            letterSpacing="3.4"
          >
            REVERCUE
          </text>
          <text
            x={W - 34}
            y={H - 30}
            textAnchor="end"
            fill={gold}
            fillOpacity="0.85"
            fontSize="9.5"
            letterSpacing="2.6"
          >
            {KIND_LABEL[kind]}
          </text>
        </g>

        <rect width={W} height={H} fill={`url(#vignette${uid})`} />
        <rect width={W} height={H} filter={`url(#grain${uid})`} opacity="0.045" />
      </g>
    </svg>
  );
}

const KIND_LABEL: Record<CoverKind, string> = {
  proposals: "PROPOSALS",
  contracts: "CONTRACTS",
  pricing: "PRICING",
  followups: "FOLLOW-UPS",
  product: "PRODUCT",
  essay: "NOTES",
};

type MotifProps = {
  random: () => number;
  uid: string;
  gold: string;
};

function Sheet({
  x,
  y,
  rotate,
  width = 190,
  height = 236,
  lines = 6,
  gold,
}: {
  x: number;
  y: number;
  rotate: number;
  width?: number;
  height?: number;
  lines?: number;
  gold?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect
        width={width}
        height={height}
        rx="7"
        fill="#fffdf7"
        fillOpacity="0.5"
        stroke={INK}
        strokeOpacity="0.3"
      />
      <rect x="16" y="16" width={width * 0.42} height="6" rx="3" fill={gold} fillOpacity="0.85" />
      <rect x="16" y="32" width={width * 0.62} height="4" rx="2" fill={INK} fillOpacity="0.32" />
      {Array.from({ length: lines }, (_, index) => (
        <rect
          key={index}
          x="16"
          y={56 + index * 17}
          width={index % 3 === 2 ? width * 0.52 : width * 0.76}
          height="4"
          rx="2"
          fill={INK}
          fillOpacity="0.28"
        />
      ))}
      <rect
        x="16"
        y={height - 42}
        width={width * 0.3}
        height="14"
        rx="7"
        fill={gold}
        fillOpacity="0.2"
        stroke={gold}
        strokeOpacity="0.45"
      />
    </g>
  );
}

function ProposalsMotif({ random, uid, gold }: MotifProps) {
  const back = between(random, -16, -8);
  const front = between(random, 2, 10);
  const thread = `M 60 ${between(random, 230, 270)} C 190 ${between(random, 90, 150)}, 330 ${between(random, 300, 340)}, 470 214 S 590 120 620 150`;

  return (
    <g>
      <Sheet x={352} y={92} rotate={back} width={168} height={210} lines={5} gold={INK} />
      <Sheet x={392} y={104} rotate={front} lines={7} gold={gold} />
      <path d={thread} fill="none" stroke={`url(#gold${uid})`} strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy={between(random, 236, 268)} r="4.5" fill={gold} />
      <circle cx="470" cy="214" r="3" fill={gold} fillOpacity="0.8" />
      <g fill={INK} fillOpacity="0.5" fontSize="10" letterSpacing="2.4" fontFamily="Inter, system-ui, sans-serif">
        <text x="58" y="86">DRAFT</text>
        <text x="58" y="104" fillOpacity="0.28">11.16</text>
      </g>
      <line x1="58" y1="112" x2="150" y2="112" stroke={INK} strokeOpacity="0.28" />
      {[0, 1, 2].map((index) => (
        <circle key={index} cx={58 + index * 16} cy="330" r="3" fill={gold} fillOpacity={index === 0 ? 0.9 : 0.25} />
      ))}
    </g>
  );
}

function ContractsMotif({ random, uid, gold }: MotifProps) {
  const cx = between(random, 400, 460);
  const cy = between(random, 168, 200);

  return (
    <g>
      {Array.from({ length: 7 }, (_, index) => (
        <line
          key={index}
          x1="72"
          y1={92 + index * 26}
          x2={280 + (index % 3) * 54}
          y2={92 + index * 26}
          stroke={INK}
          strokeOpacity={index === 0 ? 0.45 : 0.2}
          strokeWidth={index === 0 ? 5 : 3}
          strokeLinecap="round"
        />
      ))}
      <circle cx={cx} cy={cy} r="76" fill="none" stroke={`url(#gold${uid})`} strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r="62" fill="none" stroke={gold} strokeOpacity="0.4" strokeDasharray="2 7" />
      <circle cx={cx} cy={cy} r="50" fill={gold} fillOpacity="0.12" />
      <g stroke={gold} strokeOpacity="0.75" strokeLinecap="round" fill="none">
        <path d={`M ${cx - 26} ${cy + 4} C ${cx - 14} ${cy - 26}, ${cx - 2} ${cy + 26}, ${cx + 12} ${cy - 6} S ${cx + 26} ${cy + 12}, ${cx + 30} ${cy - 12}`} strokeWidth="2.2" />
      </g>
      <path
        d={`M 72 ${between(random, 286, 306)} C 190 ${between(random, 250, 280)}, 300 ${between(random, 320, 340)}, 430 288 S 560 250 600 262`}
        fill="none"
        stroke={gold}
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="72" y="252" width="46" height="46" rx="6" fill="none" stroke={INK} strokeOpacity="0.3" />
      <rect x="128" y="252" width="46" height="46" rx="6" fill="none" stroke={INK} strokeOpacity="0.22" />
      <g fill={INK} fillOpacity="0.45" fontSize="9.5" letterSpacing="2.6" fontFamily="Inter, system-ui, sans-serif">
        <text x="72" y="80">CLAUSE 04</text>
      </g>
    </g>
  );
}

function PricingMotif({ random, uid, gold }: MotifProps) {
  const heights = Array.from({ length: 5 }, () => between(random, 46, 168));
  const active = Math.floor(random() * 5);
  const base = 306;

  return (
    <g>
      <line x1="66" y1={base} x2="600" y2={base} stroke={INK} strokeOpacity="0.34" />
      {Array.from({ length: 4 }, (_, index) => (
        <line
          key={index}
          x1="66"
          y1={base - 46 * (index + 1)}
          x2="600"
          y2={base - 46 * (index + 1)}
          stroke={INK}
          strokeOpacity="0.22"
        />
      ))}
      {heights.map((height, index) => {
        const x = 106 + index * 82;
        const isActive = index === active;
        return (
          <g key={index}>
            <rect
              x={x}
              y={base - height}
              width="44"
              height={height}
              rx="4"
              fill={isActive ? `url(#gold${uid})` : INK}
              fillOpacity={isActive ? 0.92 : 0.15}
            />
            {isActive && (
              <rect
                x={x - 9}
                y={base - height - 12}
                width="62"
                height={height + 24}
                rx="8"
                fill="none"
                stroke={gold}
                strokeOpacity="0.6"
                strokeDasharray="3 5"
              />
            )}
          </g>
        );
      })}
      <path
        d={`M 106 ${base - 40} L 210 ${base - 96} L 296 ${base - 62} L 388 ${base - 130} L 470 ${base - 104} L 560 ${base - 158}`}
        fill="none"
        stroke={gold}
        strokeOpacity="0.65"
        strokeWidth="1.6"
        strokeDasharray="6 6"
      />
      <circle cx="560" cy={base - 158} r="4" fill={gold} />
      <g fill={INK} fillOpacity="0.4" fontSize="9.5" letterSpacing="2.4" fontFamily="Inter, system-ui, sans-serif">
        <text x="66" y="76">ONE PRICE, THREE PATHS</text>
      </g>
      <text x="570" y="76" textAnchor="end" fill={gold} fillOpacity="0.9" fontSize="22" fontFamily="Georgia, serif" fontStyle="italic">
        $
      </text>
    </g>
  );
}

function FollowUpsMotif({ random, uid, gold }: MotifProps) {
  const cx = between(random, 250, 300);
  const cy = between(random, 176, 204);

  return (
    <g>
      {[36, 72, 108, 144].map((radius, index) => (
        <circle
          key={radius}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={index === 0 ? gold : INK}
          strokeOpacity={index === 0 ? 0.7 : 0.16}
          strokeWidth={index === 0 ? 1.6 : 1}
        />
      ))}
      <circle cx={cx} cy={cy} r="6" fill={`url(#gold${uid})`} />
      <path d={`M ${cx} ${cy} L ${cx + 96} ${cy - 78}`} stroke={gold} strokeOpacity="0.5" strokeDasharray="3 4" />
      <circle cx={cx + 96} cy={cy - 78} r="4.5" fill={gold} />
      <line x1="72" y1="318" x2="596" y2="318" stroke={INK} strokeOpacity="0.28" />
      {[0, 1, 2, 3, 4].map((index) => {
        const x = 92 + index * 118;
        const active = index === 2;
        return (
          <g key={index}>
            <circle cx={x} cy="318" r={active ? 6 : 3.5} fill={active ? gold : INK} fillOpacity={active ? 1 : 0.3} />
            <line x1={x} y1="304" x2={x} y2="294" stroke={active ? gold : INK} strokeOpacity={active ? 0.8 : 0.22} />
          </g>
        );
      })}
      <path d="M 92 268 C 170 236, 250 292, 328 250 S 470 216, 566 244" fill="none" stroke={INK} strokeOpacity="0.34" />
      <g fill={INK} fillOpacity="0.45" fontSize="9.5" letterSpacing="2.4" fontFamily="Inter, system-ui, sans-serif">
        <text x="72" y="80">DAY 06</text>
        <text x="596" y="80" textAnchor="end" fill={gold} fillOpacity="0.85">NUDGE</text>
      </g>
    </g>
  );
}

function ProductMotif({ random, uid, gold }: MotifProps) {
  const offset = between(random, -10, 10);

  return (
    <g>
      <g transform="translate(300 100) skewY(-9)">
        <rect width="250" height="70" rx="8" fill="#fffdf7" fillOpacity="0.55" stroke={INK} strokeOpacity="0.24" />
        <rect x="16" y="16" width="96" height="6" rx="3" fill={gold} fillOpacity="0.8" />
        <rect x="16" y="32" width="180" height="4" rx="2" fill={INK} fillOpacity="0.26" />
        <rect x="16" y="44" width="140" height="4" rx="2" fill={INK} fillOpacity="0.2" />
      </g>
      <g transform={`translate(${250 + offset} 186) skewY(-9)`}>
        <rect width="290" height="96" rx="9" fill="#fffdf7" fillOpacity="0.7" stroke={gold} strokeOpacity="0.7" />
        <rect x="18" y="18" width="52" height="52" rx="6" fill={gold} fillOpacity="0.2" stroke={gold} strokeOpacity="0.5" />
        <rect x="86" y="20" width="150" height="7" rx="3.5" fill={INK} fillOpacity="0.3" />
        <rect x="86" y="38" width="120" height="5" rx="2.5" fill={INK} fillOpacity="0.26" />
        <rect x="86" y="52" width="168" height="5" rx="2.5" fill={INK} fillOpacity="0.2" />
        <rect x="86" y="70" width="64" height="12" rx="6" fill={gold} fillOpacity="0.85" />
        {[[-10, -10], [290, -10], [-10, 86], [290, 86]].map(([hx, hy]) => (
          <rect key={`${hx}-${hy}`} x={hx - 3} y={hy - 3} width="8" height="8" rx="2" fill={gold} />
        ))}
      </g>
      <g transform="translate(330 296) skewY(-9)">
        <rect width="220" height="58" rx="7" fill="#fffdf7" fillOpacity="0.45" stroke={INK} strokeOpacity="0.3" />
        <rect x="14" y="14" width="70" height="5" rx="2.5" fill={INK} fillOpacity="0.3" />
        <rect x="14" y="28" width="150" height="4" rx="2" fill={INK} fillOpacity="0.2" />
      </g>
      <g transform="translate(250 186) skewY(-9)">
        <rect x="-4" y="102" width="298" height="1" fill={`url(#fade${uid})`} />
      </g>
      <g fill={INK} fillOpacity="0.45" fontSize="9.5" letterSpacing="2.4" fontFamily="Inter, system-ui, sans-serif">
        <text x="72" y="80">CANVAS</text>
        <text x="72" y="330" fill={gold} fillOpacity="0.85">ELEMENTS</text>
      </g>
      <g stroke={INK} strokeOpacity="0.24">
        <line x1="72" y1="150" x2="200" y2="150" />
        <line x1="72" y1="176" x2="164" y2="176" />
        <line x1="72" y1="202" x2="186" y2="202" />
      </g>
    </g>
  );
}

function EssayMotif({ random, uid, gold }: MotifProps) {
  const horizon = between(random, 264, 292);
  const ringX = between(random, 430, 492);
  const ringY = between(random, 132, 162);
  const rules = [0.92, 0.74, 0.86, 0.6, 0.8, 0.44];

  return (
    <g>
      <circle cx={ringX} cy={ringY} r="78" fill={`url(#glow${uid})`} />
      <circle cx={ringX} cy={ringY} r="52" fill="none" stroke={gold} strokeOpacity="0.65" />
      <circle cx={ringX} cy={ringY} r="52" fill={gold} fillOpacity="0.14" />
      <circle cx={ringX - 40} cy={ringY + 62} r="3" fill={gold} fillOpacity="0.8" />
      <circle cx={ringX + 22} cy={ringY + 86} r="2.2" fill={gold} fillOpacity="0.55" />

      <g>
        {rules.map((width, index) => (
          <rect
            key={index}
            x="56"
            y={150 + index * 20}
            width={236 * width}
            height="3"
            rx="1.5"
            fill={INK}
            fillOpacity={index === 0 ? 0.46 : 0.26}
          />
        ))}
      </g>

      <line x1="56" y1={horizon} x2="588" y2={horizon} stroke={gold} strokeOpacity="0.55" />
      <line x1="56" y1={horizon + 12} x2="380" y2={horizon + 12} stroke={INK} strokeOpacity="0.22" />

      <g fill={INK} fillOpacity="0.45" fontSize="9.5" letterSpacing="2.6" fontFamily="Inter, system-ui, sans-serif">
        <text x="56" y="104">AN ESSAY</text>
        <text x="588" y="104" textAnchor="end" fill={gold} fillOpacity="0.9">2026</text>
      </g>
    </g>
  );
}

export function coverKindForCategory(category: string): CoverKind {
  switch (category) {
    case "Proposals":
      return "proposals";
    case "Contracts":
      return "contracts";
    case "Pricing":
      return "pricing";
    case "Follow-ups":
      return "followups";
    default:
      return "product";
  }
}
