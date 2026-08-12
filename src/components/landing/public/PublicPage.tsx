"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";

import PublicHero from "./PublicHero";
import FoundersGrid from "./FoundersGrid";
import PublicCTA from "./PublicCTA";

export default function PublicPage() {
  return (
    <main className="bg-white min-h-screen">

      <Navbar />

      <PublicHero />

      <FoundersGrid />

      <PublicCTA />

      <Footer />

    </main>
  );
}