/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { weatherService } from "../../Services/weatherService";
import { LoadingContext } from "../Loading/Loading";

const MiniCard = ({ searchInput }) => {
  const [futureDay, setFutureDay] = useState([]);
  const [_, setLoadingState] = useContext(LoadingContext);

  const fetchDataWeatherFutureApi = async () => {
    try {
      setLoadingState({ isLoading: true });
      const keyApi = "5c6307f259474a8787423902240405";
      const targetDate = 1;

      const result = await weatherService.fetchFutureDay(
        keyApi,
        searchInput,
        targetDate
      );
      console.log(result.forecast.forecastday);
      if (result) {
        setFutureDay(result.forecast.forecastday);
      }
      setLoadingState({ isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataWeatherFutureApi();
  }, [searchInput]);
  const renderContent = () => {
    return futureDay.map((weather) => {
      const currentTime = new Date();

      const itemsAfterCurrentTime = weather.hour.filter((item) => {
        const itemTime = new Date(item.time);
        return itemTime > currentTime;
      });

      const sixItemsAfterCurrentTime = itemsAfterCurrentTime.slice(0, 6);
      return sixItemsAfterCurrentTime.map((item, index) => {
        return (
          <div
            key={index}
            className="glassCard w-full md:w-[10rem] h-[10rem] p-4 flex flex-col"
          >
            <p className="text-center">{item.time}</p>
            <hr />
            <div className="w-full flex justify-center items-center flex-1">
              <img
                src={item.condition.icon}
                alt="forecast not available"
                className="w-[4rem] h-[4rem]"
              />
            </div>
            <p className="text-center font-bold">{item.temp_c}&deg;C</p>
          </div>
        );
      });
    });
  };
  return (
    <div className="flex justify-center gap-8 flex-wrap w-[60%]">
      {renderContent()}
    </div>
    // <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
    //   <p className="text-center">
    //     {
    //       new Date(time)
    //         .toLocaleTimeString("en", { weekday: "long" })
    //         .split(" ")[0]
    //     }
    //   </p>
    //   <hr />
    //   <div className="w-full flex justify-center items-center flex-1">
    //     <img
    //       src={iconString}
    //       alt="forecast not available"
    //       className="w-[4rem] h-[4rem]"
    //     />
    //   </div>
    //   <p className="text-center font-bold">{temp}&deg;C</p>
    // </div>
  );
};

export default MiniCard;
