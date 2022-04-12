import React, { useEffect } from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDarkMode } from "./headerSlice";

const ThemeSelect = () => {
  useEffect(() => {
    // localStorage.theme = 'dark'
    // localStorage.theme = 'light'
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

  const darkMode = useAppSelector(selectDarkMode);

  const themeOptions = [
    {
      value: "dark",
      label: "Dark",
    },
    {
      value: "light",
      label: "Light",
    },
    {
      value: "auto",
      label: "Auto",
    },
  ];

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      //   defaultValue={colourOptions[0]}
      name="theme"
      options={themeOptions}
      onChange={(e) => {}}
    />
  );
};

export default ThemeSelect;
