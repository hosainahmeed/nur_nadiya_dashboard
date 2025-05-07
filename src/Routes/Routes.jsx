import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/main/Dashboard";
import TenantLandlord from "../pages/main/TenantLandlord";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "tenant-landlord",
        element: <TenantLandlord />,
      },
      
    ],
  },
]);
