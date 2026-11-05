import Link from "next/link";

type Props = { href: string; children: React.ReactNode };
const isExternal = (h: string) => h.startsWith("http") || h.startsWith("mailto:");

export function ButtonPrimary({ href, children }: Props) {
  const cls = "inline-block bg-accent px-6 py-4 font-medium text-on-accent hover:text-on-accent";
  return isExternal(href) ? <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a> : <Link href={href} className={cls}>{children}</Link>;
}

export function ButtonSecondary({ href, children }: Props) {
  const cls = "inline-block border border-ink px-6 py-4 font-medium text-ink";
  return isExternal(href) ? <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a> : <Link href={href} className={cls}>{children}</Link>;
}
