import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html{
    padding: 0;
    margin: 0;
  }
  body {
    font-family: sans-serif;
    background-color: #e0e3e1;
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  p{
    margin: 0;
  }
`;

export const Container = styled.div`
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 80vw;
  margin: 0 auto;

  @media (max-width: 480px) {
    max-width: 100%;
    margin: 1rem auto;
  }
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5em;
  font-size: 16px;
  text-align: center;
  flex-direction: column;
  border-radius: 4px;
  margin-bottom: ${({ mb = "initial" }) => mb};
`;

export const Selector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Option = styled.div`
  color: ${({ active }) => (active ? "red" : "blue")};
  padding: 1em;
  font-size: 20px;
  cursor: pointer;
`;

export const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.5em;
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  margin: 0;
  display: block;
`;

export const Frame = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  background: ${({ rarity }) => rarityToGradient(rarity)};
  position: relative;
`;

export const Shadow = styled.div`
  box-shadow: inset 0 0 8px 2px rgb(0 0 0 / 15%);
  position: absolute;
  border-radius: 8px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  pointer-events: none;
`;

const rarityToGradient = (rarity) => {
  switch (rarity) {
    case "common":
      return "linear-gradient(180deg, rgb(150, 150, 150) 0%, rgb(216, 216, 228) 100%)";
    case "rare":
      return "linear-gradient(180deg, rgb(53, 125, 149) 0%, rgb(86, 204, 242) 100%)";
    case "epic":
      return "linear-gradient(180deg, rgb(33, 150, 83) 0%, rgb(111, 207, 151) 100%)";
    case "legendary":
      return "linear-gradient(180deg, rgb(198, 117, 135) 0%, rgb(246, 215, 222) 100%)";
    default:
      return "white";
  }
};

const getBgByRarity = (rarity) => {
  switch (rarity) {
    case "legendary":
      return "#f2d1d9";
    case "rare":
      return "#d3f4ff";
    case "epic":
      return "#ecfff4";
    default:
      return "white";
  }
};

export const PreviewContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  padding: 20px;
  background-color: ${({ rarity }) => getBgByRarity(rarity)};

  p {
    font-size: 18px;
    margin-bottom: 0.25em;
  }

  outline: ${({ selected }) => (selected ? "2px solid #bbb" : "")};
  box-shadow: 0 3px 12px rgb(0 0 0 / 15%), 0 0 0 1px rgb(222 222 229);
`;

export const TraitPreview = styled.div`
  background-color: ${({ bg }) => bg || "white"};
  border-radius: 5px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-right: 1em;
`;

export const Checkbox = ({ label, checked, onChange }) => {
  return (
    <CheckboxContainer onClick={() => onChange(!checked)}>
      <input id={label} type="checkbox" checked={checked} />
      <p>{label}</p>
    </CheckboxContainer>
  );
};

const MetaContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.25em;
  &:last-child {
    margin-bottom: 0;
  }
`;

const MetaLabel = styled.div`
  :after {
    content: ":";
  }
  margin-right: 4px;
`;

const MetaValue = styled.div`
  font-weight: bold;
`;

export const Meta = ({ label, value }) => {
  return (
    <MetaContainer>
      <MetaLabel>{label}</MetaLabel>
      <MetaValue>{value}</MetaValue>
    </MetaContainer>
  );
};

export const SelectorBox = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Tabs = styled.div`
  padding: 4px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: #ccc;
  height: 50px;
  width: 300px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

export const Tab = styled.div`
  padding: 4px;
  font-weight: 700;
  background-color: ${({ active }) => (active ? "#777" : "#ccc")};
  color: ${({ active }) => (active ? "white" : "#555")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  a {
    text-decoration: none;
    color: inherit;
  }
`;
