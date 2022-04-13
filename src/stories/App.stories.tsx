import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";
import { RootState } from "../app/store";
import favoriteSlice from "../features/favorites/favoritesSlice";
import headerSlice from "../features/header/headerSlice";
import homeSlice, { initialState as homeInitialState } from "../features/homePage/homeSlice";
import { FullApp } from "../FullApp";

export default {
  title: "App",
  component: FullApp,
} as ComponentMeta<typeof FullApp>;

const createStore = (preloadState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      homeSlice: homeSlice,
      favorite: favoriteSlice,
      header: headerSlice,
    },
    preloadedState: preloadState,
  });

const Template: ComponentStory<typeof FullApp> = (args) => {
  return <FullApp />;
};

export const Primary = Template.bind({});

Primary.args = {};

Primary.decorators = [
  (Story) => (
    <Provider
      store={createStore({
        favorite: { favoritesIds: ["1", "2", "3", "4", "5", "6", "7"] },
        homeSlice: {
          ...homeInitialState,
          WeatherText: "sunny",
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
