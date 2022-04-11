import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

type InitialState = {
    selectedCityKey: string;
    selectedCityTitle: string

}
const initialState: InitialState = {
    selectedCityKey: '215854',
    selectedCityTitle: 'Tel Aviv',
}


export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSelectedCityKey: (state, action) => {
            state.selectedCityKey = action.payload
        },
        setSelectedCityTitle: (state, action) => {
            state.selectedCityTitle = action.payload
        }

    }
})


export const { setSelectedCityKey, setSelectedCityTitle } = homeSlice.actions

export default homeSlice.reducer

export const selectCityKey = (state: RootState) => state.homeSlice.selectedCityKey
export const selectCityTitle = (state: RootState) => state.homeSlice.selectedCityTitle