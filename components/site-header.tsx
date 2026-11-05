import Link from "next/link";
import { Logo } from "./logo";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="container-page flex flex-wrap items-center justify-between gap-4 border-b border-ink py-6">
      <Link href="/" aria-label="Sagnik Dey — home" className="text-ink">
        <Logo className="h-8 w-auto" />
      </Link>
      <nav aria-label="Primary" className="flex flex-wrap items-center gap-6 text-small">
        <Link href="/work">Work</Link>
        <Link href="/#approach">Approach</Link>
        <Link href="/work/sagui">Systems</Link>
        <a href={site.resume} target="_blank" rel="noopener noreferrer">Resume ↗</a>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a href={`mailto:${site.email}`} className="bg-ink px-4 py-3 font-medium text-on-accent hover:text-on-accent">
          Work with me
        </a>
      </nav>
    </header>
  );
}
