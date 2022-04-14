import React from "react";
import Data from "./data/Data";
import Search from "./search/Search";

type HomeProps = {};

export const HomePage: React.FC<HomeProps> = () => {
  return (
    <div className="flex justify-between items-center flex-col dark:text-white h-full gap-4">
      <div className="w-64">
        <Search />
      </div>
      <div className="h-full block overflow-y-auto w-full">
        <Data />
      </div>
    </div>
  );
};
