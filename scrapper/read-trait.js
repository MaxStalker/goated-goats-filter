import { executeScript, setEnvironment } from "flow-cadut";

(async()=>{
  await setEnvironment("mainnet")
  const getById = (id) =>
  `
    import GoatedGoatsTrait from 0x2068315349bdfce5
    
    pub fun main(): {String: String}{
      return GoatedGoatsTrait.getEditionMetadata(${id})  
    }
  `
  const [result, err] = await executeScript({
    code: getById(33034)
  });
  if(err){
    console.error(err)
  } else {
    console.log(result)
  }
})()