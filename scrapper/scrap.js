import { executeScript, setEnvironment } from "flow-cadut";
import data from "./data.json";

// const data = require("./data.json");

async function main() {
  console.log(data.length);
  const formatted = data.map((item) => {
    const { name, owner } = item.blockEventData;
    return {
      name,
      address: owner,
    };
  });

  let seen = {};
  let skipped = 0;
  let start = 0;
  let end = 100;

  for (let i = start; i < Math.max(formatted.length, end); i++) {
    const user = formatted[i];

    /*    // Skip processed addresses
    if (seen[user.address]) {
      skipped += 1;
      continue;
    }*/

    seen[user.address] = true;
    console.log({ user });
  }
  console.log({ skipped, total: formatted.length });
}

const resolveAddress = (name) => {
  const code = `
    import FIND from 0x097bafa4e0b48eef

    pub fun main(name: String) :  Address? {
        return FIND.lookupAddress(name)
    }
  `;
  const args = [name];
  return executeScript({ code, args });
};

(async () => {
  await setEnvironment("mainnet");

  // Process data
  console.log({ l: data[0].blockEventData.name });
  const limit = 50;
  const mapped = data.map((item) => item.blockEventData.name).slice(0, 50);
  const known = ["max", "bjarte", "test"]
  const [result, err] = await executeScript({
    code: `
      import FIND from 0x097bafa4e0b48eef
      import GoatedGoats from 0x2068315349bdfce5
      
      pub struct UserData{
        pub let address: Address
        pub let initiated: Bool
        
        init(_ address: Address, _ initiated: Bool){
          self.address = address
          self.initiated = initiated
        }
      }
      
      pub fun main(names:[String]):[UserData]{
        var res: [UserData] = []
        for name in names {
          if let address = FIND.lookupAddress(name){
            let account = getAccount(address)
            let collection = account.getCapability(GoatedGoats.CollectionPublicPath)  
            let check = collection.check<&{GoatedGoats.GoatCollectionPublic}>()
            res.append(UserData(address, check))
          }
        }
        
        return res  
      }
    `,
    args: [mapped],
  });

  console.log({ result, err });
})();
