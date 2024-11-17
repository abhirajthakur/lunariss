import { LandingHero } from "@/components/landing/hero";
import { LandingFeatures } from "@/components/landing/features";
import { LandingPricing } from "@/components/landing/pricing";
import { LandingTestimonials } from "@/components/landing/testimonials";
import { LandingCTA } from "@/components/landing/cta";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingPricing />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
