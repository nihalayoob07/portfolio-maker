import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/content/site";

export function Contact() {
  return (
    <footer id="contact" className="relative z-10 px-5 pt-16 pb-8 md:px-8 md:pt-24">
      <div className="mx-auto max-w-[88rem]">
        <div className="chunk relative overflow-hidden bg-accent p-8 md:p-14">
          <div className="dots absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow">
              <span className="size-2.5 rounded-full bg-teal" aria-hidden="true" /> Get in touch
            </p>
            <p className="display mt-6 max-w-4xl text-[clamp(2.6rem,6vw,5.6rem)]">Building something, or need an engineer who ships?</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="press inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-lg font-bold text-white"
              >
                <Mail className="size-5" aria-hidden="true" /> Email me
              </a>
              <a
                href="https://github.com/nihalayoob07"
                target="_blank"
                rel="noreferrer"
                className="press inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 text-lg font-bold"
              >
                GitHub <ArrowUpRight className="size-5" aria-hidden="true" />
              </a>
              <a
                href={site.socials.find((s) => s.icon === "linkedin")!.href}
                target="_blank"
                rel="noreferrer"
                className="press inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 text-lg font-bold"
              >
                LinkedIn <ArrowUpRight className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <span
            className="sticker chunk-sm absolute right-8 bottom-8 hidden rounded-full bg-surface px-5 py-3 text-lg font-extrabold md:block"
            style={{ "--tilt": "-6deg" } as React.CSSProperties}
          >
            say hi ✦
          </span>
        </div>

        <p className="display mt-16 text-center text-[clamp(3.4rem,13vw,13rem)]">
          {site.name}
          <span className="text-accent">.</span>
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t-[3px] border-ink pt-6 text-sm font-bold sm:flex-row sm:items-center sm:justify-between">
          <a href={`mailto:${site.email}`} className="hover:text-accent-soft">
            {site.email}
          </a>
          <p>{site.location}</p>
          <p>
            Designed and built by {site.name} · © {site.year}
          </p>
        </div>
      </div>
    </footer>
  );
}
