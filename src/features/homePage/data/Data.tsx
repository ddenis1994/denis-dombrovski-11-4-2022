import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCity, selectTemperature, selectWeatherText } from "../homeSlice";
import { useGetCurrentWeatherQuery } from "../../../service/weatherService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import NextFiveDays from "./NextFiveDays";
import {
  addOrRemoveFavorite,
  isSelectedCity,
} from "../../favorites/favoritesSlice";
import { useSearchParams } from "react-router-dom";
import { selectTemperatureMethod } from "../../header/headerSlice";
import { cToF, fToC } from "../../../util/tempatureMethodsTransoform";

const Data = () => {
  const city = useAppSelector(selectCity);
  const temperatureMethod = useAppSelector(selectTemperatureMethod);

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const isInFavorites = useAppSelector((state) =>
    isSelectedCity(state, city.key)
  );
  const weatherText = useAppSelector(selectWeatherText);
  const temperature = useAppSelector(selectTemperature);

  const cityKeyFromParams = searchParams.get("cityKey");

  useGetCurrentWeatherQuery(
    {
      cityKey: cityKeyFromParams ?? city.key,
      apikey: process.env.REACT_APP_WEATHER_KEY ?? "",
    },
    { skip: !!process.env.STORYBOOK_MODE }
  );

  const temperatureString = useMemo(() => {
    if (temperatureMethod === "C" && temperature.Unit === "F") {
      return `${fToC(temperature?.Value)}°C`;
    } else if (temperatureMethod === "F" && temperature.Unit === "C") {
      return `${cToF(temperature?.Value)}°F`;
    } else return `${temperature?.Value}°${temperature?.Unit}`;
  }, [temperatureMethod, temperature]);

  return (
    <div className="flex items-center justify-center h-full ">
      <div className="border w-full h-full p-4 flex justify-between flex-col ">
        <div>
          <div className="flex justify-between">
            <div>
              <div>{city.title}</div>
              <div>{temperatureString}</div>
            </div>
            <div>
              <button
                onClick={() =>
                  dispatch(
                    addOrRemoveFavorite({ id: city.key, title: city.title })
                  )
                }
                className=" items-center px-1 py-0.5 block border rounded-md hover:bg-gray-500 hover:text-white transition-colors ease-out"
              >
                <div className="flex gap-1 items-center">
                  <FontAwesomeIcon icon={faHeart} />
                  <div>
                    {isInFavorites ? "Remove from" : "Add to"} Favorites
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="h-full flex items-center justify-center text-2xl">
          <div> {weatherText}</div>
        </div>
        <div>
          <NextFiveDays />
        </div>
      </div>
    </div>
  );
};

export default Data;
