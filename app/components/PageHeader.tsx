import SectionLabel from "./SectionLabel";

export default function PageHeader({
  label,
  title,
  intro,
}: {
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="pb-10 pt-6">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-300">{intro}</p>}
    </header>
  );
}
