import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { useLazyAutoCompleteQuery } from "../../../service/weatherService";

const Search = () => {
  const [value, setValue] = useState("");
  const [search, { isLoading, isFetching, isError }] =
    useLazyAutoCompleteQuery();

  const loadOptions = async (
    inputValue: string,
    callback: (options: unknown[]) => void
  ) => {
    const key = process.env.REACT_APP_WEATHER_KEY;
    if (!key) return callback([]);
    const result=await search({
      q: inputValue,
      apikey: key,
    }).unwrap()
    debugger;
    return callback(result);
  };

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, "");
    setValue(value);
    return inputValue;
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        //@ts-ignore
        loadOptions={loadOptions}
        defaultOptions
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
