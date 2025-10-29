import React from "react";

const Summary = ({ values, prevStep }) => {
  const owner = values.owners[0];
  const netWorth =
    Number(owner.propertyValuation) -
    Number(owner.outstandingLoan) +
    Number(owner.cpfOA) +
    Number(owner.cashAvailable);

  return (
    <div>
      <h2>Summary - How-2-Buy</h2>
      <p>
        Net Worth: {netWorth.toLocaleString()}
        <br />
        Estimated Sales Proceeds: {values.salePrice}
        <br />
        TDSR Eligible: {values.currentLoans ? "Calculated above" : "Not calculated"}
        <br />
        Pledge Amount: {values.pledgeAmount}
      </p>
      <button onClick={prevStep}>Previous</button>
    </div>
  );
};

export default Summary;
