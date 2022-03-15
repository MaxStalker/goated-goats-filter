import GalleryDisplay from "./GalleryDisplay";
import { Goat } from "./Gallery";

export default function Goats(props) {
  const { goats } = props;
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
          item.metadata.skinFileName.includes(term)
        );
      }}
      renderItem={({ item, onClick, selected }) => {
        return (
          <Goat
            key={item.id}
            goat={item}
            onClick={onClick}
            selected={selected}
          />
        );
      }}
    />
  );
}
