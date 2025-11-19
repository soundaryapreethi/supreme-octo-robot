import styled from "styled-components";
 
export const Table = styled.table`

  width: 100%;

  border-collapse: collapse;

  background: #fff;

  border-radius: 6px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

`;
 
export const Thead = styled.thead`

  background-color: #eaf2fd;

`;
 
export const Th = styled.th`

  padding: 12px 16px;

  font-weight: 600;

  color: #436db6;

  text-align: left;

  border-bottom: 2px solid #c9daf8;

`;
 
export const Td = styled.td`

  padding: 12px 16px;

  border-bottom: 1px solid #def;

  color: #222;

`;
 
export const Tr = styled.tr`

  cursor: pointer;
 
  &:hover {

    background-color: #f0f6ff;

  }

`;

 