import React from "react";
import UserLayout from "../UserLayout/UserLayout";
import { Outlet } from "react-router-dom";

const WeatherLayout = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <UserLayout />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WeatherLayout;
