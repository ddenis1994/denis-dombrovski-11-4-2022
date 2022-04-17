import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Weather } from './autoCompleteResponse'


const proxyServer = process.env.REACT_APP_PROXY_SERVER ?? ""

export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: proxyServer + 'http://dataservice.accuweather.com/',

    }),
    endpoints: (builder) => ({
        autoComplete: builder.query<Weather.AutoComplete.Response, {
            apikey: string,
            q: string,
            language?: string,
        }>({
            query: (props) => `locations/v1/cities/autocomplete?${(Object.keys(props) as Array<keyof typeof props>).map(key => !!props[key] && `${key}=${props[key]}`).join('&')}`,

        }),
        getCurrentWeather: builder.query<Weather.CurrentWeather.Return, {
            cityKey: string,
            apikey: string,
        }>({
            query: (props) => `currentconditions/v1/${props.cityKey}?apikey=${props.apikey}`,
        }),
        get5Days: builder.query<Weather.FiveDays.Return, {
            cityKey: string,
            apikey: string,
        }>({
            query: ({ apikey, cityKey }) => `forecasts/v1/daily/5day/${cityKey}?apikey=${apikey}`,
        }),
        getCityByGeoLocation: builder.query<Weather.CityByGeoLocation.Response, Weather.CityByGeoLocation.Request>({
            query: ({ apikey, q }) => `locations/v1/cities/geoposition/search?apikey=${apikey}&q=${q}`,
        }),
        getCityByLocationKey: builder.query({
            query: ({ apikey, locationKey }) => `locations/v1/${locationKey}?apikey=${apikey}`,
        }),
        getTodayWhether: builder.query<Weather.OneDay.Response, {
            cityKey: string,
            apikey: string,
        }>({
            query: (props) => `forecasts/v1/daily/1day/${props.cityKey}?apikey=${props.apikey}`,
        }),
    }),
})


export const { useGetTodayWhetherQuery, useGetCurrentWeatherQuery, useGet5DaysQuery, useLazyAutoCompleteQuery, useLazyGetCityByGeoLocationQuery, useLazyGetCityByLocationKeyQuery } = weatherApi