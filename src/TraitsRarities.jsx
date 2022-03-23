import GalleryDisplay from "./GalleryDisplay";
import TraitRarity from "./components/Trait/rarity";
import { searchTermInObject } from "./utils";

export default function TraitsRarirites(props) {
  const { data } = props;
  console.log({ data });
  const { byType, bySlot, byRarity, imageData, totalCount } = data;
  const types = Object.keys(byType);

  const reduced = types
    .reduce((acc, type) => {
      const item = imageData[`${type}.png`];
      const { src, traitSlot } = item;
      const totalAccountableItems = totalCount - byRarity["base"]
      const totalOfThisSlot = bySlot[traitSlot].items;
      const totalRarity = ((byType[type] / totalAccountableItems) * 100).toFixed(3);
      const slotRarity = ((byType[type] / totalOfThisSlot) * 100).toFixed(
        3
      );
      acc.push({
        type,
        image: src,
        metadata: item,
        slotRarity,
        totalRarity,
        totalItems: byType[type],
      });
      return acc;
    }, [])
    .sort((a, b) => {
      if (a.totalItems > b.totalItems) {
        return 1;
      }
      if (a.totalItems < b.totalItems) {
        return -1;
      }
      return 0;
    });

  return (
    <GalleryDisplay
      key={"traits-rarity"}
      items={reduced}
      placeholder={"Enter trait name, slot name or rarity"}
      getRarity={(item) => {
        return item.metadata.rarity;
      }}
      query={(item, term) => {
        return searchTermInObject([item.type, item.metadata.rarity], term);
      }}
      renderItem={({ item, ...rest }) => {
        const { id } = item;
        return <TraitRarity key={id} trait={item} {...rest} />;
      }}
    />
  );
}
