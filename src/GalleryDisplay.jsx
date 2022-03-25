import { useEffect, useState } from "react";
import { Gallery, Checkbox, SelectorBox, Input } from "./Components";
import { useLocation } from "react-router";
import { extractParams } from "./utils";

export default function GalleryDisplay(props) {
  const location = useLocation();
  const { pathname, search } = location;

  const urlParams = extractParams(search);
  // console.log({urlParams})

  const { items, group, sort, query, getRarity, placeholder = "" } = props;
  const [selectedItems, setSelectedItems] = useState({});
  // console.log({selectedItems})

  const [grouped, setGrouped] = useState(true)

  const [filterSelected, setFilterSelected] = useState(false);
  const [filteredItems, setFilterItems] = useState(items);
  const [rarityFilters, setRarityFilters] = useState({
    common: true,
    rare: true,
    epic: true,
    legendary: true,
  });
  const toggleRarity = (key) => {
    setRarityFilters({
      ...rarityFilters,
      [key]: !rarityFilters[key],
    });
  };

  const initialProperty = search.slice(1).split("=")[1] || "";
  const [property, setPropertySearch] = useState(initialProperty);

  useEffect(() => {
    let filtered = items;

    // TODO: Optimize this :D
    filtered = items.filter((item) => {
      const rarity = getRarity(item);
      return rarityFilters[rarity] && query(item, property);
    });

    if (filterSelected) {
      filtered = filtered.filter((item) => selectedItems[item.id]);
    }

    setFilterItems(filtered);
  }, [
    filterSelected,
    items,
    selectedItems,
    query,
    property,
    getRarity,
    rarityFilters,
  ]);

  const toggleItem = (id) => {
    setSelectedItems({
      ...selectedItems,
      [id]: !selectedItems[id],
    });
  };

  // Make a fallback if this is not provided
  const sortingFunc =
    sort ||
    function () {
      return 1;
    };
  const sortedItems = filteredItems.sort(sortingFunc);

  let preparedList = sortedItems
  if(grouped){
    const groupedList = sortedItems.reduce((acc, item)=>{
      const groupKey = group(item)

      if(!acc[groupKey]){
        acc[groupKey] = {
          top: item,
          items: 1
        }
      } else {
        acc[groupKey].items += 1
      }

      return acc
    },{})

    preparedList = Object.keys(groupedList).map((key)=>{
      const item= groupedList[key]
      if(item.items > 1){
        return item
      } else {
        return item.top
      }
    })
  }

  const { renderItem } = props;
  return (
    <>
      <SelectorBox>
        <Checkbox
          label="Common"
          checked={rarityFilters.common}
          onChange={() => toggleRarity("common")}
        />
        <Checkbox
          label="Rare"
          checked={rarityFilters.rare}
          onChange={() => toggleRarity("rare")}
        />
        <Checkbox
          label="Epic"
          checked={rarityFilters.epic}
          onChange={() => toggleRarity("epic")}
        />
        <Checkbox
          label="Legendary"
          checked={rarityFilters.legendary}
          onChange={() => toggleRarity("legendary")}
        />
      </SelectorBox>
      <SelectorBox>
        <Input
          placeholder={placeholder}
          value={property}
          onChange={(e) => {
            const search = e.target.value;
            setPropertySearch(search);
            window.history.pushState(
              {},
              undefined,
              `${pathname}?search=${search}`
            );
          }}
        />
      </SelectorBox>
      <SelectorBox>
        <Checkbox
          label="Only Selected"
          checked={filterSelected}
          onChange={(checked) => setFilterSelected(checked)}
        />
      </SelectorBox>
      <Gallery>
        {preparedList.map((item) =>
          renderItem({
            item,
            onClick: () => toggleItem(item.id),
            selected: !!selectedItems[item.id],
          })
        )}
      </Gallery>
    </>
  );
}
