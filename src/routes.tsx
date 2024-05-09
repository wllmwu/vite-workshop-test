import { RouteObject } from "react-router-dom";
import AppRoot from "./AppRoot.tsx";
import Page from "./components/Page.tsx";
import HomePage from "./pages/index.tsx";
import NotFoundPage from "./pages/404.tsx";
import AboutPage from "./pages/about.tsx";
import BlahPage from "./pages/blah.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppRoot />,
    errorElement: (
      <Page title="404">
        <NotFoundPage />
      </Page>
    ),
    children: [
      {
        index: true,
        element: (
          <Page title="Home">
            <HomePage />
          </Page>
        ),
      },
      {
        path: "/about",
        element: (
          <Page title="About">
            <AboutPage />
          </Page>
        ),
      },
      {
        path: "/blah",
        element: (
          <Page title="Blah">
            <BlahPage />
          </Page>
        ),
      },
    ],
  },
];
