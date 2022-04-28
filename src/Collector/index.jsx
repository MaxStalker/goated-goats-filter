import skins from "../data/skin-list.json";
import tData from "../data/trait-list.json";
import { getSkinName, getTraitName } from "../utils";
import {
  GoadexContainer,
  ComposedImage,
  SmallContainer,
  TraitImage,
} from "./components";
import {
  GoatName,
  Rarity,
  RarityContainer,
} from "../components/Goat/components";
import { getRarityScore } from "flow-cadut/views/src/GoatedGoats/utils";

export const SingleGoadexGoat = (props) => {
  const { skin, amount } = props;
  const { meta } = skin;
  const { skinRarity, skinFileName } = meta;
  const name = getSkinName(skinFileName);
  const rarity = skinRarity;
  const collected = amount > 0;
  return (
    <SmallContainer collected={collected}>
      <ComposedImage skin={skin} collected={collected} />
      <GoatName rarity={rarity}>{name}</GoatName>
      <RarityContainer rarity={rarity}>
        <Rarity rarity={rarity} className="pill">
          <label className={"rarity"}>Amount: {amount}</label>
        </Rarity>
      </RarityContainer>
    </SmallContainer>
  );
};

export const SingleGoadexTrait = (props) => {
  const { trait, amount } = props;
  const { rarity, fileName, traitSlot } = trait;
  const name = getTraitName(fileName, traitSlot);
  const collected = amount > 0;
  return (
    <SmallContainer collected={collected} rows={"auto 50px auto"}>
      <TraitImage trait={trait} />
      <GoatName rarity={rarity} wrap={"none"}>
        {name}
      </GoatName>
      <RarityContainer rarity={rarity}>
        <Rarity rarity={rarity} className="pill">
          <label className={"rarity"}>Amount: {amount}</label>
        </Rarity>
      </RarityContainer>
    </SmallContainer>
  );
};

export default function Goadex(props) {
  const { goats, traits } = props;

  const goatsData = goats.reduce((acc, goat) => {
    const skinName = getSkinName(goat.metadata.skinFileName);
    if (!acc[skinName]) {
      acc[skinName] = {
        goat,
        amount: 1,
      };
    } else {
      acc[skinName].amount += 1;
    }
    return acc;
  }, {});

  const equippedTraitsData = goats.reduce((acc, goat) => {
    const { equippedTraits } = goat;
    if (equippedTraits.length > 0) {
      equippedTraits.forEach((trait) => {
        const { metadata } = trait;
        if (!acc[metadata.fileName]) {
          acc[metadata.fileName] = {
            trait: metadata,
            amount: 1,
          };
        } else {
          acc[metadata.fileName].amount += 1;
        }
      });
    }
    return acc;
  }, {});

  const traitsData = traits.reduce((acc, trait) => {
    const key = trait.metadata.fileName;
    if (!acc[key]) {
      acc[key] = {
        trait,
        amount: 1,
      };
    } else {
      acc[key].amount += 1;
    }
    return acc;
  }, {});

  const skinList = Object.keys(skins).sort((a, b) => {
    const aScore = getRarityScore(skins[a].meta.skinRarity);
    const bScore = getRarityScore(skins[b].meta.skinRarity);

    const aName = getSkinName(skins[a].meta.skinFileName);
    const bName = getSkinName(skins[b].meta.skinFileName);

    const aAmount = goatsData[aName] ? goatsData[aName].amount : 0;
    const bAmount = goatsData[bName] ? goatsData[bName].amount : 0;

    // sort by rarity
    if (aScore > bScore) {
      return -1;
    }

    if (aScore < bScore) {
      return 1;
    }

    // sort by amount
    if (aAmount > bAmount) {
      return -1;
    }

    if (aAmount < bAmount) {
      return 1;
    }

    // sort by name

    if (aName > bName) {
      return 1;
    }

    if (aName < bName) {
      return -1;
    }

    return 0;
  });
  const traitList = Object.keys(tData).sort((a, b) => {
    const aScore = getRarityScore(tData[a].rarity);
    const bScore = getRarityScore(tData[b].rarity);

    const aName = getTraitName(tData[a].fileName, tData[a].traitSlot);
    const bName = getTraitName(tData[b].fileName, tData[b].traitSlot);

    const aAmount = traitsData[aName] ? traitsData[aName].amount : 0;
    const bAmount = traitsData[bName] ? traitsData[bName].amount : 0;

    // sort by rarity
    if (aScore > bScore) {
      return -1;
    }

    if (aScore < bScore) {
      return 1;
    }

    // sort by amount
    if (aAmount > bAmount) {
      return -1;
    }

    if (aAmount < bAmount) {
      return 1;
    }

    // sort by name

    if (aName > bName) {
      return 1;
    }

    if (aName < bName) {
      return -1;
    }

    return 0;
  });

  console.log({ traitList })

  return (
    <>
      <h2>Pelt Collector</h2>

      <GoadexContainer>
        {skinList.map((skinName) => {
          const skin = skins[skinName];
          const name = getSkinName(skin.meta.skinFileName);
          const amount = goatsData[name] ? goatsData[name].amount : 0;
          return <SingleGoadexGoat amount={amount} skin={skin} />;
        })}
      </GoadexContainer>

      <h2>Trait Collector</h2>
      <GoadexContainer>
        {traitList.map((traitName) => {
          const trait = tData[traitName];
          let amount = traitsData[trait.fileName]
            ? traitsData[trait.fileName].amount
            : 0;
          amount += equippedTraitsData[trait.fileName]
            ? equippedTraitsData[trait.fileName].amount
            : 0;
          return <SingleGoadexTrait trait={trait} amount={amount} />;
        })}
      </GoadexContainer>
    </>
  );
}
