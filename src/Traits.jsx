import GalleryDisplay from "./GalleryDisplay";
import { Trait } from "./Gallery";

export default function Traits(props) {
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
        return (
          <Trait
            key={item.id}
            trait={item}
            onClick={onClick}
            selected={selected}
          />
        );
      }}
    />
  );
}