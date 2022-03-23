import GalleryDisplay from "./GalleryDisplay";
import GoatRarity from "./components/Goat/rarity";
import { searchTermInObject } from "./utils";

export default function GoatRarities(props) {
  const { data } = props;
  console.log({ data });

  const numSlots = Object.keys(data.bySlotCount);

  const reduced = numSlots
    .reduce((acc, num) => {
      const keys = Object.keys(data.bySlotCount[num]);
      const mapped = keys.map((key) => {
        const totalBySlotAndSkin = data.bySlotCount[num][key].length;
        const item = data.skins[key];
        const totalGoats = data.totalCount;
        const totalByRarity = data.byRarity[item.meta.skinRarity].length;

        const totalBySkin = data.bySkin[key].length;
        const skinChance = 100 / totalBySkin;
        const totalChance = (100 * totalBySlotAndSkin) / totalGoats;

        return {
          name: key,
          metadata: item.meta,
          id: `${key}-${num}-slots`,
          head: `https://goatedgoats.mypinata.cloud/ipfs/${item.meta.compositeSkinHeadCID}`,
          body: `https://goatedgoats.mypinata.cloud/ipfs/${item.meta.compositeSkinBodyCID}`,
          skinName: key,
          slotCount: +num,
          equippedTraits: [],
          totalChance: totalChance.toFixed(4),
          skinChance: skinChance.toFixed(3),
          itemsTotal: totalBySlotAndSkin,
        };
      });
      return acc.concat(mapped);
    }, [])
    .sort((a, b) => {
      const field = "itemsTotal";
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });

  return (
    <GalleryDisplay
      placeholder={"Enter goat name, number of slots or rarity"}
      key={"goats-rarity"}
      items={reduced}
      getRarity={(item) => {
        return item.metadata.skinRarity;
      }}
      query={(item, term) => {
        return searchTermInObject([item.slotCount, item.skinName], term);
      }}
      renderItem={({ item, onClick, selected }) => {
        const { id, skinName } = item;
        return (
          <GoatRarity
            key={id}
            goat={item}
            onClick={onClick}
            selected={selected}
            skinName={skinName}
            skinPrice={"???"}
            totalPrice={"???"}
          />
        );
      }}
    />
  );
}
