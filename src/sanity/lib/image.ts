import imageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityEnv } from "../env";

const builder =
  sanityEnv.projectId && sanityEnv.dataset
    ? imageUrlBuilder({
        projectId: sanityEnv.projectId,
        dataset: sanityEnv.dataset,
      })
    : null;

export function urlForImage(source: Image) {
  if (!builder) {
    return null;
  }

  return builder.image(source);
}
