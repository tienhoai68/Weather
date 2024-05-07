import React, { useEffect, useState } from "react";
import BackgroundLayout from "../BackGround/BackgroundLayout";
import { NavLink } from "react-router-dom";
import search from "../../assets/icons/search.svg";
import { FaDeleteLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { dataSearch, deleteLocation } from "../../redux/action/weatherAction";
import { IoLocation } from "react-icons/io5";

const ListLocation = () => {
  const [locations, setLocations] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const dataSelector = useSelector((state) => state.weatherReducer);

  const fetchWeatherForLocation = async (location) => {
    try {
      const keyApi = "5c6307f259474a8787423902240405";

      // const response = await weatherService.fetchLocation(keyApi, location);

      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${keyApi}&q=${location}&aqi=no`
      );

      const data = await response.json();

      if (response.ok) {
        const existingLocationIndex = locations.findIndex(
          (item) => item.location === location
        );

        if (existingLocationIndex !== -1) {
          const updatedLocations = [...locations];
          updatedLocations[existingLocationIndex].weatherData = data;
          setLocations(updatedLocations);
        } else {
          setLocations((prevLocations) => [
            ...prevLocations,
            { location: data.location.name ?? "", weatherData: data },
          ]);
          dispatch(
            dataSearch([
              ...dataSelector.dataLocation,
              { location: data.location.name ?? "", weatherData: data },
            ])
          );
        }
      } else {
        alert("Error fetching weather data:", data.error.message);
      }
    } catch (error) {
      alert("Error fetching weather data:", error);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          fetchWeatherForLocation(`${latitude},${longitude}`);
        },
        (error) => {}
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      fetchWeatherForLocation(searchInput);
      setSearchInput("");
    }
  };

  const removeLocation = (locationToRemove) => {
    dispatch(deleteLocation(locationToRemove));
  };
  const renderContent = () => {
    return dataSelector.dataLocation.map((item, index) => {
      return (
        <div
          key={index}
          className="glassCard w-full md:w-[10rem] h-[11rem] p-4 flex flex-col bg-opacity-75 bg-white bg-blur-lg rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <span className=" text-center text-gray-800">{item.location}</span>

          <div className="flex justify-center items-center flex-1">
            <img
              src={item.weatherData.current.condition.icon}
              alt="forecast not available"
              className="w-[3rem] h-[3rem]"
            />
          </div>
          <p className="text-center font-bold text-xl">
            {item.weatherData.current.temp_c}&deg; C
          </p>
          <hr className="my-1 border-t-2 border-gray-400" />
          <button
            className="flex items-center justify-center text-red-500 focus:outline-none"
            onClick={() => removeLocation(item.location)}
          >
            <FaDeleteLeft className="mr-2" />
            Del
          </button>
        </div>
      );
    });
  };

  return (
    <div className="w-full h-screen text-white px-8">
      <div className="w-full p-3">
        <nav className="flex justify-between items-center">
          <NavLink to={"/"} className="font-bold tracking-wide text-3xl">
            Weather App
          </NavLink>
          <div className="flex">
            <form onSubmit={handleSubmit}>
              <div className="bg-white w-56 overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2">
                <img src={search} alt="search" className="w-6 h-6" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search location"
                  className="focus:outline-none bg-inherit text-slate-700 w-full text-lg p-0 placeholder-gray-700"
                />
              </div>
            </form>
            <button className="ml-2" onClick={handleGetCurrentLocation}>
              <IoLocation size={24} />
            </button>
          </div>
        </nav>
      </div>
      <BackgroundLayout />
      <div className="flex justify-center gap-8 flex-wrap w-full mt-10">
        {renderContent()}
      </div>
    </div>
  );
};

export default ListLocation;
