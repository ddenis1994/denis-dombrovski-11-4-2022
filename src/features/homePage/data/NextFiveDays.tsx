import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { useGet5DaysQuery } from "../../../service/weatherService";
import { selectCityKey } from "../homeSlice";
import moment from "moment";

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
          <div className="border h-32 rounded-md p-1 flex-shrink-0" key={forecast.Date}>
            <div>{moment(forecast.Date).format("dddd ,Do")}</div>
            <div>
              {forecast.Temperature.Maximum.Value} -{" "}
              {forecast.Temperature.Maximum.Value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextFiveDays;
