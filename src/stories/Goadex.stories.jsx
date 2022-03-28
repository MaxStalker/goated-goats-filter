import React from "react";
import { SingleGoadexGoat } from "../Goadex";
import { Header } from "./Header";

export default {
  title: "Goadex/Goat",
  component: SingleGoadexGoat,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

const Template = (args) => <SingleGoadexGoat {...args} />;

export const Collected = Template.bind({});
Collected.args = {
  name: "Brown",
  skin: {
    meta: {
      thumbnailCID: "QmPDF2dGa8HMKhdYxHQviU5GhoHDS8bT6m3EjuAQJR4PS4",
      compositeSkinBodyFileName: "skin-body-body-green.png",
      compositeSkinHeadCID: "QmWXBYM197sBnWW8fjZn2jReqTq2cUni3wqaEzeDoHc3WM",
      skinRarity: "common",
      compositeSkinHeadFileName: "head-head-green.png",
      skinFileName: "skin-green.png",
      compositeSkinBodyCID: "Qmc1FjEdhcwqGG3FRLR574n7sSJQDtch8fr3whPUUzCx5z",
    },
  },
};

export const NotCollected = Template.bind({});
NotCollected.args = {};
