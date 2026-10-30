import * as React from "react";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturedProducts } from "@/components/landing/featured-products";
import { BentoSpecs } from "@/components/landing/bento-specs";
import { WhyClutchGear } from "@/components/landing/why-clutchgear";

export default function ShopHomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturedProducts />
      <BentoSpecs />
      <WhyClutchGear />
    </div>
  );
}
