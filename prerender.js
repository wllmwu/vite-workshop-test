// based on https://github.com/vitejs/vite-plugin-react/blob/main/playground/ssr-react/prerender.js

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const basePath = "vite-workshop-test/";

/** Working directory absolute path */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 * Helper function to obtain the absolute path from a path relative to the
 * working directory
 */
const toAbsolute = (p) => path.resolve(__dirname, p);

/** Contents of the `index.html` file as a string */
const template = fs.readFileSync(toAbsolute("dist/static/index.html"), "utf-8");
const { render } = await import("./dist/static-render.js");

/**
 * List of routes that we want to pre-render. To keep things simple, we just use
 * the file name (including any containing folders) as the route.
 *
 * Examples:
 * - `"src/pages/index.tsx"` => `"/index"`
 * - `"src/pages/about.mdx"` => `"/about"`
 * - `"src/pages/projects/index.mdx"` => `"/projects/index"`
 * - `"src/pages/projects/my-project.mdx"` => `"/projects/my-project"`
 *
 * If you want more control over which files get turned into which routes, you
 * can just replace this part with your own mapping/dictionary.
 */
const routesToPrerender = fs
  .readdirSync(toAbsolute("src/pages"), { recursive: true })
  .filter((file) => !file.endsWith(".DS_Store") && !file.startsWith("404"))
  .map((file) => file.replace(/\.(tsx|mdx)$/, ""));

(async () => {
  for (const route of routesToPrerender) {
    // handle index files specially so the URL doesn't include the "/index" part
    const url = basePath + route.replace(/\/?index$/, "");
    // ask our "SSR" script to render the page at this URL into an HTML string
    const appHtml = await render(url);
    // insert the HTML string into the template
    const html = template.replace("<!--app-html-->", appHtml);
    // write the final HTML output to a file under dist/static
    const filePath = `dist/static/${route}.html`;
    const dirPath = filePath.slice(0, filePath.lastIndexOf("/"));
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(toAbsolute(filePath), html);
  }
})();
