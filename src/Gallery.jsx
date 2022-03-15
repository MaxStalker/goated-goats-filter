import { Frame, Image, PreviewContainer, Meta } from "./Components";

const capitalize = (item) => item[0].toUpperCase() + item.slice(1);

const getSkinName = (skinFile) => {
  const name = skinFile.slice(5).slice(0, -4);
  return name.split("_").map(capitalize).join(" ");
};

export const Goat = ({ goat, selected, onClick }) => {
  const { metadata } = goat;
  const skinRarity = capitalize(metadata.skinRarity);
  const skinName = getSkinName(metadata.skinFileName);
  const imageAlt = `[${skinRarity}] ${skinName}`;

  const meta = {
    Name: skinName,
    Rarity: skinRarity,
  };
  return (
    <PreviewContainer selected={selected} onClick={onClick}>
      <Frame rarity={metadata.skinRarity}>
        <Image src={goat.image} alt={imageAlt} title={imageAlt} />
      </Frame>
      {Object.keys(meta).map((key) => {
        const data = meta[key];
        return <Meta key={key} label={key} value={data} />;
      })}
    </PreviewContainer>
  );
};

export const Trait = ({ trait, selected, onClick }) => {
  const { metadata } = trait;
  const traitRarirty = capitalize(metadata.rarity);
  const slot = metadata.traitSlot;
  const imageAlt = `${traitRarirty} ${slot}`;

  const meta = {
    ID: trait.id,
    Rarity: traitRarirty,
    Slot: slot,
  };
  return (
    <PreviewContainer selected={selected} onClick={onClick}>
      <Frame rarity={metadata.rarity}>
        <Image src={trait.image} alt={imageAlt} title={imageAlt} />
      </Frame>
      {Object.keys(meta).map((key) => {
        const data = meta[key];
        return <Meta label={key} value={data} />;
      })}
    </PreviewContainer>
  );
};
