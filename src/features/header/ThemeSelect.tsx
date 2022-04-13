import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectDarkMode, setThemeMode } from "./headerSlice";

const ThemeSelect = () => {
  const dispatch = useAppDispatch();

  const themeMode = useAppSelector(selectDarkMode);

  const handleChange = useCallback(() => {  
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

  useEffect(() => {
    if (localStorage.theme !== "auto") return;
    const handleChangeInTherme = (event: MediaQueryListEvent) => {
      const newColorScheme = event.matches ? "dark" : "light";
      if (newColorScheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleChangeInTherme);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleChangeInTherme);
    };
  }, []);

  useEffect(() => {
    handleChange();
  }, [handleChange, themeMode]);

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
      value: "default",
      label: "Default",
    },
  ];

  return (
    <div>
      <label>Theme: </label>
      <select
        className="border px-1 py-1 rounded-md bg-transparent"
        name="theme"
        value={themeMode}
        onChange={(e) => {
          dispatch(setThemeMode(e.target.value as typeof themeMode));
          localStorage.theme = e.target.value;
        }}
      >
        {themeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelect;
