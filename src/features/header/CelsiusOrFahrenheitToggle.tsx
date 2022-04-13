import { faC, faF } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./header.css";
import { selectTemperatureMethod, setTemperatureMethod } from "./headerSlice";
import Toggle from "react-toggle";

const CelsiusOrFahrenheitToggle = () => {
  const dispatch = useAppDispatch();
  const temperatureMethod = useAppSelector(selectTemperatureMethod);
  return (
    <div className="flex items-center gap-2">
      <label>Celsius/Fahrenheit</label>
      <Toggle
        // defaultChecked={true}
        className="custom-classname"
        icons={{
          checked: (
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faC} />
            </div>
          ),
          unchecked: (
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faF} />
            </div>
          ),
        }}
        checked={temperatureMethod === "C" ? true : false}
        onChange={(e) => {
          dispatch(setTemperatureMethod(e.target.checked ? "C" : "F"));
        }}
      />
    </div>
  );
};

export default CelsiusOrFahrenheitToggle;
