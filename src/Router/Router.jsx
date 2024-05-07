import { useRoutes } from "react-router-dom";
import React from "react";
import ListLocation from "../components/ListLocation/ListLocation";
import WeatherLayout from "../components/layout/WeatherLayout/WeatherLayout";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import NextSevenDays from "../components/NextSevenDays/NextSevenDays";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <WeatherLayout />,
      children: [],
    },
    {
      path: "/listlocation",
      element: <ListLocation />,
    },
    {
      path: "/nextsevendays",
      element: <NextSevenDays />,
    },
  ]);

  return routing;
}
