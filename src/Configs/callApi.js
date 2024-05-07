import axios from "axios";

const requestApi = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  // headers: {
  //   token: userState.user.userInfo ? userState?.user?.userInfo : "",
  // }
})
requestApi.interceptors.request.use(function (config) {
  // Do something before request is sent
  //   const userState = store.getState();
  // let accessToken = null;
  
  // if (userState.user.userInfo) {

  //   accessToken = userState.user.userInfo;
  //   console.log(accessToken);
  //   config.headers.Authorization = `Bearer ${accessToken}`
  // }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

requestApi.interceptors.response.use(function (response) {
  
    return response && response.data ? response.data : response;
  }, function (error) {
   
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
  });
export { requestApi };
