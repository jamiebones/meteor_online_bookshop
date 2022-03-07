import React from "react";

const Sales = () => {
  return (
    <div>
      <h2>Sales</h2>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th>#SN</th>
            <th>Buyer</th>
            <th>Books bought</th>
            <th>Amount</th>
            <th>Date of purchase</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>
              <p>John Doe</p>
            </td>
            <td>
              <p>The Client</p>
              <p>The tale of Mallam Musa</p>
            </td>
            <td>30.00</td>
            <td>
              <p>12/12/2019</p>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Sales;
