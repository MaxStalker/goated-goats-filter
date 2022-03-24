import { OWNERS_DB, readDB } from "./db";
import { resolveAddress } from "../src/utils/find";
import { setEnvironment } from "flow-cadut";

(async () => {
  const searchItem = "gold-tooth"
  const data = readDB(OWNERS_DB);

  const foundTraits = Object.keys(data.trait).reduce((acc, traitId) => {
    const trait = data.trait[traitId];
    if (trait.metadata.fileName.includes(searchItem) && !trait.equipped) {
      acc[traitId] = true;
    }
    return acc;
  }, {});

  const owners = Object.keys(data.owner).reduce((acc, address) => {
    const owner = data.owner[address];
    const items = owner.traits.filter((id) => foundTraits[id]);

    if (items.length > 0) {
      acc[address] = items.length;
    }

    return acc;
  }, {});

  const numberOfItems = Object.keys(owners)
    .map((addr) => {
      return {
        addr,
        num: owners[addr],
      };
    })
    .sort((a, b) => {
      if (a.num > b.num) return -1;
      if (a.num < b.num) return 1;
      return 0;
    })
    .slice(0, 10);

  await setEnvironment("mainnet");
  console.log(`:robot: Human, you were looking for **${searchItem}**`)
  for (let i = 0; i < numberOfItems.length; i++) {
    const { addr, num } = numberOfItems[i];
    const find = await resolveAddress(addr);
    console.log(
      `**${find || addr}** have ${num} cop${num > 1 ? "ies" : "y"}`
    );
  }

  // console.log(numberOfItems);
})();
