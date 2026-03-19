import type { Image } from "sanity";
import { siteContent } from "@/content/siteContent";
import type { SiteContent } from "@/types/site-content";
import { sanityClient } from "./client";
import { urlForImage } from "./image";
import { landingPageQuery } from "./queries";

type LandingPageQueryResult = {
  companyName?: string;
  companyDescription?: string;
  logo?: Image & {
    alt?: string;
  };
  features?: Array<{
    title?: string;
    description?: string;
  }>;
  pricing?: Array<{
    name?: string;
    price?: string;
  }>;
};

function mapSanityContent(data: LandingPageQueryResult): SiteContent {
  const logoUrl = data.logo ? urlForImage(data.logo)?.width(280).url() : null;
  const sanityFeatures =
    data.features
      ?.filter((item) => item.title && item.description)
      .slice(0, 5)
      .map((item) => ({
        title: item.title as string,
        description: item.description as string,
      })) || [];
  const sanityPricing =
    data.pricing
      ?.filter((item) => item.name && item.price)
      .map((item) => ({
        name: item.name as string,
        price: item.price as string,
      })) || [];

  return {
    ...siteContent,
    company: {
      name: data.companyName || siteContent.company.name,
      description: data.companyDescription || siteContent.company.description,
      logo: {
        src: logoUrl || siteContent.company.logo.src,
        alt: data.logo?.alt || siteContent.company.logo.alt,
      },
    },
    hero: {
      ...siteContent.hero,
      title: data.companyName || siteContent.hero.title,
      description:
        data.companyDescription || siteContent.hero.description,
    },
    features: {
      ...siteContent.features,
      items:
        sanityFeatures.length === 5
          ? sanityFeatures
          : siteContent.features.items,
    },
    pricing: {
      ...siteContent.pricing,
      items: sanityPricing.length > 0 ? sanityPricing : siteContent.pricing.items,
    },
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!sanityClient) {
    return siteContent;
  }

  const data = await sanityClient.fetch<LandingPageQueryResult>(
    landingPageQuery,
  );

  if (!data) {
    return siteContent;
  }

  return mapSanityContent(data);
}
