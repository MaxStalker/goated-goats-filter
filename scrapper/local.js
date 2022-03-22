import fs from "fs";
import { setEnvironment, query, extendEnvironment } from "flow-cadut";

/* Local Database */
const LOCAL_DB = "./scrapper/db.json";
const SMALL_DB = "./src/data/small-data.json";
const readDB = (db) => {
  let rawdata = fs.readFileSync(db);
  return JSON.parse(rawdata);
};
const writeDB = (db, data) => {
  let raw = JSON.stringify(data, null, 2);
  fs.writeFileSync(db, raw);
};

const GoatedGoatsEnvironment = {
  mainnet: {
    GoatedGoats: "0x2068315349bdfce5",
    GoatedGoatsTrait: "0x2068315349bdfce5",
  },
};

const persist = (db) => (type, data) => {
  const oldData = readDB(db);

  const updatedData = {
    ...oldData,
    [type]: data,
  };

  writeDB(db, updatedData);
};

const insertLine = () => {
  console.log(
    "==================================================================\n"
  );
};

const getGoatData = (start, finish) => {
  return query({
    code: `
      import GoatedGoats from 0x1

      pub struct GoatData{
        pub let meta: {String: String}
        pub let id: Int
        pub let slotCount: UInt8?
        
        init(_ id: Int, _ meta: {String: String}, _ slotCount: UInt8?){
          self.id = id
          self.meta = meta
          self.slotCount = slotCount
        }
      }

      pub fun main(start: Int, upperLimit: Int): [GoatData]{
        var goatId = start;
        var meta: [GoatData] = [];
        while goatId < upperLimit {
          let goatData = GoatedGoats.getEditionMetadata(UInt64(goatId))
          let slotCount = GoatedGoats.getEditionTraitSlots(UInt64(goatId))
          meta.append(GoatData(goatId, goatData,slotCount))
          goatId = goatId + 1
        }
        return meta
      }
    `,
    args: [start, finish],
    limit: 9999,
  });
};
const getFullGoatData = async (step = 2500) => {
  const resulted = await Promise.all([
    await getGoatData(step * 0, step * 1),
    await getGoatData(step * 1, step * 2),
    await getGoatData(step * 2, step * 3),
    await getGoatData(step * 3, step * 4),
  ]).then((values) => {
    let t = [];

    for (let i = 0; i < values.length; i++) {
      const [data, err] = values[i];
      t = t.concat(data);
    }

    return t;
  });
  return resulted;
};
const gatherSkinData = async () => {
  console.log("Gathering goats data....");
  const rawData = await getFullGoatData();
  console.log("Total Items", rawData.length);

  const fixedData = rawData.reduce(
    (acc, item) => {
      if (Object.keys(item.meta).length !== 0) {
        const { meta, id, slotCount } = item;
        const { skinRarity, skinFileName } = meta;
        acc.items[id] = item;

        if (!acc.byRarity[skinRarity]) {
          acc.byRarity[skinRarity] = [];
        }

        acc.byRarity[skinRarity].push(id);

        acc.types[skinRarity] = true;

        const skinName = skinFileName.slice(5, -4);
        acc.skins[skinName] = true;

        if (!acc.bySkin[skinName]) {
          acc.bySkin[skinName] = [];
        }
        acc.bySkin[skinName].push(id);

        if (!acc.bySlotCount[slotCount]) {
          acc.bySlotCount[slotCount] = {};
        }
        if (!acc.bySlotCount[slotCount][skinName]) {
          acc.bySlotCount[slotCount][skinName] = [];
        }
        acc.bySlotCount[slotCount][skinName].push(id);
      } else {
        acc.notMinted += 1;
      }

      return acc;
    },
    {
      items: {},
      types: {},
      skins: {},
      bySkin: {},
      byRarity: {},
      bySlotCount: {},
      notMinted: 0,
    }
  );

  const types = Object.keys(fixedData.types);
  const skins = Object.keys(fixedData.skins);

  console.log("Types:", Object.keys(fixedData.types));
  insertLine();

  console.log("By Rarity");
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    console.log(
      `${type[0].toUpperCase() + type.slice(1)}:`,
      fixedData.byRarity[type].length
    );
  }
  insertLine();

  console.log("By Skin Name");
  for (let i = 0; i < skins.length; i++) {
    const skin = skins[i];
    console.log(
      `${skin[0].toUpperCase() + skin.slice(1)}:`,
      fixedData.bySkin[skin].length
    );
  }
  insertLine();

  const totalCount = rawData.length - fixedData.notMinted;

  console.log("Not Minted", fixedData.notMinted);
  console.log("Total Supply", totalCount);

  persist(LOCAL_DB)("goats", fixedData);
  persist(SMALL_DB)("goats", {
    byRarity: fixedData.byRarity,
    bySkin: fixedData.bySkin,
    bySlotCount: fixedData.bySlotCount,
    totalCount,
  });
};

const getTraitData = (start, finish) => {
  return query({
    code: `
      import GoatedGoatsTrait from 0x1

      pub struct TraitData{
        pub let meta: {String: String}
        pub let id: Int
        
        init(_ id: Int, _ meta: {String: String}){
          self.id = id
          self.meta = meta
        }
      }

      pub fun main(start: Int, upperLimit: Int): [TraitData]{
        var traitId = start;
        var meta: [TraitData] = [];
        while traitId < upperLimit {
          let traitMetadata = GoatedGoatsTrait.getEditionMetadata(UInt64(traitId))
          meta.append(TraitData(traitId, traitMetadata))
          traitId = traitId + 1
        }
        return meta
      }
    `,
    args: [start, finish],
    limit: 9999,
  });
};
const getFullTraitData = async () => {
  const step = 5000;
  const resulted = await Promise.all([
    await getTraitData(step * 0, step * 1),
    await getTraitData(step * 1, step * 2),
    await getTraitData(step * 2, step * 3),
    await getTraitData(step * 3, step * 4),
    await getTraitData(step * 4, step * 5),
    await getTraitData(step * 5, step * 6),
  ]).then((values) => {
    let t = [];

    for (let i = 0; i < values.length; i++) {
      const [data, err] = values[i];
      t = t.concat(data);
    }

    return t;
  });
  return resulted;
};
const gatherTraitsData = async () => {
  console.log("Gathering traits data....");
  const rawData = await getFullTraitData(100);

  const fixedData = rawData.reduce(
    (acc, item) => {
      if (Object.keys(item.meta).length !== 0) {
        const { meta, id } = item;
        const { traitSlot, fileName, rarity, thumbnailCID} = meta;
        const traitName = fileName.slice(0, -4);

        acc.imageData[fileName] = {
          src:`https://goatedgoats.mypinata.cloud/ipfs/${thumbnailCID}`,
          rarity,
          fileName,
          traitSlot
      }
        acc.fullData.items[id] = meta;
        acc.fullData.slotTypes[traitSlot] = true;

        // Init arrays
        if (!acc.fullData.byType[traitName]) {
          acc.fullData.byType[traitName] = [];
        }

        if (!acc.fullData.bySlot[traitSlot]) {
          acc.fullData.bySlot[traitSlot] = {
            byRarity: {
              base: [],
              common: [],
              epic: [],
              legendary: [],
              rare: [],
            },
            items: [],
          };
        }

        if (!acc.fullData.bySlot[traitSlot].byRarity[rarity]) {
          acc.fullData.bySlot[traitSlot].byRarity[rarity] = [];
        }

        if (!acc.fullData.byRarity[rarity]) {
          acc.fullData.byRarity[rarity] = [];
        }

        // Init numbers
        if (!acc.numbers.byType[traitName]) {
          acc.numbers.byType[traitName] = 0;
        }

        if (!acc.numbers.bySlot[traitSlot]) {
          acc.numbers.bySlot[traitSlot] = {
            byRarity: {},
            items: 0,
          };
        }

        if (!acc.numbers.bySlot[traitSlot].byRarity[rarity]) {
          acc.numbers.bySlot[traitSlot].byRarity[rarity] = 0;
        }

        if (!acc.numbers.byRarity[rarity]) {
          acc.numbers.byRarity[rarity] = 0;
        }

        acc.fullData.byType[traitName].push(id);
        acc.fullData.bySlot[traitSlot].items.push(id);
        acc.fullData.bySlot[traitSlot].byRarity[rarity].push(id);
        acc.fullData.byRarity[rarity].push(id);

        acc.numbers.byType[traitName] += 1;
        acc.numbers.bySlot[traitSlot].items += 1;
        acc.numbers.bySlot[traitSlot].byRarity[rarity] += 1;
        acc.numbers.byRarity[rarity] += 1;
      } else {
        acc.notMinted += 1;
      }

      return acc;
    },
    {
      notMinted: 0,
      imageData: {

      },
      fullData: {
        slotTypes: {},
        items: {},
        byRarity: {},
        bySlot: {},
        byType: {},
      },
      numbers: {
        slotTypes: {},
        items: {},
        byRarity: {},
        bySlot: {},
        byType: {},
      },
    }
  );

  const totalCount = rawData.length - fixedData.notMinted;
  const rarities = Object.keys(fixedData.fullData.byRarity);
  const slots = Object.keys(fixedData.fullData.bySlot);
  const types = Object.keys(fixedData.fullData.byType);

  insertLine();

  console.log("By Type");
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    console.log(
      `${type[0].toUpperCase() + type.slice(1)}:`,
      fixedData.fullData.byType[type].length
    );
  }
  insertLine();

  console.log("By Rarity");
  for (let i = 0; i < rarities.length; i++) {
    const rarity = rarities[i];
    console.log(
      `${rarity[0].toUpperCase() + rarity.slice(1)}:`,
      fixedData.fullData.byRarity[rarity].length
    );
  }
  insertLine();

  console.log("By Slot Name");
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    console.log(
      `${slot[0].toUpperCase() + slot.slice(1)}:`,
      fixedData.fullData.bySlot[slot].length
    );
  }
  insertLine();

  console.log(fixedData.numbers);

  persist(LOCAL_DB)("traits", {
    ...fixedData.fullData,
    totalCount,
  });
  persist(SMALL_DB)("traits", {
    imageData: fixedData.imageData,
    totalCount,
    ...fixedData.numbers,
  });
};

(async () => {
  await setEnvironment("mainnet");
  await extendEnvironment(GoatedGoatsEnvironment);

  // await gatherSkinData();
  await gatherTraitsData();
})();
