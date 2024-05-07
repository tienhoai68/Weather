import React, { useState } from "react";
import search from "../../../assets/icons/search.svg";
import BackgroundLayout from "../../BackGround/BackgroundLayout";
import WeatherCard from "../../WeatherCard/WeatherCard";
import MiniCard from "../../MiniCard/MiniCard";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { inputSearchAction } from "../../../redux/action/weatherAction";

const UserLayout = () => {
  const [searchInput, setSearchInput] = useState("VietNam");
  const dispatch = useDispatch();
  const [weather, setWeather] = useState({
    wspd: 10,
    humidity: 70,
    temp: 25,
    heatindex: 28,
    conditions: "Sunny",
  });

  const submitCity = (value) => {
    setSearchInput(value);
    dispatch(inputSearchAction(value));
  };
  return (
    <div className="w-full h-screen text-white px-8">
      <div className="w-full p-3">
        <nav className="flex justify-between items-center">
          <h1 className="font-bold tracking-wide text-3xl transition-colors duration-300 hover:text-red-500">
            Weather{" "}
          </h1>
          <div className="flex items-center">
            <NavLink
              to="/listlocation"
              className="nav-link text-lg font-semibold text-white mr-8 transition-colors duration-300 hover:text-red-500"
            >
              Location
            </NavLink>
            <NavLink
              to="/nextsevendays"
              className="nav-link text-lg font-semibold text-white transition-colors duration-300 hover:text-red-500"
            >
              Next 7 Days
            </NavLink>
          </div>
          <div className="bg-white w-56 overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
            <img src={search} alt="search" className="w-6 h-6" />
            <input
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  // submit the form
                  submitCity(e.target.value);
                }
              }}
              type="text"
              placeholder="Search city"
              className="focus:outline-none bg-inherit text-slate-700 w-full text-lg p-0 placeholder-gray-700"
            />
          </div>
        </nav>
      </div>

      <BackgroundLayout />
      <main className="w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center">
        <WeatherCard searchInput={searchInput} heatIndex={weather.heatindex} />
        <MiniCard searchInput={searchInput} />
      </main>
    </div>
  );
};

export default UserLayout;
