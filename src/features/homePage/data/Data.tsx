import React, { useMemo } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectCityKey, selectCityTitle } from "../homeSlice";
import { useGetCurrentWeatherQuery } from "../../../service/weatherService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import NextFiveDays from "./NextFiveDays";

const Data = () => {
  const selectedKey = useAppSelector(selectCityKey);
  const selectedTitle = useAppSelector(selectCityTitle);
  const { data } = useGetCurrentWeatherQuery({
    cityKey: selectedKey,
    apikey: process.env.REACT_APP_WEATHER_KEY ?? "",
  });

  const temperatureData: string = useMemo(
    () =>
      Object.keys(data?.[0].Temperature ?? {}).find(
        (tempters) => data?.[0].Temperature?.[tempters]?.Unit === "C"
      ) ?? "",
    [data]
  );
  console.log(data);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="border w-full h-full p-4 flex justify-between flex-col ">
        <div>
          <div className="flex justify-between">
            <div>
              <div>{selectedTitle}</div>
              <div>{data?.[0].Temperature?.[temperatureData]?.Value}</div>
            </div>
            <div>
              <button className=" items-center px-1 py-0.5 block border rounded-md hover:bg-gray-500 hover:text-white transition-colors ease-out">
                <div className="flex gap-1 items-center">
                  <FontAwesomeIcon icon={faHeart} />
                  <div>Add to Favorites</div>
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
