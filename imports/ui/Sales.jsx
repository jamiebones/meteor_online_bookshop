import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import BookSale from "../api/bookSales/bookSales";

const showDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const Sales = () => {
  const [bestCustomer, setBestCustomers] = useState([]);
  const [highestSales, setHighestSales] = useState([]);

  const { sales, loading } = useTracker(() => {
    const handle = Meteor.subscribe("bookSales.sales");
    return {
      loading: !handle.ready(),
      sales: BookSale.find().fetch(),
    };
  });

  let total = 0;

  useEffect(() => {
    Meteor.call("bookSales.groupSales", (err, res) => {
      if (err) {
        console.log("error", err);
      } else {
        setBestCustomers(res);
      }
    });
  }, []);

  useEffect(() => {
    Meteor.call("bookSales.highestSelling", (err, res) => {
      if (err) {
        console.log("error", err);
      } else {
        setHighestSales(res);
      }
    });
  }, []);

  return (
    <div>
      <h2>Sales</h2>

     
      <p className="text-center">Best Customers</p>

      {bestCustomer &&
        bestCustomer.map(({ _id: { email }, total }) => {
          return (
            <div key={email}  className="d-flex justify-content-between">
              <p>
                {email}
              </p>

              <p>
                {total}
              </p>
            </div>
          );
        })}

      <p className="text-center">Highest Sales</p>
      {highestSales &&
        highestSales.map(({ _id, total }) => {
          return (
            <div key={_id} className="d-flex justify-content-between">
              <p>
                {_id}
              </p>
              <p className="k">{total}</p>
            </div>
          );
        })}

      {loading && <p>Loading....</p>}
      <table className="table table-hover">
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
          {sales &&
            sales.map(
              (
                { buyer, booksBought, totalSum, dateOfPurchase, _id },
                index
              ) => {
                total += totalSum;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{buyer.email}</td>
                    <td>
                      {booksBought.map(({ title, quantity, bookId, price }) => {
                        return (
                          <div key={bookId}>
                            <p>
                              {title.toUpperCase()} : {quantity}
                              <br />
                              <span>Amount: ${price * quantity}.00</span>
                            </p>
                          </div>
                        );
                      })}
                    </td>
                    <td>
                      <p>${totalSum}.00</p>
                    </td>
                    <td>
                      <p>{showDate(dateOfPurchase)}</p>
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="2"></td>
            <td>Total</td>
            <td>$ {total}.00</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Sales;
