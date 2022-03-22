import data from "./data/small-data.json";
import { useEffect, useState } from "react";

import { Container, Input } from "./Components";
import {
  Container as TraitContainer,
  Content,
  GoatName,
  ValueDisplay,
  Label,
  Value,
  Values,
  RarityContainer,
  Rarity,
} from "./components/Goat/components";
import {
  Container as Slot,
  Preview,
  PreviewContainer,
  SilhouetteBody,
  SilhouetteHead,
} from "./components/Slot/components";
import { Gallery } from "./Components";
import { getTraitName } from "./utils";
import { Link } from "react-router-dom";
import { getRarityScore } from "flow-cadut/views/src/GoatedGoats/utils";

const RarityDisplay = () => {
  const { traits, goats } = data;
  console.log(traits);
  const { byType, imageData, totalCount, bySlot } = traits;
  const types = Object.keys(byType);
  const sorted = types.sort((a,b)=>{
    // const aItem =  imageData[`${a}.png`]
    // const bItem =  imageData[`${b}.png`]
    const aRarity = (byType[a] / totalCount) * 100 //getRarityScore(aItem.rarity)
    const bRarity = (byType[b] / totalCount) * 100 //getRarityScore(bItem.rarity)

    console.log(aRarity, bRarity)

    if(aRarity > bRarity){
      return 1
    }
    if(aRarity < bRarity){
      return -1
    }
    return 0
  })

  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(types);

  useEffect(() => {
    if (query === "") {
      setFiltered(types);
    } else {
      const filtered = sorted.filter((type) => {
        const item = imageData[`${type}.png`];
        const { rarity, fileName, traitSlot } = item;

        const lcQuery = query.toLowerCase();
        return (
          rarity.toLowerCase().includes(lcQuery) ||
          fileName.toLowerCase().includes(lcQuery) ||
          traitSlot.toLowerCase().includes(lcQuery)
        );
      })
      setFiltered(filtered);
    }
  }, [query]);

  return (
    <Container>
      <h2>Total Traits Minted: {totalCount}</h2>
      <Input
        placeholder={"Enter trait name, rarity ot trait slot here"}
        mb={"16px"}
        type={"text"}
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      />
      <Gallery>
        {filtered.map((type) => {
          const { src, rarity, fileName, traitSlot } = imageData[`${type}.png`];
          const title = getTraitName(fileName, traitSlot);
          const totalOfThisSlot = bySlot[traitSlot].items;
          const totalRarity = ((byType[type] / totalCount) * 100).toFixed(3);
          const slotRarity = (
            (byType[type] / totalOfThisSlot) *
            100
          ).toFixed(3);
          const rarityScore = getRarityScore(rarity);
          return (
            <TraitContainer key={type}>
              <PreviewContainer rarity={rarity} className={"min200"}>
                <Preview src={src} alt={title} title={title} elevate={0} />
              </PreviewContainer>
              <Content trait>
                <GoatName rarity={rarity}>{title}</GoatName>
                <Values>
                  <ValueDisplay>
                    <Label>Total Rarity</Label>
                    <Value>{totalRarity}%</Value>
                  </ValueDisplay>
                  <ValueDisplay>
                    <Label>Slot Rarity</Label>
                    <Value>{slotRarity}%</Value>
                  </ValueDisplay>
                </Values>
              </Content>
              <RarityContainer rarity={rarity}>
                <Rarity rarity={rarity} className="pill">
                  <label className={"rarity"}>
                    Minted: {byType[type]}
                  </label>
                </Rarity>
              </RarityContainer>
            </TraitContainer>
          );
        })}
      </Gallery>
    </Container>
  );
};

export default RarityDisplay;
