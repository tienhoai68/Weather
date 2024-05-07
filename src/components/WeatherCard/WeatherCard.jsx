import React, { useContext, useEffect, useState } from "react";
import { useDate } from "../../Utils/useDate";
import { weatherService } from "../../Services/weatherService";
import { LoadingContext } from "../Loading/Loading";

const WeatherCard = ({ heatIndex, searchInput }) => {
  const [currentDay, setCurrentDay] = useState([]);
  const [location, setLocation] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    fetchDataWeatherApi();
  }, [searchInput]);

  const fetchDataWeatherApi = async () => {
    try {
      setLoadingState({ isLoading: true });
      const keyApi = "5c6307f259474a8787423902240405";
      const result = await weatherService.fetchCurrentDay(keyApi, searchInput);
      if (result) {
        setCurrentDay(result.current);
        setLocation(result.location);
      }
      setLoadingState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[22rem] min-w-[22rem] h-[30rem] bg-white shadow-lg rounded-lg p-4">
      {currentDay && currentDay.condition && (
        <div className="flex w-full justify-center items-center gap-4 mt-12 mb-4">
          <img src={currentDay.condition.icon} alt="weather_icon" />
          <p className="font-bold text-5xl flex justify-center items-center text-gray-900">
            {currentDay.temp_c} &deg;C
          </p>
        </div>
      )}
      <div className="font-bold text-center text-xl text-gray-900">
        {location.country} / {location.name}
      </div>
      <div className="w-full flex justify-between items-center mt-4">
        <p className="flex-1 text-center p-2 text-gray-800">
          {location.localtime}
        </p>
      </div>
      <div className="w-full flex justify-between items-center mt-4 gap-4">
        <div className="flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg text-white">
          <p className="text-sm text-gray-300">Wind Speed</p>
          <p className="font-normal">{currentDay.wind_kph} km/h</p>
        </div>
        <div className="flex-1 text-center p-2 font-bold rounded-lg bg-green-600 text-white">
          <p className="text-sm text-gray-300">Humidity</p>
          <p className="font-normal">{currentDay.humidity} gm/m&#179;</p>
        </div>
      </div>
      <div className="w-full p-3 mt-4 flex justify-between items-center">
        <p className="font-semibold text-lg text-gray-800">Heat Index</p>
        <p className="text-lg text-gray-900">{heatIndex ? heatIndex : "N/A"}</p>
      </div>
      <hr className="bg-slate-600" />
      {currentDay && currentDay.condition && (
        <div className="w-full p-4 flex justify-center items-center text-3xl font-semibold text-gray-900">
          {currentDay.condition.text}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
