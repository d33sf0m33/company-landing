import nextEnv from "@next/env";
import { createClient } from "next-sanity";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  "hwubggde";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  "landings";
const apiVersion = process.env.SANITY_API_VERSION || "2026-03-13";
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN;
const defaultCompanyName =
  process.env.SANITY_DEFAULT_COMPANY_NAME || "Default company";
const defaultCompanySlug =
  process.env.SANITY_DEFAULT_COMPANY_SLUG || "default-company";
const defaultPrimaryDomain =
  process.env.SANITY_DEFAULT_PRIMARY_DOMAIN || "localhost";
const defaultDomains = (
  process.env.SANITY_DEFAULT_DOMAINS ||
  "localhost,127.0.0.1"
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

if (!projectId || !dataset || !token) {
  console.error(
    "Missing Sanity env. Required: projectId, dataset, and a write token.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const companiesQuery = `*[_type == "company"]{_id, isDefault}`;
const landingPagesWithoutCompanyQuery = `*[
  _type == "landingPage" &&
  !defined(company._ref)
]{_id}`;

async function ensureDefaultCompany() {
  const companies = await client.fetch(companiesQuery);
  const existingDefault = companies.find((company) => company.isDefault);

  if (existingDefault) {
    return existingDefault._id;
  }

  if (companies.length === 1) {
    const companyId = companies[0]._id;

    await client
      .patch(companyId)
      .setIfMissing({
        primaryDomain: defaultPrimaryDomain,
        domains: defaultDomains,
      })
      .set({ isDefault: true })
      .commit();

    return companyId;
  }

  const companyDocument = {
    _id: "company-default",
    _type: "company",
    name: defaultCompanyName,
    slug: {
      _type: "slug",
      current: defaultCompanySlug,
    },
    primaryDomain: defaultPrimaryDomain,
    domains: defaultDomains,
    isDefault: true,
  };

  const result = await client.createIfNotExists(companyDocument);

  return result._id;
}

async function migrateLandingPages() {
  const defaultCompanyId = await ensureDefaultCompany();
  const pages = await client.fetch(landingPagesWithoutCompanyQuery);

  if (pages.length === 0) {
    console.log("No landing pages require migration.");
    return;
  }

  const transaction = client.transaction();

  for (const page of pages) {
    transaction.patch(page._id, {
      set: {
        company: {
          _type: "reference",
          _ref: defaultCompanyId,
        },
      },
    });
  }

  await transaction.commit();
  console.log(
    `Attached ${pages.length} landing page(s) to company ${defaultCompanyId}.`,
  );
}

migrateLandingPages().catch((error) => {
  console.error(error);
  process.exit(1);
});
