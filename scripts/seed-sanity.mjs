import { readFile } from "node:fs/promises";
import path from "node:path";
import nextEnv from "@next/env";
import { createClient } from "next-sanity";
import ts from "typescript";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const CONTENT_MODULE_PATH = path.resolve(
  process.cwd(),
  "src/content/siteContent.ts",
);

async function loadSiteContent() {
  const source = await readFile(CONTENT_MODULE_PATH, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: CONTENT_MODULE_PATH,
  });
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(
    transpiled.outputText,
  ).toString("base64")}`;

  return import(moduleUrl);
}

const { siteContent } = await loadSiteContent();

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  "etbmcohe";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  "production";
const apiVersion =
  process.env.SANITY_API_VERSION ||
  "2026-03-13";
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing Sanity env. Required: projectId in NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_PROJECT_ID, dataset in NEXT_PUBLIC_SANITY_DATASET or SANITY_DATASET, and a write token in SANITY_API_WRITE_TOKEN, SANITY_WRITE_TOKEN, or SANITY_API_TOKEN.",
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

async function uploadLogo() {
  const logoSrc = siteContent.company.logo.src;

  if (!logoSrc.startsWith("/")) {
    throw new Error(
      `Expected a local logo path from public/, received: ${logoSrc}`,
    );
  }

  const filePath = path.resolve(process.cwd(), `public${logoSrc}`);
  const fileBuffer = await readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();

  const contentType =
    extension === ".svg" ? "image/svg+xml" : "image/" + extension.slice(1);

  return client.assets.upload("image", fileBuffer, {
    filename: path.basename(filePath),
    contentType,
  });
}

async function seedLandingPage() {
  const logoAsset = await uploadLogo();

  const document = {
    _id: "landingPage",
    _type: "landingPage",
    companyName: siteContent.company.name,
    companyDescription: siteContent.company.description,
    logo: {
      _type: "image",
      alt: siteContent.company.logo.alt,
      asset: {
        _type: "reference",
        _ref: logoAsset._id,
      },
    },
    features: siteContent.features.items.map((item) => ({
      _type: "feature",
      title: item.title,
      description: item.description,
    })),
    pricing: siteContent.pricing.items.map((item) => ({
      _type: "priceItem",
      name: item.name,
      price: item.price,
    })),
  };

  const result = await client.createOrReplace(document);

  console.log("Seeded landing page document:", result._id);
}

seedLandingPage().catch((error) => {
  console.error(error);
  process.exit(1);
});
