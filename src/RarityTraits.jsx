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
  const { byType, imageData, totalCount, bySlot, byRarity } = traits;
  const types = Object.keys(byType);
  const sorted = types
    .sort((a, b) => {
      const aRarity = (byType[a] / totalCount) * 100;
      const bRarity = (byType[b] / totalCount) * 100;

      if (aRarity > bRarity) {
        return 1;
      }
      if (aRarity < bRarity) {
        return -1;
      }
      return 0;
    });

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
      });
      setFiltered(filtered);
    }
  }, [query]);

  return (
    <Container>
      <Values>
        <ValueDisplay mb={"16px"}>
          <Label>Total Traits Minted</Label>
          <Value>{totalCount}</Value>
        </ValueDisplay>

        <ValueDisplay mb={"16px"}>
          <Label>Base Traits</Label>
          <Value>{byRarity["base"]}</Value>
        </ValueDisplay>

        <ValueDisplay mb={"16px"}>
          <Label>Common Traits</Label>
          <Value>{byRarity["common"]}</Value>
        </ValueDisplay>

        <ValueDisplay mb={"16px"}>
          <Label>Rare Traits</Label>
          <Value>{byRarity["rare"]}</Value>
        </ValueDisplay>

        <ValueDisplay mb={"16px"}>
          <Label>Epic Traits</Label>
          <Value>{byRarity["epic"]}</Value>
        </ValueDisplay>

        <ValueDisplay mb={"16px"}>
          <Label>Legendary Traits</Label>
          <Value>{byRarity["legendary"]}</Value>
        </ValueDisplay>
      </Values>

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
          const totalAccountableItems = totalCount - byRarity["base"]
          const totalOfThisSlot = bySlot[traitSlot].items;
          const totalRarity = ((byType[type] / totalAccountableItems) * 100).toFixed(3);
          const slotRarity = ((byType[type] / totalOfThisSlot) * 100).toFixed(
            3
          );
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
                  <label className={"rarity"}>Minted: {byType[type]}</label>
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
