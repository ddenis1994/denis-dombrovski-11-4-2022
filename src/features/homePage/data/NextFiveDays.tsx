import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { useGet5DaysQuery } from "../../../service/weatherService";
import { selectCity, selectNextFiveDays } from "../homeSlice";
import LocationCard from "../../locationCard/LocationCard";

const NextFiveDays = () => {
  const city = useAppSelector(selectCity);
  const nextFiveDays = useAppSelector(selectNextFiveDays);

  useGet5DaysQuery(
    {
      cityKey: city.key,
      apikey: process.env.REACT_APP_WEATHER_KEY ?? "",
    },
    { skip: !!process.env.STORYBOOK_MODE }
  );

  return (
    <div className="p-2">
      <div className="grid  lg:grid-flow-col gap-2 ">
        {nextFiveDays.map((forecast) => (
          <LocationCard
            key={forecast.Date}
            Date={forecast.Date}
            Temperature={{
              Minimum: forecast.Temperature.Minimum.Value,
              Maximum: forecast.Temperature.Maximum.Value,
              Unit: forecast.Temperature.Maximum.Unit,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NextFiveDays;
