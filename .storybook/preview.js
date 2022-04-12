import React from "react";
import "tailwindcss/tailwind.css";
import { MemoryRouter } from "react-router-dom";
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import "react-toggle/style.css"


// .storybook/preview.js

const customViewports = {
  xlScreen: {
    name: 'xl-screen',
    styles: {
      width: '1280px',
      height: '1440px',
    },
  },
  twoXlScreen: {
    name: '2xl-screen',
    styles: {
      width: '1536px',
      height: '1080px',
    },
  }
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: { viewports: { ...MINIMAL_VIEWPORTS, ...customViewports } },


}

export const decorators = [
  (Story) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
];