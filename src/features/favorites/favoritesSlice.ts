

import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

type InitialState = {
    favoritesIds: { id: string, title: string }[],

}
const initialState: InitialState = {
    favoritesIds: [{ id: "215854", title: "Tel Aviv" }],

}


export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addOrRemoveFavorite: (state, action: PayloadAction<{ id: string, title: string }>) => {
            debugger;
            if (state.favoritesIds.find(favorite => favorite.id === action.payload.id)) {
                state.favoritesIds = state.favoritesIds.filter(id => id.id !== action.payload.id)
            } else {
                state.favoritesIds.push(action.payload)
            }
            return state
        }
    }
})


export const { addOrRemoveFavorite } = favoriteSlice.actions

export default favoriteSlice.reducer

export const selectFavoritesIds = (state: RootState) => state.favorite.favoritesIds

export const isSelectedCity = createSelector([selectFavoritesIds, (state: unknown, id: string) => id], (favoriteIds, id) => {
    return !!favoriteIds.find(favoriteId => favoriteId.id === id)
})
