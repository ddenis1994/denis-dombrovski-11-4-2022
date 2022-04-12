import { ComponentMeta, ComponentStory } from "@storybook/react";
import { RootState } from "../../app/store";
import Header from "../../features/header/Header";
import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../../features/header/headerSlice";
import { Provider } from "react-redux";

const createStore = (preloadState: Partial<RootState>) =>
  configureStore({
    reducer: {
      header: headerSlice,
    },
    preloadedState: preloadState,
  });

export default {
  title: "NevBar/header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

Primary.args = {};

Primary.decorators = [
  (Story) => (
    <Provider store={createStore({ favorite: { favoritesIds: [] } })}>
      <Story />
    </Provider>
  ),
];
