import { CollectorsContext, CollectorsProvider } from "./context/collectors";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getDisplay, GoatedGoats, GoatedTraits } from "flow-cadut/views";
import { Container } from "./Components";
import {
  CollectorContainer,
  Value,
  RankedGoats,
} from "./components/Collector/components";
import { setup } from "./utils/setup";
import { getSkinName } from "./utils";
import Goat from "./components/Goat";
import { PricesContext } from "./context/prices";

export const CollectorsList = () => {
  const context = useContext(CollectorsContext);
  const { goatsPrices, traitsPrices } = useContext(PricesContext);
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
    let bestGoat = null;
    if (goats) {
      for (let i = 0; i < goats.length; i++) {
        const goat = goats[i];
        const totalScore = goat.skinScore + goat.traitsScore;

        if (!bestGoat) {
          bestGoat = goat;
        } else {
          if (totalScore > bestGoat.skinScore + bestGoat.traitsScore) {
            bestGoat = goat;
          }
        }

        collectorScore += totalScore;
      }
    }

    if(address.includes("butthole")){
      console.log({goats, bestGoat})
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
        bestGoat,
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

  const goatsRanked = sorted
    .map((address) => {
      const name = byId[address] ? byId[address].name : "";
      const goat = userData[address] || {};
      const totalScore = goat.bestGoat
        ? goat.bestGoat.skinScore + goat.bestGoat.traitsScore
        : 0;
      return {
        ...goat.bestGoat,
        address,
        totalScore,
        name
      };
    })
    .sort((a, b) => {
      if (a.totalScore > b.totalScore) {
        return -1;
      }

      if (a.totalScore < b.totalScore) {
        return 1;
      }

      return 0;
    });

  const wildedGoats = goatsRanked.slice(0, 3);
  const pitBosses = goatsRanked.slice(4,10);

  const mapGoat = (goat) => {
    if (!goat.metadata) {
      return null;
    }
    const onClick = () => {};
    const selected = false;
    const {skinFileName, skinRarity} = goat.metadata
    const skinName = getSkinName(skinFileName);
    const skinPrice = goatsPrices[skinRarity]
      ? goatsPrices[skinRarity][goat.traitSlots - 5]
      : 0;
    const traitsPrice = goat.equippedTraits.reduce((acc, trait) => {
      let { rarity } = trait.metadata;
      rarity = rarity === "base" ? "common" : rarity;
      const price = traitsPrices[rarity]
        ? traitsPrices[rarity].avaragePrice
        : 0;
      acc += parseFloat(price);
      return acc;
    }, 0);
    const totalPrice = parseFloat(skinPrice) + traitsPrice;
    return (
      <Goat
        name={goat.name}
        key={goat.id}
        goat={goat}
        onClick={onClick}
        selected={selected}
        skinName={skinName}
        skinPrice={skinPrice}
        totalPrice={totalPrice}
      />
    );
  }
  return (
    <Container>
      <h1>Wildest Goats</h1>
      <RankedGoats>
        {wildedGoats.map(mapGoat)}
      </RankedGoats>

      <h2>Pit Bosses</h2>
      <RankedGoats>
        {pitBosses.map(mapGoat)}
      </RankedGoats>
      <h2>Number of known collectors - {sorted.length}</h2>
      <p>
        <b>"Collector Score"</b> - is a sum of all skin and trait rarities (both
        equipped and unequipped).
      </p>
      <br/>
      <div>
      {sorted.map((address, i) => {
        const collector = byId[address];
        const user = userData[address];
        return (
          <DisplayCollector
            key={address}
            collector={collector}
            user={user}
            position={i + 1}
          />
        );
      })}
      </div>
    </Container>
  );
};

export const DisplayCollector = (props) => {
  const { collector, user, position } = props;
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
      <Value>
        <b>
          #{position} {name}
        </b>
      </Value>
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
