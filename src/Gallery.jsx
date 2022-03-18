import { Link } from "react-router-dom";
import { Frame, Image, PreviewContainer, Meta, Shadow } from "./Components";
import { useParams } from "react-router-dom";
import { capitalize } from "./utils";

export const Goat = (props) => {
  const { goat, selected, onClick, skinName,askPrice } = props;
  const { owner } = useParams();
  const { metadata, traitSlots, skinScore, traitsScore, equippedTraits, id } =
    goat;
  const skinRarity = capitalize(metadata.skinRarity);
  const imageAlt = `[${skinRarity}] ${skinName}`;
  const totalScore = skinScore + traitsScore;
  const meta = {
    Name: skinName,
    Rarity: skinRarity,
    Slots: traitSlots,
    Equipped: equippedTraits.length,
    Score: totalScore,
    AskPrice: askPrice.avaragePrice
  };
  const to = `/owners/${owner}/goat/${id}`;
  return (
    <PreviewContainer
      selected={selected}
      onClick={onClick}
      rarity={metadata.skinRarity}
    >
      <Frame rarity={metadata.skinRarity}>
        <Shadow />
        <Link to={to}>
          <Image src={goat.image} alt={imageAlt} title={imageAlt} />
        </Link>
      </Frame>
      {Object.keys(meta).map((key) => {
        const data = meta[key];
        return <Meta key={key} label={key} value={data} />;
      })}
    </PreviewContainer>
  );
};

export const Trait = ({ trait, selected, onClick }) => {
  const { owner } = useParams();
  const { metadata, rarityScore, id } = trait;
  const traitRarirty = capitalize(metadata.rarity);
  const slot = metadata.traitSlot;
  const imageAlt = `${traitRarirty} ${slot}`;

  const meta = {
    ID: trait.id,
    Score: rarityScore,
    Slot: slot,
    Rarity: traitRarirty,
  };
  const to = `/owners/${owner}/trait/${id}`;
  return (
    <PreviewContainer
      selected={selected}
      onClick={onClick}
      rarity={metadata.rarity}
    >
      <Frame rarity={metadata.rarity}>
        <Shadow />
        <Link to={to}>
          <Image src={trait.image} alt={imageAlt} title={imageAlt} />
        </Link>
      </Frame>
      {Object.keys(meta).map((key) => {
        const data = meta[key];
        return <Meta key={key} label={key} value={data} />;
      })}
    </PreviewContainer>
  );
};
