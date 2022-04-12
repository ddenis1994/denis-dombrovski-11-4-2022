import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HomePage } from "../../features/homePage/HomePage";

export default {
  title: "Home/homePage",
  component: HomePage,
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = (args) => (
  <HomePage {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
