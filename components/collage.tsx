import Image from "next/image";
import type { CollageImage } from "@/content/site";

const roleClass: Record<CollageImage["role"], string> = {
  front: "shadow-front group-hover:-translate-y-2.5 group-hover:scale-[1.02]",
  "back-left": "-rotate-4 shadow-back group-hover:-rotate-7 group-hover:-translate-x-3",
  "back-right": "rotate-3 shadow-back group-hover:rotate-6 group-hover:translate-x-3",
};

export function Collage({ images, caption, className = "" }: { images: CollageImage[]; caption?: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-plate-dots ${className}`}>
      {images.map((img) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 50vw, 90vw"
          className={`absolute h-auto border border-ink ${img.style} ${roleClass[img.role]} motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-collage`}
        />
      ))}
      {caption && (
        <span className="absolute bottom-3.5 left-4 bg-ink px-2.5 py-1.5 font-mono text-chip text-on-accent">{caption}</span>
      )}
    </div>
  );
}
