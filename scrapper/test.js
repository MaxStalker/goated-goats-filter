import { executeScript, registerPlugin, setEnvironment } from "flow-cadut";
import { FIND } from "flow-cadut/plugins/FIND";

const resolveAddress = (name) => {
  const code = `
    pub fun main(address: Address): Address{
      return address
    }
  `;
  const args = [name];
  return executeScript({ code, args });
};

(async () => {
  await setEnvironment("mainnet");
  await registerPlugin(FIND);
  const [addr, addrErr] = await resolveAddress("find:max");
  console.log({ addr, addrErr });
})();
