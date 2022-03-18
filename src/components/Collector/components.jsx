import styled from "styled-components";

export const CollectorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
  background-color: white;
  padding: 32px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 16px;
  &:first-of-type{
    background: linear-gradient(0deg, #f5ad2f, #fcce2a);
    margin-top: 20px;
  }
`;

export const Value = styled.div`
  text-align: left;
`;
