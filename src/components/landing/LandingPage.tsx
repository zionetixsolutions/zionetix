"use client";

import { useEffect, useState } from "react";

import WelcomeLoader from "./WelcomeLoader";
import Navbar from "./Navbar";
import Hero from "./Hero";
import WhatItIs from "./WhatItIs";
import TeamSection from "./TeamSection";
import HowItWorks from "./HowItWorks";
import CTASection from "./CTASection";
import Footer from "./Footer";

export default function LandingPage() {

  const [loading, setLoading] =
  useState(() => {

    if (
      typeof window !== "undefined"
    ) {

      return !sessionStorage.getItem(
        "primordial_loader_seen"
      );

    }

    return true;

  });
  useEffect(() => {

  if (!loading) {
    return;
  }

  const timer =
    setTimeout(() => {

      setLoading(false);

      sessionStorage.setItem(
        "primordial_loader_seen",
        "true"
      );

    }, 2500);

  return () =>
    clearTimeout(timer);

}, [loading]);

  if (loading) {
    return <WelcomeLoader />;
  }

  return (
    <main className="bg-white min-h-screen">

      <Navbar />

      <Hero />

      <WhatItIs />

      <TeamSection />

      <HowItWorks />

      <CTASection />

      <Footer />

    </main>
  );
}