import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCity } from "../homeSlice";
import { useGetCurrentWeatherQuery } from "../../../service/weatherService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import NextFiveDays from "./NextFiveDays";
import {
  addOrRemoveFavorite,
  isSelectedCity,
} from "../../favorites/favoritesSlice";
import { useSearchParams } from "react-router-dom";

const Data = () => {
  const city = useAppSelector(selectCity);

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const isInFavorites = useAppSelector((state) =>
    isSelectedCity(state, city.key)
  );

  const cityKeyFromParams = searchParams.get("cityKey");

  const { data } = useGetCurrentWeatherQuery(
    {
      cityKey: cityKeyFromParams ?? city.key,
      apikey: process.env.REACT_APP_WEATHER_KEY ?? "",
    },
    { skip: !!process.env.STORYBOOK_MODE }
  );

  const temperatureData: string = useMemo(
    () =>
      Object.keys(data?.[0].Temperature ?? {}).find(
        (tempters) => data?.[0].Temperature?.[tempters]?.Unit === "C"
      ) ?? "",
    [data]
  );

  return (
    <div className="flex items-center justify-center h-full">
      <div className="border w-full h-full p-4 flex justify-between flex-col ">
        <div>
          <div className="flex justify-between">
            <div>
              <div>{city.title}</div>
              <div>{data?.[0].Temperature?.[temperatureData]?.Value}</div>
            </div>
            <div>
              <button
                onClick={() => dispatch(addOrRemoveFavorite(city.key))}
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
          <div> {data?.[0].WeatherText}</div>
        </div>
        <div>
          <NextFiveDays />
        </div>
      </div>
    </div>
  );
};

export default Data;
