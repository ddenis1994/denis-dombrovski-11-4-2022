import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { useGet5DaysQuery } from "../../../service/weatherService";
import { selectCityKey } from "../homeSlice";
import LocationCard from "../../locationCard/LocationCard";

const NextFiveDays = () => {
  const selectedKey = useAppSelector(selectCityKey);

  const { data } = useGet5DaysQuery({
    cityKey: selectedKey,
    apikey: process.env.REACT_APP_WEATHER_KEY ?? "",
  });

  return (
    <div className="p-2">
      <div className="grid grid-flow-col gap-2 ">
        {data?.DailyForecasts.map((forecast) => (
          <LocationCard
            Date={forecast.Date}
            Temperature={{
              Minimum: forecast.Temperature.Minimum.Value,
              Maximum: forecast.Temperature.Maximum.Value,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NextFiveDays;
