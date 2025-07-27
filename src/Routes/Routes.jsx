import React from "react";
import { createBrowserRouter } from "react-router-dom";
import TenantLandlord from "../pages/main/TenantLandlord";
import LayOut from "../Layout/LayOut";
import Dashboard from "../pages/main/Dashboard";
import AllUsers from "../pages/user-management/AllUsersPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "tenant-landlord",
        element: <TenantLandlord />,
      },
      {
        path: "/user-management",
        element: <AllUsers />,
      },
      
    ],
  },
]);
