import { faCloud, faHouse, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import NavBar from "../navBar/NavBar";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const navigation = [
    {
      route: "/",
      label: "Home",
      icon: <FontAwesomeIcon icon={faHouse} />,
    },
    {
      route: "/favorites",
      label: "Favorites",
      icon: <FontAwesomeIcon icon={faStar} />,
    },
  ];

  return (
    <header className="flex flex-col gap-2 items-center sm:flex-row sm:justify-between">
      <div className="text-xl font-semibold">
        <FontAwesomeIcon icon={faCloud} /> My Weather app
      </div>
      <div className={`border w-full sm:hidden`} />
      <div>
        <NavBar navigation={navigation} />
      </div>
    </header>
  );
};

export default Header;
