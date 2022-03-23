import {
  Container as TraitContainer,
  Content,
  GoatName,
  Label,
  Rarity,
  RarityContainer,
  Value,
  ValueDisplay,
  Values,
} from "../Goat/components";
import {
  Preview,
  PreviewContainer,
  SilhouetteBody,
  SilhouetteHead,
} from "../Slot/components";
import { getElevation, getTraitName } from "../../utils";

export default function TraitRarity(props) {
  const { trait } = props;
  const { image, metadata, type, totalItems } = trait;
  const { slotRarity, totalRarity } = trait;
  const { rarity, fileName, traitSlot } = metadata;

  const title = getTraitName(fileName, traitSlot);
  const elevate = getElevation(traitSlot);

  const imageAlt = title;

  return (
    <TraitContainer key={type}>
      <PreviewContainer rarity={rarity} className={"min200"}>
        <SilhouetteBody />
        <Preview
          src={image}
          alt={imageAlt}
          title={imageAlt}
          elevate={elevate}
        />
        {traitSlot !== "background" && <SilhouetteHead />}{" "}
      </PreviewContainer>
      <Content trait>
        <GoatName rarity={rarity}>{title}</GoatName>
        <Values>
          <ValueDisplay>
            <Label>Total Rarity</Label>
            <Value>{totalRarity}%</Value>
          </ValueDisplay>
          <ValueDisplay>
            <Label>Slot Rarity</Label>
            <Value>{slotRarity}%</Value>
          </ValueDisplay>
        </Values>
      </Content>
      <RarityContainer rarity={rarity}>
        <Rarity rarity={rarity} className="pill">
          <label className={"rarity"}>Minted: {totalItems}</label>
        </Rarity>
      </RarityContainer>
    </TraitContainer>
  );
}
