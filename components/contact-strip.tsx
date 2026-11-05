import { site } from "@/content/site";

export function ContactStrip({ line = "Got a complex product that needs to hold together?" }: { line?: string }) {
  return (
    <section aria-label="Contact" id="contact" className="container-page pb-18">
      <div className="flex flex-wrap items-center justify-between gap-6 bg-accent p-10 text-on-accent">
        <p className="max-w-[760px] text-title-l font-bold">{line}</p>
        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${site.email}`} className="bg-surface px-6 py-4 font-medium text-ink">{site.email} →</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="border border-on-accent px-6 py-4 font-medium text-on-accent hover:text-on-accent">LinkedIn ↗</a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="border border-on-accent px-6 py-4 font-medium text-on-accent hover:text-on-accent">Resume ↗</a>
        </div>
      </div>
    </section>
  );
}
