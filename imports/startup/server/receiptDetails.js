import BookSalesCollection from "../../api/bookSales/bookSales";

export const ReceiptDetails = (clientSecret) => {
   //get the sales with the paymentIntent client_secret
   const bookSale = BookSalesCollection.findOne({ paymentIntent: clientSecret });
   const { booksBought, buyer, totalSum } = bookSale;
   return { booksBought, buyer, totalSum  };
}