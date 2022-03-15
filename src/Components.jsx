import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    background-color: rgb(244,244,250);
  }

  * {
    box-sizing: border-box;
  }

  p{
    margin: 0;
  }
`;

export const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 0.25em;
  font-size: 16px;
  text-align: center;
  flex-direction: column;
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
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  margin: 0;
  display: block;
`;

export const Frame = styled.div`
  width: 200px;
  height: auto;
  margin-bottom: 10px;
  background-color: red;
  border-radius: 8px;
  background: ${({ rarity }) => rarityToGradient(rarity)};
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

export const PreviewContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  padding: 20px;
  background-color: white;

  p {
    font-size: 18px;
    margin-bottom: 0.25em;
  }

  outline: ${({ selected }) => (selected ? "2px solid #bbb" : "")};
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
`;
