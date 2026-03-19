import type { Testimonial } from "@/types/testimonial";
import type { SiteContent } from "@/types/site-content";

export const siteContent: SiteContent & {
  testimonials: {
    title: string;
    description: string;
    items: Testimonial[];
  };
  footer: Record<string, never>;
} = {
  company: {
    name: "Company Name",
    description:
      "This landing page template is built for service companies that need a strong first impression, a clear offer, and a simple path for incoming leads.",
    logo: {
      src: "/images/logo/logo-2.svg",
      alt: "Company logo",
    },
  },
  meta: {
    title: "Business Landing Page Template",
    description:
      "A flexible landing page template for service businesses, studios, and digital companies.",
  },
  hero: {
    title: "Company Name",
    description:
      "This landing page template is built for service companies that need a strong first impression, a clear offer, and a simple path for incoming leads.",
    primaryCta: "Submit a Request",
  },
  features: {
    title: "Features",
    description:
      "Explore the key capabilities, service areas, and advantages offered to support your project goals.",
    items: [
      {
        title: "Strategy-Led Approach",
        description:
          "Position the company around clear goals, audience needs, and practical outcomes instead of generic claims.",
      },
      {
        title: "Custom Design Direction",
        description:
          "Describe how the team shapes visual identity, page structure, and user experience for the client.",
      },
      {
        title: "Flexible Technical Delivery",
        description:
          "Use this item for development, integrations, platform setup, or other implementation capabilities.",
      },
      {
        title: "Ongoing Support",
        description:
          "Show that the business can handle maintenance, updates, and long-term improvements after launch.",
      },
      {
        title: "Content and Communication",
        description:
          "Use this block for content production, editorial support, client communication, or community management.",
      },
    ],
  },
  testimonials: {
    title: "Testimonials",
    description:
      "Read what clients say about the quality of work, communication, and the overall project experience.",
    items: [
      {
        id: 1,
        name: "Alex Carter",
        content:
          "The process was clear from the start, and the final result matched what we needed without unnecessary complexity.",
        image: "/images/testimonials/auth-01.png",
        star: 5,
      },
      {
        id: 2,
        name: "Maya Bennett",
        content:
          "Communication was consistent, deadlines were respected, and every update moved the project in the right direction.",
        image: "/images/testimonials/auth-02.png",
        star: 5,
      },
      {
        id: 3,
        name: "Daniel Foster",
        content:
          "We appreciated the practical approach, attention to detail, and the smooth experience from planning to delivery.",
        image: "/images/testimonials/auth-03.png",
        star: 5,
      },
    ] satisfies Testimonial[],
  },
  pricing: {
    title: "Pricing",
    description:
      "Select the service you need and contact us to discuss the scope, timeline, and the most suitable solution for your project.",
    labels: {
      service: "Service",
      price: "Price",
    },
    items: [
      { name: "Starter Landing Page", price: "$400" },
      { name: "Business Website", price: "$900" },
      { name: "Design Audit", price: "$250" },
      { name: "Frontend Development", price: "$700" },
      { name: "Monthly Support", price: "$180" },
    ],
  },
  contact: {
    title: "Contacts",
    description:
      "Tell us briefly about your project, and we will get back to you to discuss the details and next steps.",
    fields: {
      nameLabel: "Your Name",
      namePlaceholder: "How should we address you?",
      contactLabel: "Contact Details",
      contactPlaceholder: "Email or phone number",
      messageLabel: "Project Details",
      messagePlaceholder:
        "Describe your request, timeline, or preferred way to contact you",
      submitLabel: "Send Request",
    },
  },
  footer: {},
} as const;
