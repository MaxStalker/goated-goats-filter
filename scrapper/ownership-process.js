import { readDB, OWNERS_DB, writeDB } from "./db";
import { resolveAddress } from "../src/utils/find";
import { setEnvironment } from "flow-cadut";

const printNumberOfItems = (data, key) => {
  console.log(key, ":", Object.keys(data[key]).length);
};

(async () => {
  const data = readDB(OWNERS_DB);
  printNumberOfItems(data, "owner");
  printNumberOfItems(data, "goat");
  printNumberOfItems(data, "trait");

  const owners = Object.keys(data.owner)
    .map((address) => {
      return {
        address,
        goats: data.owner[address].goats.length,
        traits: data.owner[address].traits.length,
      };
    })
    .sort((a, b) => {
      if (a.traits > b.traits) {
        return -1;
      }
      if (a.traits < b.traits) {
        return 1;
      }
      return 0;
    })
    // Sort by goats
    /*
    .sort((a, b) => {
      if (a.goats > b.goats) {
        return -1;
      }
      if (a.goats < b.goats) {
        return 1;
      }
      return 0;
    })
     */
    .slice(0, 10);

  let withFindAddress = [];

  await setEnvironment("mainnet")
  for (let i = 0; i < owners.length; i++) {
    const owner = owners[i];
    const { address } = owner;
    const [find, err] = await resolveAddress(address);
    const ownerAddress = find ? "find:" + find : address;

    withFindAddress.push({
      ...owners[i],
      find: find || "Not registered",
      collection: `https://goated-goats-filter.vercel.app/owners/${ownerAddress}/goats`,
    });
  }

  console.log(withFindAddress);
  writeDB("./scrapper/top-10-traits.json", withFindAddress);
})();
