export type SiteFeatureItem = {
  title: string;
  description: string;
};

export type SitePricingItem = {
  name: string;
  price: string;
};

export type SiteImage = {
  src: string;
  alt: string;
};

export type SiteContent = {
  company: {
    name: string;
    description: string;
    logo: SiteImage;
  };
  meta: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    description: string;
    primaryCta: string;
  };
  features: {
    title: string;
    description: string;
    items: SiteFeatureItem[];
  };
  pricing: {
    title: string;
    description: string;
    labels: {
      service: string;
      price: string;
    };
    items: SitePricingItem[];
  };
  contact: {
    title: string;
    description: string;
    fields: {
      nameLabel: string;
      namePlaceholder: string;
      contactLabel: string;
      contactPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
    };
  };
};
