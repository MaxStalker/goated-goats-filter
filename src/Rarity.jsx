import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { Container, Tab, Tabs } from "./Components";
import GoatsRarities from "./GoatRarities";
import TraitsRarirites from "./TraitsRarities";
import data from "./data/small-data.json";

const Rarity = (props) => {
  const { traits, goats } = data;
  const { pathname } = useLocation();
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
      <Routes>
        <Route path="goats" element={<GoatsRarities data={goats} />} />
        <Route path="traits" element={<TraitsRarirites data={traits} />} />
        <Route path="/" exact element={<Navigate to="goats" replace />} />
      </Routes>
    </Container>
  );
};

export default Rarity;
