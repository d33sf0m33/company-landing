import { cache } from "react";
import { headers } from "next/headers";
import type { Image } from "sanity";
import { siteContent } from "@/content/siteContent";
import type { SiteContent } from "@/types/site-content";
import { sanityClient } from "./client";
import { urlForImage } from "./image";
import {
  companyByHostnameQuery,
  defaultCompanyQuery,
  landingPageByCompanyQuery,
} from "./queries";

type CompanyQueryResult = {
  _id: string;
  name?: string;
  slug?: {
    current?: string;
  };
  primaryDomain?: string;
  domains?: string[];
  isDefault?: boolean;
};

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

function buildMetaTitle(companyName: string): string {
  return `${companyName} | Business Landing Page`;
}

function normalizeHostname(hostname: string): string {
  const firstValue = hostname.split(",")[0]?.trim() || "";

  return firstValue.replace(/:\d+$/, "").toLowerCase();
}

function isLocalHostname(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1"
  );
}

async function resolveCompany(): Promise<CompanyQueryResult | null> {
  if (!sanityClient) {
    return null;
  }

  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const host = requestHeaders.get("host");
  const hostname = normalizeHostname(forwardedHost || host || "");

  if (!hostname || isLocalHostname(hostname)) {
    return sanityClient.fetch<CompanyQueryResult | null>(defaultCompanyQuery);
  }

  const company = await sanityClient.fetch<CompanyQueryResult | null>(
    companyByHostnameQuery,
    { hostname },
  );

  if (company) {
    return company;
  }

  return sanityClient.fetch<CompanyQueryResult | null>(defaultCompanyQuery);
}

function mapSanityContent(data: LandingPageQueryResult): SiteContent {
  const companyName = data.companyName || siteContent.company.name;
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
      name: companyName,
      description: data.companyDescription || siteContent.company.description,
      logo: {
        src: logoUrl || siteContent.company.logo.src,
        alt: data.logo?.alt || siteContent.company.logo.alt,
      },
    },
    hero: {
      ...siteContent.hero,
      title: companyName,
      description:
        data.companyDescription || siteContent.hero.description,
    },
    meta: {
      title: buildMetaTitle(companyName),
      description:
        data.companyDescription || siteContent.meta.description,
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

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!sanityClient) {
    return siteContent;
  }

  const company = await resolveCompany();

  if (!company?._id) {
    return siteContent;
  }

  const data = await sanityClient.fetch<LandingPageQueryResult | null>(
    landingPageByCompanyQuery,
    { companyId: company._id },
  );

  if (!data) {
    return siteContent;
  }

  return mapSanityContent(data);
});
