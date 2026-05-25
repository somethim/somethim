import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "@/server/app/storage";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
  config: {
    isDev: true,
    logLevel: "All",
  },
});
