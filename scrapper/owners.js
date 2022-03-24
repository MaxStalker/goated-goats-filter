import { getDisplay, GoatedGoats, GoatedTraits } from "flow-cadut/views";
import owners from "./goat-owners.json";
import { setup } from "../src/utils/setup";
import { writeDB, OWNERS_DB } from "./db";

const storeGoats = (goats, address, ownership) => {
  goats.forEach((goat) => {
    const { id, equippedTraits, ...rest } = goat;
    if (!ownership.owner[address]) {
      ownership.owner[address] = {
        goats: [],
        traits: [],
      };
    }
    ownership.owner[address].goats.push(id);
    ownership.goat[id] = rest;

    // Process equipped traits and mark them as equipped, so we could "track"
    // back to owner :)

    ownership.goat[id].equippedTraits = equippedTraits.map((trait) => {
      ownership.trait[trait.id] = {
        ...trait,
        equipped: true,
      };
      return trait.id;
    });
  });
};

const storeTraits = (traits, address, ownership) => {
  traits.forEach((goat) => {
    const { id, ...rest } = goat;
    if (!ownership.owner[address]) {
      ownership.owner[address] = {
        goats: [],
        traits: [],
      };
    }
    ownership.owner[address].traits.push(id);
    ownership.trait[id] = {
      ...rest,
      equipped: false,
    };
  });
};

(async () => {
  await setup();
  const uniqueOwners = Array.from(new Set(owners));

  // TODO: rework into db read/write
  const ownership = {
    owner: {},
    goat: {},
    trait: {},
  };

  const dataSetSize = uniqueOwners.length
  for (let i = 0; i < dataSetSize; i++) {
    const address = uniqueOwners[i];
    console.log(`${i+1} out of ${dataSetSize}: Fetching for address "${address}"`);

    const { GoatedGoats: goats = [], GoatedTraits: traits = [] } =
      await getDisplay([GoatedGoats, GoatedTraits], address);

    storeGoats(goats, address, ownership);
    storeTraits(traits, address, ownership);
  }

  writeDB(OWNERS_DB, ownership);
})();
