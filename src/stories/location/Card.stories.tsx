import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LocationCard } from "../../features/locationCard/LocationCard";

export default {
  title: "LocationCard/LocationCard",
  component: LocationCard,
} as ComponentMeta<typeof LocationCard>;

const Template: ComponentStory<typeof LocationCard> = (args) => {
  return <LocationCard {...args} />;
};

export const FromFavorites = Template.bind({});

FromFavorites.args = {
  Temperature: {
    Minimum: 20,
    Maximum: 30,
  },
  cityKey: "/",
  handleRemove: () => {
    return;
  },
};

export const Primary = Template.bind({});

Primary.args = {
  Date: new Date().toString(),
  Temperature: {
    Minimum: 20,
    Maximum: 30,
  },
};
