import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type TemperatureMethod = "C" | "F"

type ThemeMode = "light" | "dark" | "default"

type InitialState = {
    temperatureMethod: TemperatureMethod,
    darkMode: ThemeMode
}

const initialState: InitialState = {
    temperatureMethod: "C",
    darkMode: "default",
}

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setTemperatureMethod: (state, action: PayloadAction<TemperatureMethod>) => {
            state.temperatureMethod = action.payload
        },
        setDarkMode: (state, action: PayloadAction<ThemeMode>) => {
            state.darkMode = action.payload
        }
    },
    extraReducers: (builder) => {

    }
})


export const { setTemperatureMethod, setDarkMode } = headerSlice.actions

export default headerSlice.reducer

export const selectDarkMode = (state: RootState) => state.header.darkMode
export const selectTemperatureMethod = (state: RootState) => state.header.temperatureMethod