import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import homeSlice from '../features/homePage/homeSlice';
import { weatherApi } from '../service/weatherService';
import { setupListeners } from '@reduxjs/toolkit/query'
import favoriteSlice from '../features/favorites/favoritesSlice';
import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'
import { toast } from "react-toastify";

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {

    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!')
      if (503 === action.payload.status && !toast.isActive('serverError')) {
        toast.error(JSON.stringify(action.payload.data.Message), { toastId: "serverError" });
      }
    }

    return next(action)
  }

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    homeSlice: homeSlice,
    favorite: favoriteSlice,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([weatherApi.middleware, rtkQueryErrorLogger]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch)
