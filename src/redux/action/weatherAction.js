import { DELETE_LOCATION, SET_DATA_LOCATION, SET_INPUT_SEARCH } from "../Types/weatherType";

export const inputSearchAction = (data) => {
  return {
    type: SET_INPUT_SEARCH,
    payload: data,
  };
}
export const dataSearch = (data) => {
  return {
    type: SET_DATA_LOCATION,
    payload: data,
  };
}
export const deleteLocation = (data) => {
  return {
    type: DELETE_LOCATION,
    payload: data,
  };
}
