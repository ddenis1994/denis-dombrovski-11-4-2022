import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectFavoritesIds } from "./favoritesSlice";
import LoadFavorite from "./LoadFavorite";

const Favorites = () => {
  const favorites = useAppSelector(selectFavoritesIds);
  return (
    <div className="grid grid-flow-col">
      {favorites.map((cityId) => (
        <div key={cityId}>
          <LoadFavorite cityKey={cityId} />
        </div>
      ))}
    </div>
  );
};

export default Favorites;
