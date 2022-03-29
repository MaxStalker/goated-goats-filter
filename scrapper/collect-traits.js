import { readDB, writeDB } from "./db";

(async () => {
  const data = readDB("./scrapper/db.json");
  const traitList = Object.keys(data.traits.byType).reduce((acc, key) => {
    const id = data.traits.byType[key][0];
    const trait = data.traits.items[id];
    acc[key] = {
      ...trait,
    };
    return acc;
  }, {});

  writeDB("./src/data/trait-list.json", traitList)
})();
