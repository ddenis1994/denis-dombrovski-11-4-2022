import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";
import { RootState } from "../../app/store";
import favoriteSlice from "../../features/favorites/favoritesSlice";
import { HomePage } from "../../features/homePage/HomePage";
import homeSlice from "../../features/homePage/homeSlice";
import { weatherApi } from "../../service/weatherService";

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
  title: "Home/homePage",
  component: HomePage,
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = (args) => (
  <HomePage {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};


Primary.decorators = [
  (Story) => (
    <Provider store={createStore({ favorite: { favoritesIds: [] } })}>
      <Story />
    </Provider>
  ),
];

