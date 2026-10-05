export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.35em] text-emerald-200/70">
      {children}
    </p>
  );
}
