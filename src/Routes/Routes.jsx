import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/main/Dashboard";
import TenantLandlord from "../pages/main/TenantLandlord";
import LayOut from "../Layout/LayOut";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
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
