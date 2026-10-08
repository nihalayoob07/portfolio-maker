import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[100dvh] place-items-center px-5 py-16">
      <div className="chunk w-full max-w-3xl bg-sun p-8 text-center md:p-14">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3.6rem,12vw,9rem)]">
          Off the <span className="text-accent">bed</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed font-medium">
          This page didn&apos;t print. The link may be old, or the address has a typo.
        </p>
        <Link href="/" className="press mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-lg font-bold text-white">
          <ArrowLeft className="size-5" aria-hidden="true" /> Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
