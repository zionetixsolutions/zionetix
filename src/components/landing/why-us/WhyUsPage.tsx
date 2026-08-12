"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";

import WhyUsHero from "./WhyUsHero";
import BeliefsSection from "./BeliefsSection";
import BuiltForFounders from "./BuiltForFounder";
import WhyUsCTA from "./WhyUsCTA";

export default function WhyUsPage() {
  return (
    <main className="bg-white min-h-screen">

      <Navbar />

      <WhyUsHero />

      <BeliefsSection />

      <BuiltForFounders />

      <WhyUsCTA />

      <Footer />

    </main>
  );
}