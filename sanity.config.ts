import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { sanityEnv } from "./src/sanity/env";

export default defineConfig({
  name: "default",
  title: "Company landing",
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset || "production",
  basePath: sanityEnv.studioBasePath,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
