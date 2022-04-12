import { faCloud, faHouse, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
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

  useEffect(() => {
    localStorage.theme = 'dark'
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <header className="flex flex-col gap-2 items-center sm:flex-row sm:justify-between dark:text-white">
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
