import {
  Container,
  Content,
  GoatName,
  ValueDisplay,
  Label,
  Value,
  RarityContainer,
  Rarity,
} from "../Goat/components";
import { Preview, PreviewContainer, Silhouette } from "../Slot/components";
import { getTraitName } from "../../utils";
import { Link } from "react-router-dom";

export default function Trait(props) {
  const { onClick, trait, selected } = props;
  const { metadata, image, rarityScore, price } = trait;
  const { traitSlot, fileName, rarity } = metadata;

  const imageAlt = "";
  const title = getTraitName(fileName, traitSlot);
  const to = "/";
  return (
    <Container
      onClick={onClick}
      selected={selected}
      title={`${selected ? "Remove from" : "Add to"} selection`}
    >
      <PreviewContainer rarity={rarity} className={"min200"}>
        <Silhouette/>
        <Preview src={image} alt={imageAlt} title={imageAlt} />
      </PreviewContainer>
      <Content trait>
        <GoatName rarity={rarity}>{title}</GoatName>
        <ValueDisplay>
          <Label>Trait Price</Label>
          <Value>{price}</Value>
        </ValueDisplay>
      </Content>
      <RarityContainer rarity={rarity}>
        <Link to={to}>
          <Rarity rarity={rarity} className="pill">
            <label className={"rarity"}>
              {rarity} {rarityScore}
            </label>
            <label className={"details"}>Show Details</label>
          </Rarity>
        </Link>
      </RarityContainer>
    </Container>
  );
}
