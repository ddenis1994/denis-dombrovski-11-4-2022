import React from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  useGetCurrentWeatherQuery,
  useGetTodayWhetherQuery,
} from "../../service/weatherService";
import LocationCard from "../locationCard/LocationCard";
import { addOrRemoveFavorite } from "./favoritesSlice";
type LoadFavoriteProps = {
  cityKey: string;
  title: string;
};

const LoadFavorite: React.FC<LoadFavoriteProps> = (props) => {
  const { cityKey, title } = props;
  const dispatch = useAppDispatch();

  const { data } = useGetTodayWhetherQuery(
    {
      cityKey,
      apikey: process.env.REACT_APP_WEATHER_KEY ?? "",
    },
    { skip: !!process.env.STORYBOOK_MODE }
  );

  return (
    <LocationCard
      handleRemove={() => {
        dispatch(addOrRemoveFavorite({ id: cityKey, title }));
      }}
      cityKey={cityKey}
      title={title}
      Temperature={{
        Minimum: data?.DailyForecasts?.[0].Temperature?.Maximum?.Value ?? 21,
        Maximum: data?.DailyForecasts?.[0].Temperature.Minimum?.Value ?? 30,
        Unit: data?.DailyForecasts?.[0].Temperature?.Maximum?.Unit ?? "C",
      }}
    />
  );
};

export default LoadFavorite;
