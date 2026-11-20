"use client";

import { useState } from "react";

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button type="button" onClick={copy} className={className}>
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
