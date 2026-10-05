export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-emerald-200/15 bg-emerald-100/8 px-3 py-1 text-xs text-emerald-50/90">
      {children}
    </span>
  );
}
