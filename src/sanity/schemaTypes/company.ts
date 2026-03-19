import { defineField, defineType } from "sanity";

export const companyType = defineType({
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryDomain",
      title: "Primary domain",
      type: "string",
      description: "Hostname used to resolve this company in production.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "domains",
      title: "Domains",
      type: "array",
      of: [{ type: "string" }],
      description: "Additional hostnames mapped to the same company.",
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "isDefault",
      title: "Default for localhost",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "primaryDomain",
    },
  },
});
