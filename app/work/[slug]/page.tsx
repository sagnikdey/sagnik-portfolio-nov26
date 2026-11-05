import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { ContactStrip } from "@/components/contact-strip";

export function generateStaticParams() {
  return projects.filter((p) => p.slug !== "sagui").map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyStub({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <section className="container-page py-16">
        <Link href="/#work" className="font-mono text-label">← Work</Link>
        <h1 className="mt-6 text-display font-bold">{p.title}</h1>
        <p className="mt-8 max-w-[620px] text-lead">{p.description}</p>
        <p className="mt-6 font-mono text-caption text-ink-muted">[Case study in progress — follow the SagUI page template.]</p>
      </section>
      <ContactStrip />
    </>
  );
}
