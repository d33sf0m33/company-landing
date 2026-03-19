import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { siteContent } from "@/content/siteContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Contact />
    </>
  );
}
