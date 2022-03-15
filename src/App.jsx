import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import User from "./User";

export default function App(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="owners">
        <Route path=":owner/*" element={<User />}/>
      </Route>
    </Routes>
  );
}
