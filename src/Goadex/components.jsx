import styled from "styled-components";
import { GoatImage, ImageContainer } from "../components/Goat/components";

export const GoadexContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 600px;
  gap: 20px;
`;

export const SmallContainer = styled.div`
  border-radius: 16px;
  background-color: white;
  display: grid;
  grid-template-rows: auto 50px 30px;
  outline: ${({ selected }) =>
    selected ? "3px solid orange" : "0 solid white"};
  cursor: pointer;
  transform: translate(0, 0);
  transition: all 0.5s ease-in-out;
  width: 100%;
  max-width: 200px;
`;

export const ComposedImage = ({ skin }) => {
  const { skinRarity, compositeSkinHeadCID, compositeSkinBodyCID } = skin.meta;
  const head = `https://goatedgoats.mypinata.cloud/ipfs/${compositeSkinHeadCID}`;
  const body = `https://goatedgoats.mypinata.cloud/ipfs/${compositeSkinBodyCID}`;
  const imageAlt = "";
  return (
    <ImageContainer rarity={skinRarity} className="small">
      <GoatImage src={body} alt={imageAlt} title={imageAlt} />
      <GoatImage src={head} alt={imageAlt} title={imageAlt} order={2} />
    </ImageContainer>
  );
};
