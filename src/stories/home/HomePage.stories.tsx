import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";
import { RootState } from "../../app/store";
import favoriteSlice from "../../features/favorites/favoritesSlice";
import { HomePage } from "../../features/homePage/HomePage";
import homeSlice, { initialState } from "../../features/homePage/homeSlice";

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
    <Provider
      store={createStore({
        favorite: { favoritesIds: [] },
        homeSlice: {
          ...initialState,
          WeatherText:"sunny",
          nextFiveDays: [
            {
              Date: "2020-06-01",
              Temperature: {
                Minimum: { Value: 10, Unit: "C" },
                Maximum: { Value: 20, Unit: "C" },
              },
            },
            {
              Date: "2020-06-02",
              Temperature: {
                Minimum: { Value: 10, Unit: "C" },
                Maximum: { Value: 20, Unit: "C" },
              },
            },
            {
              Date: "2020-06-03",
              Temperature: {
                Minimum: { Value: 10, Unit: "C" },
                Maximum: { Value: 20, Unit: "C" },
              },
            },
            {
              Date: "2020-06-04",
              Temperature: {
                Minimum: { Value: 10, Unit: "C" },
                Maximum: { Value: 20, Unit: "C" },
              },
            },
            {
              Date: "2020-06-05",
              Temperature: {
                Minimum: { Value: 10, Unit: "C" },
                Maximum: { Value: 20, Unit: "C" },
              },
            },
          ],
        },
      })}
    >
      <Story />
    </Provider>
  ),
];
