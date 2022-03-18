import styled from "styled-components";

export const CollectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  background-color: white;
  padding: 32px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const Value = styled.div`
  font-size: 16px;
  text-align: left;
`;
