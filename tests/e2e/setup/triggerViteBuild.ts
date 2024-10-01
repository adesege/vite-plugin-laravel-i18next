import path from "path";
import { build } from "vite";

const triggerViteBuild = async () => {
  await build({
    root: path.join(import.meta.dirname, '../app'),
    build: {
      ssr: false,
      write: false,
    },
  });
};

export default triggerViteBuild;
