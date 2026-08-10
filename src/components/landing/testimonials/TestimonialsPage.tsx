"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";

import TestimonialsHero from "./TestimonialsHero";
import FounderTestimonial from "./FounderTestimonial";
import UpcomingVoices from "./UpcomingVoices";
import TestimonialsCTA from "./TestimonialsCTA";

export default function TestimonialsPage() {
  return (
    <main className="bg-white min-h-screen">

      <Navbar />

      <TestimonialsHero />

      <FounderTestimonial />

      <UpcomingVoices />

      <TestimonialsCTA />

      <Footer />

    </main>
  );
}