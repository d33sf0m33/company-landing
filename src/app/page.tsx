import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { getSiteContent } from "@/sanity/lib/get-site-content";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();

  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <ScrollUp />
      <Hero content={content} />
      <Features content={content} />
      <Testimonials />
      <Pricing content={content} />
      <Contact />
    </>
  );
}
