import React from "react";

const routes = [
  {
    path: "/",
    component: React.lazy(() => import("views/pages/Home")),
    exact: true,
  },
  {
    path: "/detail/:artworkId",
    component: React.lazy(() => import("views/pages/Detail")),
    exact: true,
  },
  {
    path: "/my-favorite",
    component: React.lazy(() => import("views/pages/Favorite")),
    exact: true,
  },
];

export default routes;
