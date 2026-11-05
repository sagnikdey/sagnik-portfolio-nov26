import { site } from "@/content/site";

export function ContactStrip({ line = "Got a complex product that needs to hold together?" }: { line?: string }) {
  return (
    <section aria-label="Contact" id="contact" className="container-page pb-18">
      <div className="flex flex-wrap items-center justify-between gap-6 bg-accent p-10 text-on-accent">
        <p className="max-w-[760px] text-title-l font-bold">{line}</p>
        <a href={`mailto:${site.email}`} className="bg-surface px-6 py-4 font-medium text-ink">{site.email} →</a>
      </div>
    </section>
  );
}
