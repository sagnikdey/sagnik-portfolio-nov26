import Image from "next/image";

/** Editorial cover image (poster grid). Fills its box; scales up slightly on card hover. */
export function CoverArt({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-plate ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-collage group-hover:scale-[1.03]"
      />
    </div>
  );
}
