import {  combineReducers, legacy_createStore } from 'redux'
import { weatherReducer } from './reducer/weatherReducer';

const rootReducer = combineReducers({
  weatherReducer: weatherReducer,
});
export const store = legacy_createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;
