import { createContext, useState } from "react";
import loading from "../../assets/images/loading.gif";
import "./Loading.css";

const DEFAULT_STATE = {
  isLoading: false,
};

export const LoadingContext = createContext(DEFAULT_STATE);

export const LoadingProvider = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);
  document.querySelector("body").style.overflow = state.isLoading
    ? "hidden"
    : "unset";
  return (
    <LoadingContext.Provider value={[state, setState]}>
      {state.isLoading && (
        <div className="wrapper-loading h-screen w-ful">
          <img src={loading} className="h-screen w-full -z-[10]" alt="" />
        </div>
      )}
      {props.children}
    </LoadingContext.Provider>
  );
};
