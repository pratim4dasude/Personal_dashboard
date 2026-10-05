// Deterministic per-chip animation so server and client markup match.
function floatStyle(i: number): React.CSSProperties {
  return {
    animationDelay: `${(i * 370) % 3000}ms`,
    animationDuration: `${5 + ((i * 7) % 5)}s`,
  };
}

export default function FloatingChips({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="flex flex-wrap content-start items-start gap-3">
      {items.map((item, i) => (
        <li
          key={item}
          style={{ ...floatStyle(i), borderColor: `${color}55`, boxShadow: `0 0 22px -8px ${color}` }}
          className="skill-float rounded-full border bg-white/8 px-4 py-2 text-sm text-white transition hover:scale-110 hover:bg-white/15"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
