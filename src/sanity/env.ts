const fallbackProjectId = "hwubggde";
const fallbackDataset = "landings";

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  fallbackProjectId;

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  fallbackDataset;

export const sanityApiVersion = process.env.SANITY_API_VERSION || "2026-03-13";

export const sanityToken = process.env.SANITY_API_TOKEN;

export const sanityEnv = {
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  studioBasePath: "/studio",
};

export const isSanityConfigured = Boolean(
  sanityEnv.projectId && sanityEnv.dataset,
);
