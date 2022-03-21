import { useContext } from "react";
import GalleryDisplay from "./GalleryDisplay";
import Trait from "./components/Trait";
import { PricesContext } from "./context/prices";

export default function Traits(props) {
  const { traitsPrices } = useContext(PricesContext);

  const { traits } = props;
  return (
    <GalleryDisplay
      key="traits"
      items={traits}
      getRarity={(item) => {
        return item.metadata.rarity;
      }}
      query={(item, term) => {
        return (
          item.metadata.rarity.includes(term) ||
          item.metadata.traitSlot.includes(term) ||
          item.metadata.fileName.includes(term) ||
          item.id.toString().includes(term)
        );
      }}
      renderItem={({ item, onClick, selected }) => {
        const { rarity } = item.metadata;
        const price = traitsPrices[rarity]
          ? traitsPrices[rarity].avaragePrice
          : 0;

        return (
          <Trait
            key={item.id}
            trait={{...item, price}}
            onClick={onClick}
            selected={selected}
            price={price}
          />
        );
      }}
    />
  );
}
