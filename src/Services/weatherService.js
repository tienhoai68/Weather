import { requestApi } from "../Configs/callApi";

class WeatherService {
  fetchCurrentDay(key, address) {
    return requestApi({
      url: `/current.json?key=${key}&q=${address}`,
      method: "GET",
    });
  }
   fetchFutureDay(key, address,day) {
    return requestApi({
      url: `/forecast.json?key=${key}&q=${address}&days=${day}&aqi=no&alerts=no`,
      method: "GET",
    });
   }
   fetchSevenDays(key, address,day) {
    return requestApi({
      url: `/future.json?key=${key}&q=${address}&dt=${day}`,
      method: "GET",
    });
   }
  fetchLocation(key, location) {
    return requestApi({
      url: `/current.json?key=${key}&q=${location}&aqi=no`,
      method: "GET",
    });
   }
 
   
  
  
}

export const weatherService = new WeatherService();
