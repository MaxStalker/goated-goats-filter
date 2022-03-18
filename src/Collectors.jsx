import { CollectorsContext, CollectorsProvider } from "./context/collectors";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getDisplay, GoatedGoats, GoatedTraits } from "flow-cadut/views";
import { Container } from "./Components";
import { CollectorContainer, Value } from "./components/Collector/components";
import { setup } from "./utils/setup";

export const CollectorsList = () => {
  const context = useContext(CollectorsContext);
  console.log({ context });
  const { byId, addresses } = context;

  const [userData, setUserData] = useState({});
  window.userData = userData

  const getUserCollection = async (address) => {
    // TODO: get latest update from local storage and skip fetching if it was less than 5 minutes ago

    await setup();
    const { GoatedGoats: goats = [], GoatedTraits: traits = [] } =
      await getDisplay([GoatedGoats, GoatedTraits], address);
    console.log({ address, goats, traits });
    setUserData({
      ...userData,
      [address]: {
        goats,
        traits,
      },
    });
  };

  const limit = addresses.length;
  // const limit = 3;

  useEffect(() => {
    for (let i = 0; i < limit; i++) {
      getUserCollection(addresses[i]);
    }
  }, []);

  return (
    <Container>
      {addresses.map((address) => {
        const collector = byId[address];
        const user = userData[address];
        return <DisplayCollector collector={collector} user={user} />;
      })}
    </Container>
  );
};

export const DisplayCollector = (props) => {
  const { collector, user } = props;
  const { address, name } = collector;
  const baseUrl = `https://goated-goats-filter.vercel.app/owners/${address}`;
  const goats = `${baseUrl}/goats`;
  const traits = `${baseUrl}/traits`;

  console.log({ user });
  //const numberOfGoats = user ? userData : "???";
  return (
    <CollectorContainer>
      <Value>{name}</Value>
      <Value>
        <b>{address}</b>
      </Value>
      <Value>
        <a target="_blank" href={goats}>
          Goats
        </a>
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
