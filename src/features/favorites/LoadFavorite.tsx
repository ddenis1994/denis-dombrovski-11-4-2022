import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { useGetCurrentWeatherQuery } from "../../service/weatherService";
import LocationCard from "../locationCard/LocationCard";
import { addOrRemoveFavorite } from "./favoritesSlice";
type LoadFavoriteProps = {
  cityKey: string;
};

const LoadFavorite: React.FC<LoadFavoriteProps> = (props) => {
  const { cityKey } = props;
  const dispatch = useAppDispatch();
  

  const { data } = useGetCurrentWeatherQuery(
    {
      cityKey,
      apikey: process.env.REACT_APP_WEATHER_KEY ?? "",
    },
    { skip: !!process.env.STORYBOOK_MODE }
  );

  return (
    <LocationCard
      handleRemove={() => {
        dispatch(addOrRemoveFavorite(cityKey));
      }}
      cityKey={cityKey}
      Temperature={{
        Minimum: data?.[0].Temperature?.["Minimum"]?.Value ?? 21,
        Maximum: data?.[0].Temperature?.["Maximum"]?.Value ?? 30,
      }}
    />
  );
};

export default LoadFavorite;
