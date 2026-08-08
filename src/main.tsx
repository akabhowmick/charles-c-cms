import React from "react";
import ReactDOM from "react-dom/client";
import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import "./index.css";
import { AuthProvider } from "@/context/AuthContext";
import { SignupProvider } from "@/context/SignupContext";
import { Layout } from "@/components/Layout";
import { Home } from "@/routes/Home";
import { Opportunities } from "@/routes/Opportunities";
import { EventDetail } from "@/routes/EventDetail";
import { Highlights } from "@/routes/Highlights";
import { Photos } from "@/routes/Photos";
import { About } from "@/routes/About";
import { Login, Signup } from "@/routes/Auth";
import { Dashboard } from "@/routes/Dashboard";

const rootRoute = createRootRoute({ component: Layout });

const routes = [
  createRoute({ getParentRoute: () => rootRoute, path: "/", component: Home }),
  createRoute({ getParentRoute: () => rootRoute, path: "/opportunities", component: Opportunities }),
  createRoute({ getParentRoute: () => rootRoute, path: "/opportunities/$eventId", component: EventDetail }),
  createRoute({ getParentRoute: () => rootRoute, path: "/highlights", component: Highlights }),
  createRoute({ getParentRoute: () => rootRoute, path: "/photos", component: Photos }),
  createRoute({ getParentRoute: () => rootRoute, path: "/about", component: About }),
  createRoute({ getParentRoute: () => rootRoute, path: "/login", component: Login }),
  createRoute({ getParentRoute: () => rootRoute, path: "/signup", component: Signup }),
  createRoute({ getParentRoute: () => rootRoute, path: "/dashboard", component: Dashboard }),
];

const routeTree = rootRoute.addChildren(routes);
const router = createRouter({
  routeTree,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <SignupProvider>
        <RouterProvider router={router} />
      </SignupProvider>
    </AuthProvider>
  </React.StrictMode>,
);
