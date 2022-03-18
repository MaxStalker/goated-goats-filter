import { useContext } from "react";
import GalleryDisplay from "./GalleryDisplay";
import Goat from "./components/Goat";
import { PricesContext } from "./context/prices";
import { getSkinName } from "./utils";

export default function Goats(props) {
  const { goats } = props;
  const { goatsPrices, traitsPrices } = useContext(PricesContext);
  return (
    <GalleryDisplay
      key="goats"
      items={goats}
      getRarity={(item) => {
        return item.metadata.skinRarity;
      }}
      query={(item, term) => {
        return (
          item.metadata.skinRarity.includes(term) ||
          item.metadata.skinFileName.includes(term) ||
          item.id.toString().includes(term)
        );
      }}
      renderItem={({ item, onClick, selected }) => {
        const {skinFileName, skinRarity} = item.metadata
        const skinName = getSkinName(skinFileName);
        const skinPrice = goatsPrices[skinRarity]
          ? goatsPrices[skinRarity][item.traitSlots - 5]
          : 0;
        const traitsPrice = item.equippedTraits.reduce((acc, trait) => {
          let { rarity } = trait.metadata;
          rarity = rarity === "base" ? "common" : rarity;
          const price = traitsPrices[rarity]
            ? traitsPrices[rarity].avaragePrice
            : 0;
          acc += parseFloat(price);
          return acc;
        }, 0);
        const totalPrice = parseFloat(skinPrice) + traitsPrice;
        return (
          <Goat
            key={item.id}
            goat={item}
            onClick={onClick}
            selected={selected}
            skinName={skinName}
            skinPrice={skinPrice}
            totalPrice={totalPrice}
          />
        );
      }}
    />
  );
}
