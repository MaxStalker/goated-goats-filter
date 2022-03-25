import { useContext } from "react";
import GalleryDisplay from "./GalleryDisplay";
import Goat from "./components/Goat";
import { PricesContext } from "./context/prices";
import { getSkinName } from "./utils";

export default function Goats(props) {
  const { goats } = props;
  const { goatsPrices, traitsPrices } = useContext(PricesContext);

  const sortByScore = (a, b) => {
    const aScore = a.skinScore + a.traitsScore;
    const bScore = b.skinScore + b.traitsScore;

    if (aScore < bScore) {
      return 1;
    }
    if (aScore > bScore) {
      return -1;
    }
    return 0;
  };

  const sortBySlots = (a, b) => {
    const aScore = a.traitSlots;
    const bScore = b.traitSlots;

    if (aScore < bScore) {
      return 1;
    }
    if (aScore > bScore) {
      return -1;
    }
    return 0;
  };
  return (
    <GalleryDisplay
      key="goats"
      items={goats}
      sort={sortBySlots}
      group={(item) => {
        return `${item.traitSlots} - ${item.metadata.skinFileName}`;
      }}
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
        const goat = item.top || item;
        const { id, metadata, equippedTraits, traitSlots } = goat;
        const { skinFileName, skinRarity,  } = metadata;
        const skinName = getSkinName(skinFileName);
        const skinPrice = goatsPrices[skinRarity]
          ? goatsPrices[skinRarity][traitSlots - 5]
          : 0;
        const traitsPrice = equippedTraits.reduce((acc, trait) => {
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
            key={id}
            goat={goat}
            onClick={onClick}
            selected={selected}
            skinName={skinName}
            skinPrice={skinPrice}
            totalPrice={totalPrice}
            stack={item.items || 1}
          />
        );
      }}
    />
  );
}
