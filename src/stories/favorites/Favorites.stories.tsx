import { ComponentMeta, ComponentStory } from "@storybook/react";
import Favorites from "../../features/favorites/Favorites";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoriteSlice from "../../features/favorites/favoritesSlice";
import { RootState } from "../../app/store";
import { weatherApi } from "../../service/weatherService";

const createStore = (preloadState: Partial<RootState>) =>
  configureStore({
    reducer: {
      favorite: favoriteSlice,
      [weatherApi.reducerPath]: weatherApi.reducer,
    },
    preloadedState: preloadState,
  });

export default {
  title: "Favorites",
  component: Favorites,
} as ComponentMeta<typeof Favorites>;

const Template: ComponentStory<typeof Favorites> = (args) => {
  return <Favorites {...args} />;
};

export const EmptyFavorites = Template.bind({});

EmptyFavorites.args = {};

EmptyFavorites.decorators = [
  (Story) => (
    <Provider store={createStore({ favorite: { favoritesIds: [] } })}>
      <Story />
    </Provider>
  ),
];

export const SingleFavorite = Template.bind({});

SingleFavorite.decorators = [
  (Story) => (
    <Provider
      store={createStore({
        favorite: {
          favoritesIds: [
            { id: "1", title: "tlv" },
            { id: "2", title: "tlv" },
            { id: "3", title: "tlv" },
            { id: "4", title: "tlv" },
            { id: "5", title: "tlv" },
            { id: "6", title: "tlv" },
            { id: "7", title: "tlv" },
            { id: "8", title: "tlv" },
            { id: "9", title: "tlv" },
          ],
        },
      })}
    >
      <Story />
    </Provider>
  ),
];
