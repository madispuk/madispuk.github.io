import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Sketches from "./Sketches";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import { PostHogProvider } from "posthog-js/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tallinn",
    element: <Sketches />,
  },
]);

const options = {
  api_host: "https://us.i.posthog.com",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PostHogProvider apiKey="phc_znldtUFberTyZqddh5E6OgHuh4aODMNyIH3uPXtoVEE" options={options}>
      <RouterProvider router={router} />
    </PostHogProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
