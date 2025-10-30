(() => {
  const form = document.getElementById('how2buy-form');
  const ownersContainer = document.getElementById('owners-container');
  const addOwnerBtn = document.getElementById('add-owner-btn');
  const summaryOutput = document.getElementById('summary-output');

  addOwnerBtn.addEventListener('click', () => {
    const ownerTemplate = ownersContainer.querySelector('.owner-entry');
    const newOwner = ownerTemplate.cloneNode(true);
    newOwner.querySelectorAll('input').forEach(input => input.value = '');
    ownersContainer.appendChild(newOwner);
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const ownerEntries = ownersContainer.querySelectorAll('.owner-entry');
    let totalPropertyValuation = 0;
    let totalOutstandingLoan = 0;
    let totalCpfUtilized = 0;
    let totalCpfOA = 0;
    let totalMonthlyIncome = 0;
    let totalCashAvailable = 0;
    let avgAge = 0;

    ownerEntries.forEach(owner => {
      const age = parseInt(owner.querySelector('input[name="age"]').value) || 0;
      const propertyValuation = parseFloat(owner.querySelector('input[name="propertyValuation"]').value) || 0;
      const outstandingLoan = parseFloat(owner.querySelector('input[name="outstandingLoan"]').value) || 0;
      const cpfUtilized = parseFloat(owner.querySelector('input[name="cpfUtilized"]').value) || 0;
      const cpfOA = parseFloat(owner.querySelector('input[name="cpfOA"]').value) || 0;
      const monthlyIncome = parseFloat(owner.querySelector('input[name="monthlyIncome"]').value) || 0;
      const cashAvailable = parseFloat(owner.querySelector('input[name="cashAvailable"]').value) || 0;

      avgAge += age;
      totalPropertyValuation += propertyValuation;
      totalOutstandingLoan += outstandingLoan;
      totalCpfUtilized += cpfUtilized;
      totalCpfOA += cpfOA;
      totalMonthlyIncome += monthlyIncome;
      totalCashAvailable += cashAvailable;
    });

    avgAge = ownerEntries.length > 0 ? (avgAge / ownerEntries.length).toFixed(1) : 0;

    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value) || 0;
    const agentFee = parseFloat(document.getElementById('agentFee').value) || 0;
    const legalFee = parseFloat(document.getElementById('legalFee').value) || 0;
    const resaleLevy = parseFloat(document.getElementById('resaleLevy').value) || 0;

    const salesProceeds = sellingPrice - totalOutstandingLoan - totalCpfUtilized - agentFee - legalFee - resaleLevy;

    const monthlyMortgageRepayment = parseFloat(document.getElementById('monthlyMortgageRepayment').value) || 0;
    const monthlyCarLoanRepayment = parseFloat(document.getElementById('monthlyCarLoanRepayment').value) || 0;
    const monthlyOtherLoanRepayment = parseFloat(document.getElementById('monthlyOtherLoanRepayment').value) || 0;

    const grossMonthlyIncome = totalMonthlyIncome;

    const maxMonthlyDebtPaymentTDSR = grossMonthlyIncome * 0.55;
    const maxMonthlyMortgageMSR = grossMonthlyIncome * 0.30;

    const currentTotalMonthlyDebtRepayment =
      monthlyMortgageRepayment + monthlyCarLoanRepayment + monthlyOtherLoanRepayment;

    const remainingDebtServicingPower = maxMonthlyDebtPaymentTDSR - currentTotalMonthlyDebtRepayment;
    const remainingMortgageServicingPower = maxMonthlyMortgageMSR - monthlyMortgageRepayment;

    const maxAdditionalMortgageRepayment = Math.min(remainingDebtServicingPower, remainingMortgageServicingPower);

    function estimateMaxLoanAmount(monthlyRepayment, annualInterestRatePercent = 3, years = 30) {
      const r = annualInterestRatePercent / 100 / 12;
      const n = years * 12;
      if (monthlyRepayment <= 0) return 0;
      const numerator = monthlyRepayment * (Math.pow(1 + r, n) - 1);
      const denominator = r * Math.pow(1 + r, n);
      return numerator / denominator;
    }

    const maxNewLoanAmount = estimateMaxLoanAmount(maxAdditionalMortgageRepayment);

    const pledgeAmount = parseFloat(document.getElementById('pledgeAmount').value) || 0;

    let summaryText = '';
    summaryText += `Client Average Age (ANB): ${avgAge}\n`;
    summaryText += `Total Property Valuation: SGD ${totalPropertyValuation.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Total Outstanding Loan: SGD ${totalOutstandingLoan.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Total CPF Utilized + Accrued Interest: SGD ${totalCpfUtilized.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Total CPF OA Current: SGD ${totalCpfOA.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Total Monthly Income: SGD ${totalMonthlyIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Total Cash Available for Next Purchase: SGD ${totalCashAvailable.toLocaleString(undefined, {minimumFractionDigits: 2})}\n\n`;

    summaryText += `--- Sales Proceeds Calculation ---\n`;
    summaryText += `Selling Price: SGD ${sellingPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Less Outstanding Loan: SGD ${totalOutstandingLoan.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Less CPF Refund (Utilized + Interest): SGD ${totalCpfUtilized.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Less Agent Fee: SGD ${agentFee.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Less Legal Fee: SGD ${legalFee.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Less Resale Levy: SGD ${resaleLevy.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `EXPECTED SALES PROCEEDS: SGD ${salesProceeds.toLocaleString(undefined, {minimumFractionDigits: 2})}\n\n`;

    summaryText += `--- Purchase Power Calculation ---\n`;
    summaryText += `Gross Monthly Income: SGD ${grossMonthlyIncome.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Max Monthly Debt Payment (TDSR, 55%): SGD ${maxMonthlyDebtPaymentTDSR.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Max Monthly Mortgage Payment (MSR, 30%): SGD ${maxMonthlyMortgageMSR.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Current Monthly Debt Repayment: SGD ${currentTotalMonthlyDebtRepayment.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Remaining Debt Servicing Power (TDSR): SGD ${remainingDebtServicingPower.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `Remaining Mortgage Servicing Power (MSR): SGD ${remainingMortgageServicingPower.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `MAX Additional Loan Monthly Repayment Allowed: SGD ${maxAdditionalMortgageRepayment.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;
    summaryText += `ESTIMATED Max New Loan Amount (30 yr, 3% interest): SGD ${maxNewLoanAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}\n\n`;

    summaryText += `--- Pledge ---\n`;
    summaryText += `Pledge Amount: SGD ${pledgeAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}\n`;

    summaryOutput.textContent = summaryText;
  });
})();
