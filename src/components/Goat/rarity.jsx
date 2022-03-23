import {
  Container,
  Content,
  GoatImage,
  GoatName,
  ImageContainer,
  Label,
  Left,
  Rarity,
  RarityContainer,
  Right,
  Row,
  SlotsContainer,
  SlotsRow,
  Value,
  ValueDisplay,
  Values,
} from "./components";
import { Link } from "react-router-dom";
import Slot from "../Slot";

export default function GoatRarity(props) {
  const { selected, onClick, goat } = props;
  const { metadata, itemsTotal, skinChance, totalChance, name, slotCount } =
    goat;
  const { skinRarity } = metadata;
  const imageAlt = "";
  const to = "";

  let slots = Array.from(Array(slotCount)).map((_, i) => {
    return {
      equipped: false,
    };
  });

  const mappedSlots = slots.map((slot, i) => {
    return <Slot key={slot.id} {...slot} index={i} />;
  });

  const split = slots.length / 2 + 1;
  let firstRow = mappedSlots;
  let secondRow = null;
  if (slots.length > 5) {
    firstRow = mappedSlots.slice(0, split);
    secondRow = mappedSlots.slice(split);
  }

  const title = name[0].toUpperCase() + name.slice(1)

  return (
    <Container
      onClick={onClick}
      selected={selected}
      title={`${selected ? "Remove from" : "Add to"} selection`}
    >
      <ImageContainer rarity={skinRarity}>
        <GoatImage src={goat.body} alt={imageAlt} title={imageAlt} />
        <GoatImage src={goat.head} alt={imageAlt} title={imageAlt} order={2} />
      </ImageContainer>
      <Content>
        <GoatName rarity={skinRarity}>{title}</GoatName>
        <SlotsContainer>
          <SlotsRow key={"first"}>{firstRow}</SlotsRow>
          {secondRow && <SlotsRow key={"second"}>{secondRow}</SlotsRow>}
        </SlotsContainer>
        <Values>
          <ValueDisplay>
            <Label>Total:</Label>
            <Value>{totalChance}%</Value>
          </ValueDisplay>
          <ValueDisplay>
            <Label>By Skin:</Label>
            <Value>{skinChance}%</Value>
          </ValueDisplay>
        </Values>
      </Content>
      <RarityContainer rarity={skinRarity}>
        <Rarity rarity={skinRarity} className="pill">
          <label className={"rarity"}>Minted {itemsTotal}</label>
        </Rarity>
      </RarityContainer>
    </Container>
  );
}
