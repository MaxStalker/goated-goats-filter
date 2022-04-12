import {
  Container,
  Content,
  GoatName,
  ValueDisplay,
  Label,
  Value,
  Values,
  RarityContainer,
  Rarity,
  IdDisplay
} from "../Goat/components";
import {
  Container as Slot,
  Preview,
  PreviewContainer,
  SilhouetteBody,
  SilhouetteHead,
} from "../Slot/components";
import { getElevation, getImage, getTraitName } from "../../utils";
import { Link, useParams } from "react-router-dom";

export default function Trait(props) {
  const { owner } = useParams();
  const { onClick, trait, selected, id, url } = props;
  const { metadata, image, rarityScore, price } = trait;
  const { traitSlot, fileName, rarity } = metadata;

  const imageAlt = "";
  const to = url || `/owners/${owner}/trait/${id}`;
  const title = getTraitName(fileName, traitSlot);
  const elevate = getElevation(traitSlot);
  const src = getImage(traitSlot);
  return (
    <Container
      onClick={onClick}
      selected={selected}
      title={`${selected ? "Remove from" : "Add to"} selection`}
    >
      <PreviewContainer rarity={rarity} className={"min200"}>
        <SilhouetteBody />
        <Preview
          src={image}
          alt={imageAlt}
          title={imageAlt}
          elevate={elevate}
        />
        {traitSlot !== "background" && <SilhouetteHead />}
      </PreviewContainer>
      <Content trait>
        <GoatName rarity={rarity}>{title}</GoatName>
        <Values>
          <ValueDisplay>
            <Label>Slot</Label>
            <Value title={traitSlot}>
              <Slot rarity={rarity}>
                <img src={src} />
              </Slot>
            </Value>
          </ValueDisplay>
          <ValueDisplay>
            <Label>Trait Price</Label>
            <Value>{price}</Value>
          </ValueDisplay>
        </Values>
        <IdDisplay>Id: <b>{id}</b></IdDisplay>
      </Content>
      <RarityContainer rarity={rarity}>
        <Link to={to} target="_blank">
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
