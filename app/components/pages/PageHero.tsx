import type { ReactNode } from "react";
import Label from "../ui/Label";

/** Shared editorial page opener: numbered label, huge light headline, optional intro. */
export default function PageHero({
  index,
  label,
  children,
  intro,
  aside,
}: {
  index: string;
  label: string;
  children: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="border-b border-line pb-12 pt-14 sm:pb-16 sm:pt-20">
      <Label index={index} accent>
        {label}
      </Label>
      <h1 className="font-display mt-8 text-[clamp(2.75rem,8.5vw,8rem)]">{children}</h1>
      {(intro || aside) && (
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {intro && <p className="max-w-xl text-lg leading-8 text-muted">{intro}</p>}
          {aside}
        </div>
      )}
    </header>
  );
}
