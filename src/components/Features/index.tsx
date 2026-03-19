import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import { featureIcons } from "./featuresData";
import type { SiteContent } from "@/types/site-content";

const Features = ({ content }: { content: SiteContent }) => {
  const featuresData = content.features.items.map((item, index) => ({
    id: index + 1,
    icon: featureIcons[index]?.icon || featureIcons[0].icon,
    title: item.title,
    paragraph: item.description,
  }));

  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title={content.features.title}
            paragraph={content.features.description}
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
