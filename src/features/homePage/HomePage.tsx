import React from "react";
import Search from "./search/Search";

type HomeProps = {};

export const HomePage: React.FC<HomeProps> = () => {
  return (
    <div>
      <div>
        <Search />
      </div>
      <div>data</div>
    </div>
  );
};
