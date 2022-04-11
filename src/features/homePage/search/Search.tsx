import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { useAppDispatch } from "../../../app/hooks";
import { useLazyAutoCompleteQuery } from "../../../service/weatherService";
import { setSelectedCityKey, setSelectedCityTitle } from "../homeSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const [search, { data }] = useLazyAutoCompleteQuery();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const loadDefaultValues = async () => {
      const key = process.env.REACT_APP_WEATHER_KEY;
      if (!key) return;
      search({
        q: "",
        apikey: key,
      }).unwrap();
    };
    loadDefaultValues();
  }, [search]);

  const loadOptions = async (
    inputValue: string,
    callback: (options: unknown[]) => void
  ) => {
    const key = process.env.REACT_APP_WEATHER_KEY;
    if (!key) return callback([]);
    const result = await search({
      q: inputValue,
      apikey: key,
    }).unwrap();

    return callback(
      result.map((city) => ({ value: city.Key, label: city.LocalizedName }))
    );
  };

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, "");
    setSearchParams({ cityTitle: inputValue });
    return inputValue;
  };

  return (
    <div>
      <AsyncSelect
        isClearable
        cacheOptions
        //@ts-ignore
        loadOptions={loadOptions}
        defaultOptions={data?.map((city) => ({
          value: city.Key,
          label: city.LocalizedName,
        }))}
        onChange={(selectedOption) => {
          if (selectedOption) {
            dispatch(setSelectedCityTitle(selectedOption.label));
            dispatch(setSelectedCityKey(selectedOption.value));
            setSearchParams({
              cityKey: selectedOption.value,
              cityTitle: selectedOption.label,
            });
          }
        }}
        defaultValue={[{ value: "215854", label: "Tel Aviv" }]}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
