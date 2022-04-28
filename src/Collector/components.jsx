import styled from "styled-components";
import { GoatImage, ImageContainer } from "../components/Goat/components";
import { SilhouetteBody, SilhouetteHead } from "../components/Slot/components";
import { getElevation } from "../utils";

export const GoadexContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export const SmallContainer = styled.div`
  max-width: 150px;
  border-radius: 16px;
  background-color: white;
  display: grid;
  cursor: pointer;
  transform: translate(0, 0);
  transition: all 0.5s ease-in-out;
  box-shadow: ${({ collected = false }) =>
    collected ? "0 2px 5px rgba(0,0,0,0.15)" : "none"};
  filter: ${({ collected = false }) =>
    collected ? "saturate(1) opacity(1)" : "saturate(0) opacity(0.25)"};
  &:hover {
    filter: saturate(1) opacity(1);
  }
  ${({ rows }) => {
    if (rows) {
      return `grid-template-rows: ${rows}`;
    }
  }}
`;

const PINATA = "https://goatedgoats.mypinata.cloud/ipfs";

export const ComposedImage = ({ skin }) => {
  const { skinRarity, compositeSkinHeadCID, compositeSkinBodyCID } = skin.meta;
  const head = `${PINATA}/${compositeSkinHeadCID}`;
  const body = `${PINATA}/${compositeSkinBodyCID}`;
  const imageAlt = "";
  return (
    <ImageContainer rarity={skinRarity} mb="10px">
      <GoatImage priority="width" src={body} alt={imageAlt} title={imageAlt} />
      <GoatImage
        priority="width"
        src={head}
        alt={imageAlt}
        title={imageAlt}
        order={2}
      />
    </ImageContainer>
  );
};

export const TraitImage = ({ trait }) => {
  const { thumbnailCID, rarity, traitSlot } = trait;
  const image = `${PINATA}/${thumbnailCID}`;
  const elevate = getElevation(traitSlot);
  return (
    <ImageContainer rarity={rarity} mb="10px">
      <SilhouetteBody />
      <GoatImage src={image} elevate={elevate} />
      {traitSlot !== "background" && <SilhouetteHead />}
    </ImageContainer>
  );
};
