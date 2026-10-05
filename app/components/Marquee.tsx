export default function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  // Duplicate the list so the CSS loop is seamless; the copy is hidden from assistive tech.
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3">
      {items.map((item) => (
        <li
          key={item}
          className="whitespace-nowrap rounded-full border border-emerald-200/15 bg-white/5 px-5 py-2 font-mono text-sm text-emerald-50/90"
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className={`marquee-track flex w-max ${reverse ? "marquee-reverse" : ""}`}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
