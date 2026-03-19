import SectionTitle from "../Common/SectionTitle";
import { siteContent } from "@/content/siteContent";

const services = [...siteContent.pricing.items];

const Pricing = () => {
  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title={siteContent.pricing.title}
          paragraph={siteContent.pricing.description}
          center
          width="665px"
        />

        <div className="mx-auto max-w-4xl rounded-xs bg-white px-6 py-8 shadow-three dark:bg-gray-dark sm:px-8 sm:py-10">
          <div className="border-body-color/10 mb-6 hidden grid-cols-[1fr_auto] border-b pb-4 text-sm font-semibold tracking-[0.08em] text-body-color uppercase dark:border-white/10 sm:grid">
            <span>{siteContent.pricing.labels.service}</span>
            <span>{siteContent.pricing.labels.price}</span>
          </div>

          <div className="flex flex-col">
            {services.map((service, index) => (
              <div
                key={service.serviceName}
                className={`grid grid-cols-1 gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center ${
                  index !== services.length - 1
                    ? "border-body-color/10 border-b dark:border-white/10"
                    : ""
                }`}
              >
                <div>
                  <p className="mb-1 text-sm font-semibold tracking-[0.08em] text-body-color uppercase sm:hidden">
                    {siteContent.pricing.labels.service}
                  </p>
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {service.serviceName}
                  </h3>
                </div>
                <div className="sm:text-right">
                  <p className="mb-1 text-sm font-semibold tracking-[0.08em] text-body-color uppercase sm:hidden">
                    {siteContent.pricing.labels.price}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
