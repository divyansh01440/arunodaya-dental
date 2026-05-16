import { ConvexReactClient } from "convex/react";

const url = import.meta.env.VITE_CONVEX_URL as string | undefined;

if (!url) {
  // Helpful error in dev — keeps the app from silently failing
  console.error(
    "VITE_CONVEX_URL is not set. Create a .env file with VITE_CONVEX_URL=https://your-deployment.convex.cloud"
  );
}

export const convex = new ConvexReactClient(url || "https://example.convex.cloud");
