import { useRef, useState } from "react";
import useMouse from "@react-hook/mouse-position";
import { getTraitName } from "../../utils";
import {
  Container,
  ToolTip,
  Preview,
  PreviewContainer,
  TraitScore,
  TraitName,
  Content,
} from "./components";
import { Rarity, RarityContainer } from "../Goat/components";

export default function Slot(props) {
  const ref = useRef(null);

  if (!props.equipped) {
    return <Container ref={ref} title="Empty Slot" to="/" empty={true} />;
  }

  const { metadata, image, traitScore, index } = props;
  const { traitSlot, fileName, rarity } = metadata;
  const [showToolTip, setShowTooltip] = useState(false);

  const getImage = (type) => `https://goatedgoats.com/${type}.svg`;
  let src = ``;
  switch (traitSlot) {
    case "head-mouth":
    case "mouths":
      src = getImage("mouth");
      break;
    case "head-eyes":
    case "eyes":
      src = getImage("eyes");
      break;
    case "head-hat":
      src = getImage("hat");
    case "head-eyebrow":
    case "head-ears":
    case "hats":
      src = getImage("hat");
      break;
    case "body-accessory":
      src = getImage("guitar");
      break;
    case "clothes":
      src = getImage("body");
      break;
    case "neck":
      src = getImage("medal");
      break;
    case "background":
      src = getImage("background");
      break;
    default:
      break;
  }
  const title = getTraitName(fileName, traitSlot);
  const OFFSET_X = 16;
  const OFFSET_Y = 16;

  return (
    <>
      <Container
        ref={ref}
        rarity={rarity}
        onMouseOver={() => {
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setShowTooltip(false);
        }}
      >
        {src && <img src={src} />}
        {showToolTip && (
          <ToolTip>
            <PreviewContainer rarity={rarity}>
              <Preview src={image} />
            </PreviewContainer>
            <Content>
              <TraitName>{title}</TraitName>
              <TraitScore>
                Score: <b>{traitScore}</b>
              </TraitScore>
            </Content>
            <RarityContainer rarity={rarity}>
              <Rarity className="pill">{rarity}</Rarity>
            </RarityContainer>
          </ToolTip>
        )}
      </Container>
    </>
  );
}