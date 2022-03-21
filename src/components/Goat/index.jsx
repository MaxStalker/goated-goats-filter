import { useContext } from "react";
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
  Row,
  Left,
  Right,
} from "./components";
import Slot from "../Slot";
import { Link, useParams } from "react-router-dom";
import { PricesContext } from "../../context/prices";

export default function Goat(props) {
  // Add props to render just name without number of slots
  const { single } = props;
  const { traitsPrices } = useContext(PricesContext);

  // Data formatting
  const { goat, selected, onClick, skinName, skinPrice, totalPrice, name, url } =
    props;
  const { owner } = useParams();
  const {
    metadata,
    traitSlots,
    skinScore,
    traitsScore,
    equippedTraits,
    id,
  } = goat;
  const skinRarity = metadata.skinRarity; // capitalize(metadata.skinRarity);
  const imageAlt = `[${skinRarity}] ${skinName}`;
  const totalScore = skinScore + traitsScore;

  const to = url || `/owners/${owner}/goat/${id}`;

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
    const rarity =
      trait.metadata.rarity === "base" ? "common" : trait.metadata.rarity;
    const price = traitsPrices[rarity] ? traitsPrices[rarity].avaragePrice : 0;
    slots[i] = {
      equipped: true,
      ...trait,
      price,
    };
  }

  const mappedTraits = slots.map((slot, i) => {
    return <Slot key={slot.id} {...slot} index={i} />;
  });

  const split = slots.length / 2 + 1;
  let firstRow = mappedTraits;
  let secondRow = null;
  if (slots.length > 5) {
    firstRow = mappedTraits.slice(0, split);
    secondRow = mappedTraits.slice(split);
  }
  const title = name || skinName;
  return (
    <Container
      onClick={onClick}
      selected={selected}
      title={`${selected ? "Remove from" : "Add to"} selection`}
    >
      <ImageContainer rarity={skinRarity}>
        <GoatImage src={goat.image} alt={imageAlt} title={imageAlt} />
      </ImageContainer>
      <Content>
        <GoatName rarity={skinRarity}>
          {single && title}
          {!single && (
            <Row>
              <Left>{title}</Left>
              <Right>
                {equippedTraits.length}/{traitSlots}
              </Right>
            </Row>
          )}
        </GoatName>
        <SlotsContainer>
          <SlotsRow key={"first"}>{firstRow}</SlotsRow>
          {secondRow && <SlotsRow key={"second"}>{secondRow}</SlotsRow>}
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
        <Link to={to}>
          <Rarity rarity={skinRarity} className="pill">
            <label className={"rarity"}>
              {skinRarity} {totalScore}
            </label>
            <label className={"details"}>Show Details</label>
          </Rarity>
        </Link>
      </RarityContainer>
    </Container>
  );
}
