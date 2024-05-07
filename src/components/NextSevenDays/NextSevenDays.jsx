import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import search from "../../assets/icons/search.svg";
import image from "../../assets/icons/rain.png";
import BackgroundLayout from "../BackGround/BackgroundLayout";
import { useSelector } from "react-redux";
import { weatherService } from "../../Services/weatherService";
import { LoadingContext } from "../Loading/Loading";

const NextSevenDays = () => {
  const [futureDay, setFutureDay] = useState();
  const [_, setLoadingState] = useContext(LoadingContext);

  const isSearch = useSelector((state) => state.weatherReducer.inputSearch);
  console.log(isSearch);
  const fetchDataWeatherFutureApi = async () => {
    try {
      setLoadingState({ isLoading: true });
      const keyApi = "5c6307f259474a8787423902240405";
      const currentDate = new Date();
      const futureDaysData = [];

      for (let i = 14; i <= 20; i++) {
        const targetDate = new Date(currentDate);
        targetDate.setDate(targetDate.getDate() + i);

        if (
          targetDate > new Date(currentDate) &&
          targetDate <=
            new Date(currentDate).setDate(currentDate.getDate() + 300)
        ) {
          const result = await weatherService.fetchSevenDays(
            keyApi,
            isSearch,
            targetDate.toISOString().slice(0, 10)
          );

          futureDaysData.push(result.forecast.forecastday);
          console.log(result.forecast.forecastday);
        }
      }

      setFutureDay(futureDaysData);
      setLoadingState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataWeatherFutureApi();
  }, []);
  const renderContentSevenDay = () => {
    return futureDay?.map((weather) => {
      return weather.map((item, index) => {
        return (
          <div
            key={index}
            className="glassCard flex-grow-0 flex-shrink-0 w-[10rem] h-[10rem] p-4 flex flex-col"
          >
            <p className="text-center">{item.date}</p>
            <hr />
            <div className="w-full flex justify-center items-center flex-1">
              <img
                src={item.day.condition.icon}
                alt="forecast not available"
                className="w-[4rem] h-[4rem]"
              />
            </div>
            <p className="text-center font-bold">{item.day.maxtemp_c}&deg;C</p>
          </div>
        );
      });
    });
  };
  return (
    <div className="w-full h-screen text-white px-8">
      <div className="w-full p-3">
        <nav className="flex justify-between items-center">
          <NavLink
            to={"/"}
            className="font-bold tracking-wide text-3xl transition-colors duration-300 hover:text-red-500"
          >
            Weather
          </NavLink>
        </nav>
      </div>
      <BackgroundLayout />
      <div className="flex justify-center gap-8 flex-wrap w-full mt-20">
        {renderContentSevenDay()}
      </div>
    </div>
  );
};

export default NextSevenDays;
