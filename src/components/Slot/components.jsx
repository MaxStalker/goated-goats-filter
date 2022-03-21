import styled from "styled-components";
import { rarityColors } from "../../utils/colors";
import body from "../../images/goat-body.png";
import head from "../../images/goat-head.png";

export const Container = styled.div`
  --size: 30px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: ${({ rarity, empty }) => {
    if (empty) {
      return "#eee";
    }
    return rarityColors[rarity] || "#ddd";
  }};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  position: relative;
`;

export const ToolTip = styled.div`
  align-items: center;
  justify-content: center;
  background-color: white;
  min-width: 150px;
  overflow: clip;
  border-radius: 16px;
  box-shadow: 0 10px 8px 1px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.35);
  position: absolute;
  // pointer-events: none;
  z-index: 5;
  top: 35px;
  left: -35px;

  display: grid;
  grid-template-rows: repeat(3, auto);
`;

export const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ rarity }) => `${rarityColors[rarity]}33`};
  overflow: clip;
  border-radius: 16px 16px 0 0;
  position: relative;
  &.min200 {
    min-width: 200px;
    min-height: 200px;
  }
`;
export const Preview = styled.img`
  width: 100%;
  height: auto;
  min-width: 100%;
  z-index: ${({ elevate = 2 }) => elevate};
`;

export const Silhouette = styled.img.attrs((props) => ({
  src: "https://goatedgoats.com/goat-silhouette.svg",
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

export const SilhouetteBody = styled.img.attrs((props) => ({
  src: body,
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  min-width: 100%;
  z-index: 2;
`;

export const SilhouetteHead = styled.img.attrs((props) => ({
  src: head,
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  min-width: 100%;
  z-index: 2;
`;

export const TraitName = styled.p`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 0.25em;
`;

export const Content = styled.div`
  padding: 10px;
  padding-bottom: 0;
`;

export const TraitScore = styled.p``;
