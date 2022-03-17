import styled from "styled-components";
import { rarityColors } from "../../utils/colors";

export default function PriceChart() {
  const url =
    //"https://docs.google.com/spreadsheets/d/1RsSPTdKXs_BSbE9KErzl_f2YfS4GhaccHmU8OJOMkXY/edit?usp=sharing";
    "https://docs.google.com/spreadsheets/d/1RsSPTdKXs_BSbE9KErzl_f2YfS4GhaccHmU8OJOMkXY/edit#gid=679016455?usp=sharing"
  return (
    <Container>
      Prices are based on{" "}
      <OutsideLink target="_blank" href={url}>
        Totally Oppinionated Price Chart
      </OutsideLink>
    </Container>
  );
}

const Container = styled.p`
  margin-bottom: 10px;
`;

const OutsideLink = styled.a`
  color: ${rarityColors.epic};
  margin-bottom: 10px;
`;
