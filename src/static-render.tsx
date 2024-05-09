import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from "react-router-dom/server";
import { routes } from "./routes";

/**
 * Renders the initial HTML for the specified page.
 *
 * @param url The URL of the page to render
 * @returns rendered HTML as a string
 */
export async function render(url: string) {
  /**
   * React Router's `BrowserRouter` only works in a browser. For use cases like
   * SSR where we need to render our pages in a non-browser environment, we can
   * use a `StaticRouter` as a substitute.
   *
   * More info: https://reactrouter.com/en/main/routers/create-static-handler
   */
  const handler = createStaticHandler(routes);
  /**
   * In order to get a page from the handler, we need to pass it a full
   * `Request` object (same thing that you would send from a frontend to a
   * backend). But in our SSG case we're not actually running a frontend and a
   * backend, so we just construct a fake request. The only important part of
   * the request for us is the URL path.
   */
  const fakeURL = `http://foo/${url}`;
  // ask the handler to give us the page for this "request"
  const context = await handler.query(new Request(fakeURL));
  // type narrowing - we expect `context` to be of type `StaticHandlerContext`
  if (context instanceof Response) {
    throw context;
  }
  const router = createStaticRouter(handler.dataRoutes, context);

  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </React.StrictMode>
  );
}
