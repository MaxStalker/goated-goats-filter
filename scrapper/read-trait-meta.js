import { setEnvironment, executeScript } from "flow-cadut";

(async () => {
  setEnvironment("mainnet");

/*  const [supply, errSupply] = await executeScript({
    code: `
      import GoatedGoatsTraitPack from 0x2068315349bdfce5
      
      pub fun main(): UInt64{
        return GoatedGoatsTraitPack.getTotalSupply()
      }
    `,
  });

  console.log(supply);
  errSupply && console.error(errSupply);*/

  const [result, err] = await executeScript({
    code: `
      import GoatedGoatsTraitPack from 0x2068315349bdfce5
      import GoatedGoatsTrait from 0x2068315349bdfce5
      
      pub fun main(): {String: String}{
        return GoatedGoatsTrait.getEditionMetadata(15)
      }
    `,
  });

  console.log(result);
  err && console.error(err);
})();
