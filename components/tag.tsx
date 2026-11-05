const variants = {
  fill: "bg-accent text-on-accent",
  outline: "border border-ink",
  "accent-outline": "border border-accent text-accent",
};
export function Tag({ variant, children }: { variant: keyof typeof variants; children: React.ReactNode }) {
  return <span className={`px-2 py-0.5 uppercase ${variants[variant]}`}>{children}</span>;
}
