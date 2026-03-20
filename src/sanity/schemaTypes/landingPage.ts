import { defineArrayMember, defineField, defineType } from "sanity";

export const landingPageType = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  fields: [
    defineField({
      name: "company",
      title: "Company",
      type: "reference",
      to: [{ type: "company" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "companyName",
      title: "Company name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "companyDescription",
      title: "Company description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineArrayMember({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
      validation: (rule) =>
        rule.required().min(5).max(5).custom((items) => {
          return Array.isArray(items) && items.length === 5
            ? true
            : "Features must contain exactly 5 items.";
        }),
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "array",
      of: [
        defineArrayMember({
          name: "priceItem",
          title: "Price item",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "price",
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "footerCompanyInfo",
      title: "Footer company info",
      type: "object",
      fields: [
        defineField({
          name: "contact",
          title: "Contact",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
          validation: (rule) => rule.required().email(),
        }),
        defineField({
          name: "address",
          title: "Address",
          type: "text",
          rows: 3,
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      subtitle: "company.name",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Landing page content",
        subtitle: subtitle ? `Company: ${subtitle}` : "Company is not set",
      };
    },
  },
});
