import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import User from "./User";
import { PriceProvider } from "./context/prices";

export default function App() {
  return (
    <PriceProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="owners">
          <Route path=":owner/*" element={<User />} />
        </Route>
      </Routes>
    </PriceProvider>
  );
}
