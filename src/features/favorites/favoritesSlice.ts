

import { createSlice } from '@reduxjs/toolkit'

type InitialState = {
    favoritesIds: string[],

}
const initialState: InitialState = {
    favoritesIds:[],

}


export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favoritesIds.push(action.payload)
        }
    }
})


export const { addFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer
