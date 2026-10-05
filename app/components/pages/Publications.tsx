import { authorName, publications, scholar } from "../../publications";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

/** Peer-reviewed publications from Google Scholar, as editorial ruled rows. */
export default function Publications() {
  return (
    <section aria-labelledby="publications-heading" className="border-t border-line pt-16 sm:pt-24">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <p className="label flex gap-4">
            <span className="text-accent">{String(publications.length).padStart(2, "0")}</span>
            <span>Publications</span>
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 lg:max-w-xs">
            <div>
              <dd className="font-display text-5xl text-fg">{scholar.citations}</dd>
              <dt className="label mt-2">Citations</dt>
            </div>
            <div>
              <dd className="font-display text-5xl text-fg">{scholar.hIndex}</dd>
              <dt className="label mt-2">h-index</dt>
            </div>
            <div>
              <dd className="font-display text-5xl text-fg">{publications.length}</dd>
              <dt className="label mt-2">Papers</dt>
            </div>
          </dl>
          <a
            href={scholar.profile}
            target="_blank"
            rel="noopener noreferrer"
            className="label mt-8 inline-block text-fg transition-colors hover:text-accent"
          >
            Google Scholar <span aria-hidden>&#8599;</span>
          </a>
          <p className="label mt-2 normal-case tracking-normal">As of {scholar.asOf}</p>
        </div>

        <div className="lg:col-span-8">
          <h2 id="publications-heading" className="font-display text-[clamp(2rem,4.6vw,4.25rem)]">
            Peer-reviewed, <span className="font-emph">in print.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-fg/80">
            Conference papers from my undergraduate years, covering speech and language models. My current work has
            moved to vision and generative AI, shown in the experiments above.
          </p>

          <ol className="mt-12 border-t border-line">
            {publications.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-4 py-8 sm:grid-cols-[7rem_1fr]"
                >
                  <div>
                    <p className="label text-fg">{fmt(p.date)}</p>
                    <p className="label mt-2">{p.topic}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light leading-snug tracking-tight transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-6 text-muted">
                      {p.authors.map((a, i) => (
                        <span key={a}>
                          <span className={a === authorName ? "text-fg" : undefined}>{a}</span>
                          {i < p.authors.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                    <p className="font-emph mt-3 text-xl text-fg/80">
                      {p.venue}
                    </p>
                    <p className="label mt-4 flex flex-wrap gap-x-6 gap-y-1">
                      <span>{p.publisher}</span>
                      <span>pp. {p.pages}</span>
                      <span>Cited by {p.citations}</span>
                      <span className="text-fg transition-colors group-hover:text-accent">
                        Read paper <span aria-hidden>&#8599;</span>
                      </span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
