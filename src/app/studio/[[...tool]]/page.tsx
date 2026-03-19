import { metadata, viewport } from "next-sanity/studio";
import StudioPageClient from "./StudioPageClient";

export const dynamic = "force-static";
export { metadata, viewport };

export default function StudioPage() {
  return <StudioPageClient />;
}
