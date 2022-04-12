import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  useLazyGetCityByGeoLocationQuery,
  useLazyAutoCompleteQuery,
  useLazyGetCityByLocationKeyQuery,
} from "../../../service/weatherService";
import { selectCity, setSelectedCity } from "../homeSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const [search, { data }] = useLazyAutoCompleteQuery();
  const [findByGeoLocation] = useLazyGetCityByGeoLocationQuery();
  const [getByKeyId] = useLazyGetCityByLocationKeyQuery();

  const [searchParams, setSearchParams] = useSearchParams();

  const localArea = useAppSelector(selectCity);

  // useEffect(() => {
  //   const defaultCity = searchParams.get("cityKey");
  //   const key = process.env.REACT_APP_WEATHER_KEY;
  //   if (!key || !defaultCity) return;
  //   getByKeyId({
  //     apikey: key,
  //     locationKey: defaultCity,
  //   })
  //     .unwrap()
  //     .then(console.log)
  //     .catch(console.log);
  // }, [getByKeyId, searchParams]);

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
    const cityKey = searchParams.get("cityKey");
    if (navigator.geolocation && !cityKey)
      navigator.geolocation.getCurrentPosition(success);
  }, [findByGeoLocation, searchParams]);

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

  const defaultValue = useMemo(
    () => (localArea ? [{ value: localArea.key, label: localArea.title }] : []),
    [localArea]
  );

  const loadOptions = (
    inputValue: string,
    callback: (options: { value: string; label: string }[]) => void
  ) => {
    const key = process.env.REACT_APP_WEATHER_KEY;
    if (!key) return callback([]);
    search({
      q: inputValue,
      apikey: key,
    })
      .unwrap()
      .then((result) =>
        callback(
          result.map((city) => ({ value: city.Key, label: city.LocalizedName }))
        )
      );
  };

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, "");
    setSearchParams({ cityTitle: inputValue });
    return inputValue;
  };

  return (
    <AsyncSelect
      isClearable
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={data?.map((city) => ({
        value: city.Key,
        label: city.LocalizedName,
      }))}
      onChange={(selectedOption) => {
        if (selectedOption) {
          dispatch(
            setSelectedCity({
              title: selectedOption.label,
              key: selectedOption.value,
            })
          );

          setSearchParams({
            cityKey: selectedOption.value,
            cityTitle: selectedOption.label,
          });
        }
      }}
      defaultValue={defaultValue}
      onInputChange={handleInputChange}
    />
  );
};

export default Search;
