import styled from "styled-components";
import { rarityColors } from "../../utils/colors";
import { Link } from "react-router-dom";

export const Container = styled.div`
  border-radius: 16px;
  background-color: white;
  outline: ${({ selected }) =>
    selected ? "3px solid orange" : "0 solid white"};
  cursor: pointer;
  transform: translate(0, 0);
  transition: all 0.5s ease-in-out;
  width: 100%;

  &:hover {
    transform: translate(0px, -10px);
    transition: all 0.1s;
    z-index: 5;
    box-shadow: 0 10px 10px 1px rgba(0, 0, 0, 0.05);
  }
`;

export const ImageContainer = styled.div`
  overflow: clip;
  border-radius: 16px 16px 0 0;
  background-color: ${({ rarity }) => `${rarityColors[rarity]}33`};
  position: relative;
  width: 100%;
  margin-bottom: ${({ mb = 0 }) => mb};
  &.small {
    max-width: 120px;
  }
`;
export const GoatImage = styled.img`
  height: ${({ priority = "width" }) =>
    priority === "width" ? "auto" : "100%"};
  width: ${({ priority = "width" }) =>
    priority === "height" ? "auto" : "100%"};
  max-width: 300px;
  display: block;
  position: relative;
  top: 0;
  z-index: ${({ elevate = 2 }) => elevate};
  position: ${({ order = 1 }) => (order > 1 ? "absolute" : "relative")};
}
`;
export const GoatName = styled.h3`
  width: 100%;
  text-align: center;
  font-size: 20px;
  margin: 0;
  color: ${({ rarity }) => rarityColors[rarity]};
  white-space: ${({ wrap = "nowrap" }) => wrap};
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Left = styled.div`
  text-align: left;
`;

export const Right = styled.div`
  text-align: right; ;
`;

export const Content = styled.div`
  padding: 10px 16px;
  padding-bottom: 0;
  display: grid;
  grid-template-rows: ${({ trait }) =>
    trait ? "30px 60px" : "30px 90px auto"};
`;
export const Values = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: ${({ mb = 0 }) => mb};
`;
export const ValueDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-bottom: ${({ mb = 0 }) => mb};
`;
export const Label = styled.label`
  color: #999;
  text-align: center;
  margin-bottom: 0.25em;
`;
export const Value = styled.p`
  font-size: 1.5em;
  font-weight: bold;
`;

export const Rarity = styled.div`
  padding: 5px;
  border-radius: 20px;
  background-color: #cecece;
  width: 80%;
  top: -50%;
  position: absolute;
  color: white;
  font-size: 14px;
  font-weight: bold;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  box-shadow: ${({ rarity }) =>
    rarity === "legendary" ? `0 0 8px ${rarityColors[rarity]}aa` : "none"};
`;

export const RarityContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  height: 24px;
  margin-top: 20px;
  border-radius: 0 0 16px 16px;

  a {
    display: flex;
    flex: 0 0 auto;
    width: 100%;
    top: -50%;
    position: absolute;
    text-align: center;
    justify-content: center;

    label {
      pointer-events: none;
    }

    .details {
      display: none;
    }
    .rarity {
      display: initial;
    }

    &:hover {
      .details {
        display: initial;
      }
      .rarity {
        display: none;
      }
    }
  }

  ${({ rarity }) => {
    const pillColor = rarityColors[rarity];
    const bgColor = `${pillColor}33`;
    return `
      background-color: ${bgColor};
      .pill{
        background-color: ${pillColor};
      }
    `;
  }}
`;

export const SlotsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;
  margin-bottom: 10px;
`;

export const SlotsRow = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const Slot = styled(Link)`
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
`;
