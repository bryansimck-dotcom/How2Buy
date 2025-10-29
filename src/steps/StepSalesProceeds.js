import React from "react";

const StepSalesProceeds = ({ values, handleChange, prevStep, nextStep }) => {
  // Estimate proceeds calculation
  const owner = values.owners[0]; // assuming single owner for flow
  const salePrice = Number(values.salePrice);
  const cpfRepay = Number(owner.cpfUtilized) + Number(owner.cpfAccrued);
  const proceeds = salePrice
    - Number(owner.outstandingLoan)
    - cpfRepay
    - (salePrice * values.agentCommission / 100)
    - Number(values.miscFees || 0);

  return (
    <div>
      <h2>Expected Sales Proceeds</h2>
      <input
        type="number"
        placeholder="Sale Price"
        value={values.salePrice}
        onChange={e => handleChange("salePrice", e.target.value)}
      /> <br />
      <input
        type="number"
        placeholder="Agent Commission (%)"
        value={values.agentCommission}
        onChange={e => handleChange("agentCommission", e.target.value)}
      /> <br />
      <input
        type="number"
        placeholder="Miscellaneous Fees"
        value={values.miscFees}
        onChange={e => handleChange("miscFees", e.target.value)}
      /> <br />
      <p>Estimated Proceeds: {isNaN(proceeds) ? "" : proceeds.toLocaleString()}</p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default StepSalesProceeds;
