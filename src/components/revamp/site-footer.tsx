import Link from "next/link";
import Image from "next/image";
import { PageContainer } from "@/components/revamp/section-ui";

export function SiteFooter() {
  return (
    <footer className="trail-section py-10 sm:py-12">
      <PageContainer className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:gap-6">
        <Image
          src="/logo/logo_full.png"
          alt="KennelEyes — Monitor · Analyze · Grow"
          width={150}
          height={118}
          className="h-16 w-auto"
        />
        <p className="text-center text-sm text-trail-muted sm:text-left">
          © {new Date().getFullYear()} KennelEyes · Mission control for kennel
          operators
        </p>
        <Link
          href="/#demo"
          className="text-sm font-semibold text-trail-cyan transition-opacity hover:opacity-80"
        >
          See the demo
        </Link>
      </PageContainer>
    </footer>
  );
}
