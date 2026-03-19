import { groq } from "next-sanity";

export const companyByHostnameQuery = groq`
  *[
    _type == "company" &&
    (
      primaryDomain == $hostname ||
      $hostname in domains
    )
  ][0]{
    _id,
    name,
    slug,
    primaryDomain,
    domains,
    isDefault
  }
`;

export const defaultCompanyQuery = groq`
  *[_type == "company" && isDefault == true][0]{
    _id,
    name,
    slug,
    primaryDomain,
    domains,
    isDefault
  }
`;

export const landingPageByCompanyQuery = groq`
  *[
    _type == "landingPage" &&
    company._ref == $companyId
  ][0]{
    companyName,
    companyDescription,
    logo{
      alt,
      asset
    },
    features[]{
      title,
      description
    },
    pricing[]{
      name,
      price
    }
  }
`;
