import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { useAppSelector } from "../../app/hooks";
import { cToF, fToC } from "../../util/tempatureMethodsTransoform";
import { selectTemperatureMethod } from "../header/headerSlice";

type LocationCardProps = {
  Date?: string;
  title?: string;
  cityKey?: string;
  Temperature: {
    Minimum: number;
    Maximum: number;
    Unit: string;
  };
  handleRemove?: (cityKey: string) => void;
};

export const LocationCard: React.FC<LocationCardProps> = (props) => {
  const {
    Date,
    Temperature: temperature,
    title,
    cityKey,
    handleRemove,
  } = props;

  const temperatureMethod = useAppSelector(selectTemperatureMethod);
  const [deleted, setDeleted] = useState(false);

  const transition = useTransition(!deleted, {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
    leave: { opacity: 0 },
  });

  const temperatureString = useMemo(() => {
    if (temperatureMethod === "C" && temperature.Unit === "F") {
      return `${fToC(temperature?.Minimum)} - ${temperature?.Maximum}°C`;
    } else if (temperatureMethod === "F" && temperature.Unit === "C") {
      return `${cToF(temperature?.Minimum)} - ${temperature?.Maximum}°F`;
    } else
      return `${temperature?.Minimum} - ${temperature?.Maximum}°${temperature?.Unit}`;
  }, [temperatureMethod, temperature]);

  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <NavLink
          to={`/home?cityKey=${cityKey}&cityTitle=${title}`}
          className="border dark:bg-slate-600 dark:text-white bg-gray-50 flex relative items-center justify-center flex-col  max-h-44 rounded-md p-1 hover:ring flex-shrink-0"
        >
          {handleRemove && (
            <button
              className="justify-self-end self-end absolute top-0 right-0 m-1"
              onClick={(e) => {
                if (cityKey) {
                  e.preventDefault();
                  setDeleted(true);
                  setTimeout(() => {
                    handleRemove(cityKey);
                  }, 400);
                }
              }}
            >
              <div className="flex items-center justify-center border rounded-xl p-1">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </button>
          )}
          {title && <div className="text-xl font-bold">{title}</div>}
          {Date && <div>{moment(Date).format("dddd ,Do")}</div>}
          <div className="text-center">{temperatureString}</div>
          <div className="mt-12 hover:underline">click hare for more info</div>
        </NavLink>
      </animated.div>
    ) : (
      <></>
    )
  );
};

export default LocationCard;
