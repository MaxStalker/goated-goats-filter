import { query, setEnvironment, registerPlugin } from "flow-cadut";
import { FIND } from "flow-cadut/plugins/FIND";
import {getSkinName} from "../src/utils";
import { getRarityScore } from "flow-cadut/views/src/GoatedGoats/utils";
import { writeDB } from "./db";

(async () => {
  await setEnvironment("mainnet");
  await registerPlugin(FIND);

  const [goats, err] = await query({
    code: `
      import GoatedGoats from 0x2068315349bdfce5
  
  pub struct GoatData{
    pub let id: UInt64
    pub let metadata: {String: String}
    pub let traitSlots: UInt8?
    pub let creationDate: UFix64
    pub let equippedTraits: [{String: AnyStruct}]
    init(
      id: UInt64, 
      metadata: {String: String}, 
      traitSlots: UInt8?, 
      creationDate: UFix64,
      equippedTraits: [{String: AnyStruct}]
    ){
      self.id = id
      self.metadata = metadata
      self.traitSlots = traitSlots
      self.creationDate = creationDate
      self.equippedTraits = equippedTraits
    }
  }
  
  pub fun main(address: Address): [GoatData]{
    var goatsData: [GoatData] = []
    let account = getAccount(address)

    if let collection = account.getCapability(GoatedGoats.CollectionPublicPath).borrow<&{GoatedGoats.GoatCollectionPublic}>()  {
      for id in collection.getIDs() {
        if let goat = collection.borrowGoat(id: id){
        
          // Gather data from NFT
          let metadata = goat.getMetadata()
          let traitSlots = goat.getTraitSlots()
          let creationDate = goat.goatCreationDate
          let equippedTraits = goat.getEquippedTraits()
        
          // Store it for later return
          goatsData.append(
            GoatData(
              id: goat.goatID,
              metadata: metadata,
              traitSlots: traitSlots,
              creationDate: creationDate,
              equippedTraits: equippedTraits
            )
          )
        }
      }
    }
    return goatsData
  }
    `,
    args: ["find:max"],
  });

  // Three hours
  const LAST = 1648218024;
  const OFFSET = 48 * 3600;
  const mark = LAST - OFFSET;

  const formatted = goats
    .filter((goat) => {
      const time = parseInt(goat.creationDate);
      const skinRarity = getRarityScore(goat.metadata.skinRarity)
      return time > mark
    })
    .map((goat,i) => {
      return {
        slots: goat.traitSlots,
        name: getSkinName(goat.metadata.skinFileName),
        rarity: goat.metadata.skinRarity,
        score: getRarityScore(goat.metadata.skinRarity)
      }
    });
  console.log(formatted.length);
  writeDB("./scrapper/max-goats.json", formatted)
})();
