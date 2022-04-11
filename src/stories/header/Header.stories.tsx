import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "../../features/header/Header";


export default {
  title: "NevBar/header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
