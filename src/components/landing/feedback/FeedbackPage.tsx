"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";

import FeedbackHero from "./FeedbackHero";
import FeedbackForm from "./FeedbackForm";

export default function FeedbackPage() {
  return (
    <main className="bg-white min-h-screen">

      <Navbar />

      <FeedbackHero />

      <FeedbackForm />

      <Footer />

    </main>
  );
}