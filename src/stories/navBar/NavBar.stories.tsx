import { ComponentMeta, ComponentStory } from "@storybook/react";
import NavBar from "../../features/navBar/NavBar";

export default {
  title: "NevBar/bar",
  component: NavBar,
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  navigation: [
    {
      route: "/",
      label: "Home",
    },
    {
      route: "/about",
      label: "Favorites",
    },
  ],
};
