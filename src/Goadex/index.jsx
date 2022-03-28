import skins from "../data/skin-list.json";
import { capitalize, getSkinName } from "../utils";
import { GoadexContainer, ComposedImage, SmallContainer } from "./components";
import {
  GoatName,
  Rarity,
  RarityContainer,
} from "../components/Goat/components";

export const SingleGoadexGoat = (props) => {
  const { skin, amount } = props;
  const { meta } = skin;
  const { skinRarity, skinFileName } = meta;
  const name = getSkinName(skinFileName);
  const rarity = skinRarity;
  return (
    <SmallContainer>
      <ComposedImage skin={skin} />
      <GoatName rarity={rarity}>{name}</GoatName>
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

  const skinList = Object.keys(skins);

  return (
    <>
      <h2>Gotta Catch Them AlL!</h2>

      <GoadexContainer>
        {skinList.map((skinName) => {
          const skin = skins[skinName];
          const amount = 2;
          console.log(skin);
          return <SingleGoadexGoat amount={amount} skin={skin} />;
        })}
      </GoadexContainer>
    </>
  );
}
