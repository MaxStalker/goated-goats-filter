import { registerPlugin, setEnvironment } from "flow-cadut";
import { FIND } from "flow-cadut/plugins/FIND";
import * as fcl from "@onflow/fcl";

export const setup = async () => {
  await setEnvironment("mainnet");
  await registerPlugin(FIND);

  await fcl.unauthenticate();

  fcl.config().put("discovery.wallet", "https://flow-wallet.blocto.app/authn"); // Configure FCL's Wallet Discovery mechanism
};