"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";

import HowItWorksHero from "./HowItWorksHero";
import FourStagesSection from "./FourStagesSection";
import SpecialistsSection from "./SpecialistsSection";
import HumanTeamSection from "./HumanTeamSection";
import MemorySection from "./MemorySection";
import ReadyCTA from "./ReadyCTA";

export default function HowItWorksPage() {
  return (
    <main className="bg-white min-h-screen">

      <Navbar />

      <HowItWorksHero />

      <FourStagesSection />

      <SpecialistsSection />

      <HumanTeamSection />

      <MemorySection />

      <ReadyCTA />

      <Footer />

    </main>
  );
}