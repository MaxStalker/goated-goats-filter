import {
  Container,
  GoatName,
  ImageContainer,
  Values,
  ValueDisplay,
  Label,
  Value,
  GoatImage,
  Content,
  RarityContainer,
  Rarity,
  SlotsContainer,
  SlotsRow,
} from "./components";
import Slot from "../Slot"
import { Link, useParams } from "react-router-dom";
import { capitalize, getTraitName } from "../../utils";
import { rarityColors } from "../../utils/colors";

export default function Goat(props) {
  // Data formatting
  const { goat, selected, onClick, skinName, skinPrice, totalPrice } = props;
  const { owner } = useParams();
  const { metadata, traitSlots, skinScore, traitsScore, equippedTraits, id } =
    goat;
  const skinRarity = metadata.skinRarity; // capitalize(metadata.skinRarity);
  const imageAlt = `[${skinRarity}] ${skinName}`;
  const totalScore = skinScore + traitsScore;

  const to = `/owners/${owner}/goat/${id}`;

  // Prepare slots
  let slots = Array.from(Array(traitSlots)).map((_, i) => ({
    equipped: false,
  }));

  const sortedTraits = equippedTraits.sort((a, b) => {
    if (a.traitScore > b.traitScore) {
      return -1;
    }
    if (a.traitScore < b.traitScore) {
      return 1;
    }
    return 0;
  });

  for (let i = 0; i < sortedTraits.length; i++) {
    const trait = sortedTraits[i];
    slots[i] = {
      equipped: true,
      ...trait,
    };
  }

  const mappedTraits = slots.map((slot,i) => <Slot {...slot} index={i}/>);

  const split = slots.length / 2 + 1;
  let firstRow = mappedTraits;
  let secondRow = null;
  if (slots.length > 5) {
    firstRow = mappedTraits.slice(0, split);
    secondRow = mappedTraits.slice(split);
  }


  return (
    <Container onClick={onClick}>
      <ImageContainer>
        <ImageContainer>
          <Link to={to}>
            <GoatImage src={goat.image} alt={imageAlt} title={imageAlt} />
          </Link>
        </ImageContainer>
      </ImageContainer>
      <Content>
        <GoatName rarity={skinRarity}>{skinName}</GoatName>
        <SlotsContainer>
          <SlotsRow>{firstRow}</SlotsRow>
          {secondRow && <SlotsRow>{secondRow}</SlotsRow>}
        </SlotsContainer>
        <Values>
          <ValueDisplay>
            <Label>Skin Price</Label>
            <Value>{skinPrice}</Value>
          </ValueDisplay>

          <ValueDisplay>
            <Label>Total Price</Label>
            <Value>{totalPrice}</Value>
          </ValueDisplay>
        </Values>
      </Content>
      <RarityContainer rarity={skinRarity}>
        <Rarity rarity={skinRarity} className="pill">{skinRarity} {skinScore}</Rarity>
      </RarityContainer>
    </Container>
  );
}
