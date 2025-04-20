import path from "path";
import { build } from "vite";

const triggerViteBuild = async () => {
  await build({
    root: path.join(import.meta.dirname, "../app"),
    build: {
      ssr: false,
      write: false,
      // Add Vite 6 specific options
      target: "es2020",
      minify: false,
    },
  });
};

export default triggerViteBuild;
