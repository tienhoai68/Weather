import { DELETE_LOCATION, SET_DATA_LOCATION, SET_INPUT_SEARCH } from "../Types/weatherType";

const INITIAL_STATE = {
  inputSearch: "VietNam",
  dataLocation: [],
};

// const stringify = localStorage.getItem("USER_INFO");
// if (stringify) {
//   INITIAL_STATE.userInfo = JSON.parse(stringify);
// }
export const weatherReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
     case SET_INPUT_SEARCH: {
       state.inputSearch = action.payload;
       break;
     };
     case SET_DATA_LOCATION: {
      state.dataLocation = action.payload;
      break;
     }
       case DELETE_LOCATION: {
       state.dataLocation = state.dataLocation.filter((location) => location.location !== action.payload);
      break;
    }
  }

  return { ...state };
}
 
