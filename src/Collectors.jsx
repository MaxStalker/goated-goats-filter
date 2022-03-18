import { CollectorsContext, CollectorsProvider } from "./context/collectors";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getDisplay, GoatedGoats, GoatedTraits } from "flow-cadut/views";
import { Container } from "./Components";
import { CollectorContainer, Value } from "./components/Collector/components";
import { setup } from "./utils/setup";

export const CollectorsList = () => {
  const context = useContext(CollectorsContext);
  const { byId, addresses } = context;

  const [userData, setUserData] = useState({});

  const getUserCollection = async (address) => {
    if (!address) {
      return false;
    }
    // TODO: get latest update from local storage and skip fetching if it was less than 5 minutes ago

    await setup();
    const { GoatedGoats: goats = [], GoatedTraits: traits = [] } =
      await getDisplay([GoatedGoats, GoatedTraits], address);

    let collectorScore = 0;

    if (goats) {
      for (let i = 0; i < goats.length; i++) {
        const goat = goats[i];
        collectorScore += goat.skinScore + goat.traitsScore;
      }
    }

    if (traits) {
      for (let i = 0; i < traits.length; i++) {
        const trait = traits[i];
        collectorScore += trait.rarityScore;
      }
    }

    setUserData((prev) => ({
      ...prev,
      [address]: {
        goats,
        traits,
        collectorScore,
      },
    }));
  };

  const limit = addresses.length;

  useLayoutEffect(() => {
    for (let i = 0; i < limit; i++) {
      getUserCollection(addresses[i]);
    }
  }, [context]);

  const sorted = addresses.sort((a, b) => {
    if (!userData[a] && !userData[b]) {
      return 0;
    }

    if (!userData[b]) {
      return -1;
    }

    if (!userData[a]) {
      return 1;
    }

    if (userData[a].collectorScore > userData[b].collectorScore) {
      return -1;
    }
    if (userData[a].collectorScore < userData[b].collectorScore) {
      return 1;
    }

    return 0;
  });

  return (
    <Container>
      <h2>Number of known collectors - {sorted.length}</h2>
      {sorted.map((address, i) => {
        const collector = byId[address];
        const user = userData[address];
        return (
          <DisplayCollector key={address} collector={collector} user={user} position={i+1} />
        );
      })}
    </Container>
  );
};

export const DisplayCollector = (props) => {
  const { collector, user,position } = props;
  const { address, name } = collector;
  const baseUrl = `https://goated-goats-filter.vercel.app/owners/${address}`;
  const goats = `${baseUrl}/goats`;
  const traits = `${baseUrl}/traits`;

  let numberOfGoats = "???",
    numberOfTraits = "???",
    collectorScore = "???";
  if (user) {
    numberOfGoats = user.goats ? user.goats.length : "???";
    numberOfTraits = user.traits ? user.traits.length : "???";
    collectorScore = user.collectorScore ? user.collectorScore : "???";
  }
  return (
    <CollectorContainer>
      <Value><b>#{position} {name}</b></Value>
      <Value>
        <b>Collector Score: {collectorScore}</b>
      </Value>
      <Value>
        <b>Goats: {numberOfGoats}</b>
      </Value>
      <Value>
        <a target="_blank" href={goats}>
          Goats
        </a>
      </Value>
      <Value>
        <b>{address}</b>
      </Value>
      <Value>
        <b>Traits: {numberOfTraits}</b>
      </Value>
      <Value>
        <a target="_blank" href={traits}>
          Traits
        </a>
      </Value>
    </CollectorContainer>
  );
};

export default function Collectors() {
  return (
    <CollectorsProvider>
      <CollectorsList />
    </CollectorsProvider>
  );
}
