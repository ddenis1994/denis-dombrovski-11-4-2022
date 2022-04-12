import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectFavoritesIds } from "./favoritesSlice";
import LoadFavorite from "./LoadFavorite";

type FavoritesProps = {};

const Favorites: React.FC<FavoritesProps> = () => {
  const favorites = useAppSelector(selectFavoritesIds);

  if (favorites.length < 1)
    return (
      <div className="flex items-center justify-center h-full">
        <div>You dont have any favorites yet please add some</div>
      </div>
    );

  return (
    <div className="grid sm:grid-flow-row sm:items-start sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 items-center justify-center gap-2 w-full p-1">
      {favorites.map((cityId) => (
        <LoadFavorite key={cityId} cityKey={cityId} />
      ))}
    </div>
  );
};

export default Favorites;
