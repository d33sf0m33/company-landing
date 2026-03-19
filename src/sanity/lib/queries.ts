import { groq } from "next-sanity";

export const landingPageQuery = groq`
  *[_type == "landingPage"][0]{
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
