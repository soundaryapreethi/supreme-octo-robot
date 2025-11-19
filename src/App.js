import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logger from "./logger";
 
import CustomerTable from "./CustomerTable";
import CustomerDetails from "./CustomerDetails";
 
// Styled components
const Container = styled.div`
  display: flex;
  gap: 32px;
  padding: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
 
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
 
const LeftPanel = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 420px;
`;
 
const RightPanel = styled.div`
  flex: 2;
  min-width: 420px;
  background: #ffffff;
  padding: 26px 32px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(34, 68, 136, 0.1);
 
  @media (max-width: 900px) {
    min-width: 0;
    max-width: 100%;
    margin-top: 24px;
  }
`;
 
const Header = styled.h1`
  margin-bottom: 16px;
  color: #224488;
`;
 
const Label = styled.label`
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 12px;
`;
 
const Select = styled.select`
  margin-left: 8px;
  padding: 6px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;
 
function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2025");
 
  useEffect(() => {
    fetch("/data/customers.json")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        logger.info("Loaded customers data");
      })
      .catch((err) => logger.error("Failed to load data", err));
  }, []);
 
  return (
<Container>
<LeftPanel>
<Header>Customer Rewards Dashboard</Header>
<Label>
          Year:
<Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {["2025", "2024", "2023", "2022", "2021"].map((y) => (
<option key={y} value={y}>
                {y}
</option>
            ))}
</Select>
</Label>
<CustomerTable
          customers={customers}
          onSelect={setSelectedCustomer}
          selectedYear={selectedYear}
        />
</LeftPanel>
<RightPanel>
        {selectedCustomer ? (
<CustomerDetails customer={selectedCustomer} selectedYear={selectedYear} />
        ) : (
<div style={{ marginTop: 40, color: "#888" }}>Select a customer to view details.</div>
        )}
</RightPanel>
</Container>
  );
}
 
export default App;