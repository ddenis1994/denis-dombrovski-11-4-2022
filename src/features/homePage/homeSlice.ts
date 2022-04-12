import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { weatherApi } from '../../service/weatherService';

type InitialState = {
    city: {
        key: string;
        title: string;
    }

}
const initialState: InitialState = {
    city: {
        key: '215854',
        title: 'Tel Aviv'
    },

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
                // state.selectedCityKey = action.payload.city.id
                // state.selectedCityTitle = action.payload.city.name
            })
            .addMatcher(weatherApi.endpoints.getCityByGeoLocation.matchFulfilled, (state, action) => {
                state.city = {
                    key: action.payload.Key,
                    title: action.payload.LocalizedName
                }
            })
            .addMatcher(weatherApi.endpoints.getCityByLocationKey.matchFulfilled, (state, action) => {
            })
    }
})


export const { setSelectedCity } = homeSlice.actions

export default homeSlice.reducer

export const selectCity = (state: RootState) => state.homeSlice.city