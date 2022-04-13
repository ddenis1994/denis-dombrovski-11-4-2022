import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type TemperatureMethod = "C" | "F"

type ThemeMode = "light" | "dark" | "default"

type InitialState = {
    temperatureMethod: TemperatureMethod,
    themeMode: ThemeMode
}

const initialState: InitialState = {
    temperatureMethod: "C",
    themeMode: "default",
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setTemperatureMethod: (state, action: PayloadAction<TemperatureMethod>) => {
            state.temperatureMethod = action.payload
        },
        setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
            state.themeMode = action.payload
        }
    },
    extraReducers: (builder) => {

    }
})


export const { setTemperatureMethod, setThemeMode } = headerSlice.actions

export default headerSlice.reducer

export const selectDarkMode = (state: RootState) => state.header.themeMode
export const selectTemperatureMethod = (state: RootState) => state.header.temperatureMethod