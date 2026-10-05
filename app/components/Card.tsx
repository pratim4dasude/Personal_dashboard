import Link from "next/link";

const base = "rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${base} ${className}`}>{children}</div>;
}

export function CardLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${base} group block transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-white/10 hover:shadow-[0_0_40px_-10px_rgba(110,231,183,0.35)] ${className}`}
    >
      {children}
    </Link>
  );
}
