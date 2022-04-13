import { configureStore } from "@reduxjs/toolkit";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Provider } from "react-redux";
import { RootState } from "../app/store";
import favoriteSlice from "../features/favorites/favoritesSlice";
import headerSlice from "../features/header/headerSlice";
import homeSlice from "../features/homePage/homeSlice";
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
    // preloadedState: preloadState,
  });

const Template: ComponentStory<typeof FullApp> = (args) => {
  return <FullApp />;
};

export const Primary = Template.bind({});

Primary.args = {};

Primary.decorators = [
  (Story) => (
    <Provider store={createStore()}>
      <Story />
    </Provider>
  ),
];
