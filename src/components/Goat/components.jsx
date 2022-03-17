import styled from "styled-components";
import { rarityColors } from "../../utils/colors";
import { Link } from "react-router-dom";

export const Container = styled.div`
  border-radius: 16px;
  background-color: white;
`;

export const ImageContainer = styled.div`
  overflow: clip;
  border-radius: 16px 16px 0 0;
`;
export const GoatImage = styled.img`
  width: 200px;
`;
export const GoatName = styled.h3`
  text-align: center;
  font-size: 20px;
  margin: 0;
  color: ${({ rarity }) => rarityColors[rarity]};
`;

export const Content = styled.div`
  padding: 10px;
  padding-bottom: 0;
  display: grid;
  grid-template-rows: 30px 90px auto;
`;
export const Values = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
export const ValueDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
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
  box-shadow: ${({rarity}) => rarity === "legendary" ? `0 0 8px ${rarityColors[rarity]}aa` : "none"};
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

  ${({ rarity }) => {
    let capitalize = rarity === "legendary";
    const pillColor = rarityColors[rarity];
    const bgColor = `${pillColor}33`
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
  &:last-child{
    margin-bottom: 0;
  }
`

export const Slot = styled(Link)`
  --size: 30px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-color: ${({rarity, empty})=> {
    if(empty){
      return "#eee"
    }
    return rarityColors[rarity] || "#ddd"
}};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`;