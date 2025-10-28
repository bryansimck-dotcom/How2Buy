import React from "react";

const StepPurchasePower = ({ values, handleChange, prevStep, nextStep }) => {
  const owner = values.owners[0];

  const totalMonthlyDebt =
    Number(owner.outstandingLoan) +
    Number(values.carLoan || 0) +
    (Array.isArray(values.currentLoans) ?
      values.currentLoans.reduce((a, b) => a + Number(b), 0) : 0);

  const totalIncome =
    Number(owner.monthlyIncome);

  // MAS TDSR calculation (Singapore: max 55%)
  const tdsr = totalMonthlyDebt / totalIncome;
  const tdsrEligible = tdsr <= 0.55;

  return (
    <div>
      <h2>Current Purchase Power</h2>
      <input
        type="number"
        placeholder="Car Loan Monthly Repayment"
        value={values.carLoan}
        onChange={e => handleChange("carLoan", e.target.value)}
      /> <br />
      <input
        type="number"
        placeholder="Other Monthly Fixed Loans"
        value={values.currentLoans}
        onChange={e => handleChange("currentLoans", [e.target.value])}
      /> <br />
      <p>
        Total Monthly Debt: {totalMonthlyDebt}
        <br />
        Monthly Income: {totalIncome}
        <br />
        TDSR: {(tdsr * 100).toFixed(2)}%
        <br />
        {tdsrEligible
          ? "Eligible under MAS TDSR rule (≤ 55%)"
          : "Not eligible (exceeds 55%)"}
      </p>
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default StepPurchasePower;
