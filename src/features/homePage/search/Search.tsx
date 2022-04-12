import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { useAppDispatch } from "../../../app/hooks";
import {
  useLazyGetCityByGeoLocationQuery,
  useLazyAutoCompleteQuery,
} from "../../../service/weatherService";
import { setSelectedCityKey, setSelectedCityTitle } from "../homeSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const [search, { data, error }] = useLazyAutoCompleteQuery();
  const [findByGeoLocation, { error: geoLocationError }] =
    useLazyGetCityByGeoLocationQuery();
  const [searchParms, setSearchParams] = useSearchParams();



  useEffect(() => {
    const success: PositionCallback = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const key = process.env.REACT_APP_WEATHER_KEY;
      if (!key) return;
      //@ts-ignore
      const q: `${string},${string}` = `${latitude},${longitude}`;
      findByGeoLocation({
        q,
        apikey: key,
      });
    };

    function error() {
      // status.textContent = "Unable to retrieve your location";
    }
    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [findByGeoLocation]);

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
