

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

type InitialState = {
    favoritesIds: string[],

}
const initialState: InitialState = {
    favoritesIds: ["215854"],

}


export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addOrRemoveFavorite: (state, action) => {
            if (state.favoritesIds.includes(action.payload)) {
                state.favoritesIds = state.favoritesIds.filter(id => id !== action.payload)
            } else {
                state.favoritesIds.push(action.payload)
            }
        }
    }
})


export const { addOrRemoveFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer

export const selectFavoritesIds = (state: RootState) => state.favorite.favoritesIds

export const isSelectedCity = createSelector([selectFavoritesIds, (state: unknown, id: string) => id], (favoriteIds, id) => {
    return !!favoriteIds.find(favoriteId => favoriteId === id)
})
