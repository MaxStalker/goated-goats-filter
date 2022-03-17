import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation, useParams, useMatch } from "react-router";
import { getDisplay, GoatedGoats, GoatedTraits } from "flow-cadut/views";
import { registerPlugin, setEnvironment } from "flow-cadut";
import { FIND } from "flow-cadut/plugins/FIND";
import * as fcl from "@onflow/fcl";
import Traits from "./Traits";
import Goats from "./Goats";
import { Container, Tab, Tabs } from "./Components";
import SingleGoat from "./SingleGoat";
import SingleTrait from "./SingleTrait";
import { PricesContext } from "./context/prices";
import PriceChart from "./components/PriceChart";

const setup = async () => {
  await setEnvironment("mainnet");
  await registerPlugin(FIND);

  await fcl.unauthenticate();

  fcl.config().put("discovery.wallet", "https://flow-wallet.blocto.app/authn"); // Configure FCL's Wallet Discovery mechanism
};

export default function User() {
  const { owner } = useParams();
  const { pathname } = useLocation();

  const [goats, setGoats] = useState([]);
  const [goatsDictionary, setGoatsDictionary] = useState({});

  const [traits, setTraits] = useState([]);
  const [traitsDictionary, setTraitsDictionary] = useState({});

  const [loading, setLoading] = useState(false);

  const fetchDisplay = async (address) => {
    await setup();
    setLoading(true);
    try {
      const { GoatedGoats: goats = [], GoatedTraits: traits = [] } =
        await getDisplay([GoatedGoats, GoatedTraits], address);

      const goatsDictionary = goats.reduce((acc, goat) => {
        const { id } = goat;
        acc[id] = goat;
        return acc;
      }, {});

      setGoats(goats);
      setGoatsDictionary(goatsDictionary);

      const traitsDictionary = traits.reduce((acc, trait) => {
        const { id } = trait;
        acc[id] = trait;
        return acc;
      }, {});
      setTraits(traits);
      setTraitsDictionary(traitsDictionary);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDisplay(owner);
  }, [owner]);

  const sortedGoats = goats.sort((a, b) => {
    const aScore = a.skinScore + a.traitsScore;
    const bScore = b.skinScore + b.traitsScore;

    if (aScore < bScore) {
      return 1;
    }
    if (aScore > bScore) {
      return -1;
    }
    return 0;
  });

  const sortedTraits = traits.sort((a, b) => {
    const aScore = a.rarityScore;
    const bScore = b.rarityScore;

    if (aScore < bScore) {
      return 1;
    }
    if (aScore > bScore) {
      return -1;
    }
    return 0;
  });

  return (
    <Container>
      <Tabs>
        <Tab active={pathname.includes("/goats")}>
          <Link to={"goats"}>Goats</Link>
        </Tab>
        <Tab active={pathname.includes("/traits")}>
          <Link to={"traits"}>Traits</Link>
        </Tab>
      </Tabs>
      <PriceChart />
      {loading && <p>Please wait, fetching data...</p>}
      <Routes>
        <Route path="goats" element={<Goats goats={sortedGoats} />} />
        <Route path="traits" element={<Traits traits={sortedTraits} />} />
        <Route
          path="/goat/:goatId"
          element={<SingleGoat data={goatsDictionary} />}
        />
        <Route
          path="/trait/:traitId"
          element={<SingleTrait data={traitsDictionary} />}
        />
      </Routes>
    </Container>
  );
}
