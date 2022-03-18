import { config } from "@onflow/fcl";

import { executeScript, registerPlugin, setEnvironment } from "flow-cadut";
import { FIND } from "flow-cadut/plugins/FIND";

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
    pub fun main(address: Address): Address{
      return address
    }
  `;
  const args = [name];
  return executeScript({ code, args });
};

export async function scrap() {
  await setEnvironment("testnet");
  await registerPlugin(FIND);

  const registeredPlugins = await config().get("ix.plugins");

  const [addr, addrErr] = await resolveAddress("max.find");
  console.log({ addr, addrErr });

  /*  const [result, err] = await executeScript({
    code: `
      pub fun main(arr:[Address]):[Int]{
        var res: [Int] = []
        var index = 0;
        for item in arr {
          res.append(index)
          index = index + 1
        }
        
        return res  
      }
    `,
    args: [["max.find"]],
  });*/

  // console.log({ result, err });
}
