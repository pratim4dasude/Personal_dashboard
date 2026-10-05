import type { ReactNode } from "react";

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="mx-auto w-full max-w-[1400px] overflow-x-clip px-6 pb-24 lg:px-10">
      {children}
    </main>
  );
}
