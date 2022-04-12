import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { weatherApi } from '../../service/weatherService';

type InitialState = {
    city: {
        key: string;
        title: string;
    }
    WeatherText: string;
    Temperature: {
        Unit: string;
        UnitType: number
        Value: number
    },
    nextFiveDays: {
        Date: string;
        Temperature: {
            Minimum: {
                Value: number;
                Unit: string;

            };
            Maximum: {
                Value: number;
                Unit: string;

            };
        }
    }[]

}
export const initialState: InitialState = {
    city: {
        key: '215854',
        title: 'Tel Aviv'
    },
    WeatherText: "",
    Temperature: {
        Unit: "F",
        UnitType: 0,
        Value: 0
    },
    nextFiveDays: []

}


export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSelectedCity: (state, action: PayloadAction<{
            key: string;
            title: string;
        }>) => {
            state.city = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(weatherApi.endpoints.getCurrentWeather.matchFulfilled, (state, action) => {
                if (action.payload.length < 1) return state
                state.WeatherText = action.payload[0].WeatherText;
                const keys = Object.keys(action.payload[0].Temperature)
                state.Temperature = action.payload[0].Temperature[keys[0]];
            })
            .addMatcher(weatherApi.endpoints.getCityByGeoLocation.matchFulfilled, (state, action) => {
                state.city = {
                    key: action.payload.Key,
                    title: action.payload.LocalizedName
                }
            })
            .addMatcher(weatherApi.endpoints.getCityByLocationKey.matchFulfilled, (state, action) => {
            })
            .addMatcher(weatherApi.endpoints.get5Days.matchFulfilled, (state, action) => {
                state.nextFiveDays = action.payload.DailyForecasts.map(day => {
                    return {
                        Date: day.Date,
                        Temperature: day.Temperature
                    }
                })
            }
            )
    }
})


export const { setSelectedCity } = homeSlice.actions

export default homeSlice.reducer

export const selectCity = (state: RootState) => state.homeSlice.city
export const selectWeatherText = (state: RootState) => state.homeSlice.WeatherText
export const selectTemperature = (state: RootState) => state.homeSlice.Temperature
export const selectNextFiveDays = (state: RootState) => state.homeSlice.nextFiveDays