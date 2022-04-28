import React from "react";
import { SingleGoadexGoat } from "../Collector";
import { GlobalStyle } from "../Components";
import styled from "styled-components";

export default {
  title: "Collector/Goat",
  component: SingleGoadexGoat,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

const GoadexGallery = styled.div`
  display: grid;
  margin: 20px;
  grid-template-columns: repeat(4, 300px);
  gap: 10px;
`;

const Template = (args) => (
  <GoadexGallery>
    <GlobalStyle />
    <SingleGoadexGoat {...args} />
  </GoadexGallery>
);

export const Collected = Template.bind({});
Collected.args = {
  amount: 5,
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
NotCollected.args = {
  amount: 0,
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
