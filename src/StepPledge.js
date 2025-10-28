import React from "react";

const StepPledge = ({ values, handleChange, prevStep, nextStep }) => (
  <div>
    <h2>Pledge Calculation</h2>
    <input
      type="number"
      placeholder="Pledge Amount"
      value={values.pledgeAmount}
      onChange={e => handleChange("pledgeAmount", e.target.value)}
    /> <br />
    <p>
      {Number(values.pledgeAmount) > 0
        ? "Pledge entered."
        : "No pledge specified yet."}
    </p>
    <button onClick={prevStep}>Previous</button>
    <button onClick={nextStep}>Next</button>
  </div>
);

export default StepPledge;
