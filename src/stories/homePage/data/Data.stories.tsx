import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";
import { RootState } from "../../../app/store";
import favoriteSlice from "../../../features/favorites/favoritesSlice";
import Data from "../../../features/homePage/data/Data";
import homeSlice from "../../../features/homePage/homeSlice";

const createStore = (preloadState: Partial<RootState>) =>
  configureStore({
    reducer: {
      homeSlice: homeSlice,
      favorite: favoriteSlice,
      // [weatherApi.reducerPath]: weatherApi.reducer,
    },
    preloadedState: preloadState,
  });

export default {
  title: "Home/data",
  component: Data,
} as ComponentMeta<typeof Data>;

const Template: ComponentStory<typeof Data> = (args) => <Data />;

export const Primary = Template.bind({});

Primary.args = {};

Primary.decorators = [
  (Story) => (
    <Provider store={createStore({ favorite: { favoritesIds: [] } })}>
      <Story />
    </Provider>
  ),
];
