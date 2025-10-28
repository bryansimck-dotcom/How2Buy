import React from "react";

const StepProfile = ({ values, handleChange, addOwner, nextStep }) => (
  <div>
    <h2>Client Profile</h2>
    {values.owners.map((owner, idx) => (
      <div key={idx} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
        <h3>Owner {idx + 1}</h3>
        <input
          type="number"
          placeholder="Age"
          value={owner.age}
          onChange={(e) => handleChange("age", e.target.value, idx)}
        /> <br />
        <input
          type="number"
          placeholder="Property Valuation"
          value={owner.propertyValuation}
          onChange={(e) => handleChange("propertyValuation", e.target.value, idx)}
        /> <br />
        <input
          type="number"
          placeholder="Outstanding Loan"
          value={owner.outstandingLoan}
          onChange={(e) => handleChange("outstandingLoan", e.target.value, idx)}
        /> <br />
        <input
          type="number"
          placeholder="CPF Utilized"
          value={owner.cpfUtilized}
          onChange={(e) => handleChange("cpfUtilized", e.target.value, idx)}
        /> <br />
        <input
          type="number"
          placeholder="CPF Accrued Interest"
          value={owner.cpfAccrued}
          onChange={(e) => handleChange("cpfAccrued", e.target.value, idx)}
        /> <br />
        <input
          type="number"
          placeholder="CPF OA Balance"
          value={owner.cpfOA}
          onChange={(e) => handleChange("cpfOA", e.target.value, idx)}
        /> <br />
        <input
          type="number"
          placeholder="Monthly Income"
          value={owner.monthlyIncome}
          onChange={(e) => handleChange("monthlyIncome", e.target.value, idx)}
        /> <br />
        <input
          type="number"
          placeholder="Cash Available"
          value={owner.cashAvailable}
          onChange={(e) => handleChange("cashAvailable", e.target.value, idx)}
        /> <br />
      </div>
    ))}
    <button onClick={addOwner}>Add Another Owner</button> <br /><br />
    <button onClick={nextStep}>Next</button>
  </div>
);

export default StepProfile;
