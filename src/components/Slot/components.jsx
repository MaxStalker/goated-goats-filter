import styled from "styled-components";
import { rarityColors } from "../../utils/colors";

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
  min-width: 120px;
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
`;
export const Preview = styled.img`
  width: 100%;
  height: auto;
`;

export const TraitName = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`;

export const Content = styled.div`
  padding: 10px;
`;

export const TraitScore = styled.p``;
