import React, { useState, useMemo } from "react";

import PropTypes from "prop-types";

import { Table, Thead, Th, Td, Tr } from "./TableStyles";
 
function CustomerTable({ customers, onSelect, selectedYear }) {

  // Filter transactions by selected year

  const filtered = useMemo(

    () =>

      customers.map((c) => ({

        ...c,

        transactions: c.transactions.filter((t) => t.date.startsWith(selectedYear)),

      })),

    [customers, selectedYear]

  );
 
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const totalPages = Math.ceil(filtered.length / pageSize);

  const displayed = filtered.slice((page - 1) * pageSize, page * pageSize);
 
  return (
<>
<Table>
<Thead>
<tr>
<Th>Customer</Th>
<Th>Transactions</Th>
</tr>
</Thead>
<tbody>

          {displayed.map((c) => (
<Tr key={c.customerId} onClick={() => onSelect(c)}>
<Td>{c.name}</Td>
<Td>{c.transactions.length}</Td>
</Tr>

          ))}
</tbody>
</Table>
<div style={{ marginTop: 12 }}>
<button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>

          Prev
</button>
<span style={{ margin: "0 10px" }}>

          Page {page} of {totalPages}
</span>
<button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>

          Next
</button>
</div>
</>

  );

}
 
CustomerTable.propTypes = {

  customers: PropTypes.array.isRequired,

  onSelect: PropTypes.func.isRequired,

  selectedYear: PropTypes.string.isRequired,

};
 
export default CustomerTable;

 