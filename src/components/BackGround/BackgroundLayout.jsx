import React, { useEffect, useState } from "react";

//images
import Clear from "../../assets/images/Clear.jpg";
import Fog from "../../assets/images/fog.png";
import Cloudy from "../../assets/images/Cloudy.jpg";
import Rainy from "../../assets/images/Rainy.jpg";
import Snow from "../../assets/images/snow.jpg";
import Stormy from "../../assets/images/Stormy.jpg";
import Beautiful from "../../assets/images/Beautiful.png";
import Sunny from "../../assets/images/Sunny.jpg";

const BackgroundLayout = () => {
  const [image, setImage] = useState(Beautiful);

  useEffect(() => {
    const weatherConditions = "beautiful";
    if (weatherConditions) {
      let imageString = weatherConditions;
      if (imageString.toLowerCase().includes("beautiful")) {
        setImage(Beautiful);
      } else if (imageString.toLowerCase().includes("cloud")) {
        setImage(Cloudy);
      } else if (
        imageString.toLowerCase().includes("rain") ||
        imageString.toLowerCase().includes("shower")
      ) {
        setImage(Rainy);
      } else if (imageString.toLowerCase().includes("snow")) {
        setImage(Snow);
      } else if (imageString.toLowerCase().includes("fog")) {
        setImage(Fog);
      } else if (
        imageString.toLowerCase().includes("thunder") ||
        imageString.toLowerCase().includes("storm")
      ) {
        setImage(Stormy);
      }
    }
  }, []);

  return (
    <img
      src={image}
      alt="weather_image"
      className="h-screen w-full fixed left-0 top-0 -z-[10]"
    />
  );
};

export default BackgroundLayout;
