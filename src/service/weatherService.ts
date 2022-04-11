import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Weather } from './autoCompleteResponse'


export const weatherApi = createApi({
    reducerPath: 'weatherApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://dataservice.accuweather.com/locations/v1/',
        // prepareHeaders: (headers, { getState }) => {
        //     // By default, if we have a token in the store, let's use that for authenticated requests
        //     const token = (getState() as RootState).auth.token
        //     if (token) {
        //         headers.set('authorization', `Bearer ${token}`)
        //     }
        //     return headers
        // },

    }),
    endpoints: (builder) => ({
        autoComplete: builder.query<Weather.AutoComplete.Response, {
            apikey: string,
            q: string,
            language?: string,
        }>({
            query: () => `cities/autocomplete`,

        }),
        getCurrentWeather: builder.query<Weather.CurrentWeather.Return, string>({
            query: (cityKey) => cityKey,
        }),
        get5Days: builder.query<Weather.FiveDays.Return, string>({
            query: (cityKey) => `daily/5day/${cityKey}`,
        }),
    }),
})


export const { useGetCurrentWeatherQuery, useGet5DaysQuery, useLazyAutoCompleteQuery } = weatherApi