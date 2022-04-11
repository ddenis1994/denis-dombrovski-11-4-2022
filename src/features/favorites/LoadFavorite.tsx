import React from "react";
import { useGetCurrentWeatherQuery } from "../../service/weatherService";
import LocationCard from "../locationCard/LocationCard";
type LoadFavoriteProps = {
  cityKey: string;
};

const LoadFavorite: React.FC<LoadFavoriteProps> = (props) => {
  const { cityKey } = props;

  const { data } = useGetCurrentWeatherQuery({
    cityKey,
    apikey: process.env.REACT_APP_WEATHER_KEY ?? "",
  });

  return (
    <div>
      <LocationCard
        Date={""}
        Temperature={{
          Minimum: data?.[0].Temperature?.["Minimum"]?.Value ?? 0,
          Maximum: data?.[0].Temperature?.["Maximum"]?.Value ?? 0,
        }}
      />
    </div>
  );
};

export default LoadFavorite;
