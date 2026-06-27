import Link from "next/link";
import Image from "next/image";
import { APP_URL, NAV_LINKS } from "@/lib/site";
import { PageContainer } from "@/components/revamp/section-ui";

const PRODUCT_LINKS = NAV_LINKS;

const COMPANY_LINKS = [
  { label: "Book a demo", href: "/demo" },
  { label: "Contact", href: "/contact" },
  { label: "Log in", href: APP_URL },
];

export function SiteFooter() {
  return (
    <footer className="trail-section border-t border-[color:var(--border-hairline)] py-14 sm:py-16">
      <PageContainer>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-xs">
            <Image
              src="/logo/logo_full.png"
              alt="KennelEyes — Monitor · Analyze · Grow"
              width={150}
              height={118}
              className="h-16 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-trail-muted">
              Mission control for kennel operators.
            </p>
          </div>

          <nav aria-label="Product">
            <p className="eyebrow text-trail-faint">Product</p>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-trail-muted transition-colors hover:text-trail-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="eyebrow text-trail-faint">Get started</p>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-trail-muted transition-colors hover:text-trail-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[color:var(--border-hairline)] pt-6 text-sm text-trail-faint sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} KennelEyes. All rights reserved.</p>
          <Link
            href="/#demo"
            className="font-semibold text-trail-cyan transition-opacity hover:opacity-80"
          >
            See the live dashboard
          </Link>
        </div>
      </PageContainer>
    </footer>
  );
}
