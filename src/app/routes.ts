import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import NotAvailablePage from "./pages/NotAvailablePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/study/:studyId",
    Component: NotAvailablePage,
  },
  {
    path: "*",
    Component: NotAvailablePage,
  },
]);