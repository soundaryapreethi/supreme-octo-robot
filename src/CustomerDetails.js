import React, { useMemo, useState } from "react";

import PropTypes from "prop-types";

import styled from "styled-components";
 
import { calculateRewardPoints } from "./rewards";

import logger from "./logger";
 
function getMonth(date) {

  return date.slice(0, 7); // YYYY-MM

}
 
// Styled components

const Container = styled.div`

  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  color: #224488;

`;
 
const Title = styled.h2`

  margin-bottom: 12px;

  font-weight: 700;

`;
 
const Label = styled.label`

  font-weight: 600;

  margin-bottom: 8px;

  display: block;

`;
 
const Select = styled.select`

  margin-left: 8px;

  padding: 6px 10px;

  border-radius: 6px;

  border: 1px solid #ccc;

  font-size: 1rem;

  color: #224488;

`;
 
const Section = styled.div`

  margin: 16px 0;

`;
 
const BoldText = styled.strong`

  color: #224488;

  font-weight: 700;

`;
 
const List = styled.ul`

  margin-left: 20px;

  color: #333;

`;
 
const ListItem = styled.li`

  padding: 6px 0;

`;
 
const Hr = styled.hr`

  margin: 20px 0;

  border: none;

  border-top: 1px solid #ddd;

`;
 
const EmptyMessage = styled.p`

  color: #888;

  margin-top: 12px;

`;
 
function CustomerDetails({ customer, selectedYear }) {

  const monthPoints = useMemo(() => {

    const agg = {};

    customer.transactions.forEach((t) => {

      if (t.date.startsWith(selectedYear)) {

        const month = getMonth(t.date);

        agg[month] = (agg[month] || 0) + calculateRewardPoints(t.amount);

      }

    });

    return agg;

  }, [customer, selectedYear]);
 
  const months = Object.keys(monthPoints).sort().reverse();

  const [selectedMonth, setSelectedMonth] = useState(months[0] || "");
 
  const monthTxns = useMemo(

    () => customer.transactions.filter((t) => getMonth(t.date) === selectedMonth),

    [customer, selectedMonth]

  );
 
  const totalPoints = Object.values(monthPoints).reduce((a, b) => a + b, 0);
 
  logger.info(`Customer ${customer.name} details loaded`);
 
  return (
<Container>
<Title>{customer.name}'s Reward Details</Title>
<Label>

        Month:
<Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>

          {months.map((m) => (
<option key={m} value={m}>

              {m}
</option>

          ))}
</Select>
</Label>
 
      <Section>
<BoldText>Reward Points Per Month:</BoldText>
<List>

          {months.map((m) => (
<ListItem key={m}>

              {m}: {monthPoints[m]}
</ListItem>

          ))}
</List>
<BoldText>Total Reward Points: {totalPoints}</BoldText>
</Section>
 
      <Hr />
 
      <Section>
<h3>Transactions for {selectedMonth}</h3>

        {monthTxns.length === 0 ? (
<EmptyMessage>No transactions</EmptyMessage>

        ) : (
<List>

            {monthTxns.map((txn) => (
<ListItem key={txn.transactionId}>

                Amount: ${txn.amount}, Points: {calculateRewardPoints(txn.amount)}
</ListItem>

            ))}
</List>

        )}
</Section>
</Container>

  );

}
 
CustomerDetails.propTypes = {

  customer: PropTypes.object.isRequired,

  selectedYear: PropTypes.string.isRequired,

};
 
export default CustomerDetails;

 