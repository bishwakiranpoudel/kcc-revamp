import { HeroZoom } from "@/components/revamp/hero-zoom";
import { IntegrationsStrip } from "@/components/revamp/integrations-strip";
import { ChaosCollide } from "@/components/revamp/chaos-collide";
import { TrailDivider } from "@/components/revamp/trail-divider";
import { SummitPortal } from "@/components/revamp/summit-portal";
import { DemoSections } from "@/components/revamp/demo-sections";
import { ProductFeatures } from "@/components/revamp/product-features";
import { StickySplitSteps } from "@/components/revamp/sticky-split-steps";
import { AudienceFit } from "@/components/revamp/audience-fit";
import { SlotStats } from "@/components/revamp/slot-stats";
import { SocialProof } from "@/components/revamp/social-proof";
import { FaqAccordion } from "@/components/revamp/faq-accordion";
import { FinalCta } from "@/components/revamp/final-cta";

export default function HomePage() {
  return (
    <>
      <HeroZoom />
      <IntegrationsStrip />
      <ChaosCollide />
      <TrailDivider />
      <SummitPortal />
      <DemoSections />
      <ProductFeatures />
      <StickySplitSteps />
      <AudienceFit />
      <SlotStats />
      <SocialProof />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
