import React, { useState } from "react";
import StepProfile from "./steps/StepProfile";
import StepSalesProceeds from "./steps/StepSalesProceeds";
import StepPurchasePower from "./steps/StepPurchasePower";
import StepPledge from "./steps/StepPledge";
import Summary from "./steps/Summary";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    owners: [
      {
        age: "",
        propertyValuation: "",
        outstandingLoan: "",
        cpfUtilized: "",
        cpfAccrued: "",
        cpfOA: "",
        monthlyIncome: "",
        cashAvailable: "",
      }
    ],
    salePrice: "",
    agentCommission: 2,
    miscFees: "",
    currentLoans: [],
    carLoan: "",
    monthlyIncome: "",
    pledgeAmount: "",
    purchasePower: "",
  });

  // Navigation functions
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Handler for input change
  const handleChange = (key, value, ownerIdx = null) => {
    if (ownerIdx !== null) {
      const updatedOwners = [...formData.owners];
      updatedOwners[ownerIdx][key] = value;
      setFormData({ ...formData, owners: updatedOwners });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  // Handler for adding an owner
  const addOwner = () => {
    setFormData({
      ...formData,
      owners: [
        ...formData.owners,
        {
          age: "",
          propertyValuation: "",
          outstandingLoan: "",
          cpfUtilized: "",
          cpfAccrued: "",
          cpfOA: "",
          monthlyIncome: "",
          cashAvailable: "",
        }
      ]
    });
  };

  switch (step) {
    case 1:
      return <StepProfile
        values={formData}
        handleChange={handleChange}
        addOwner={addOwner}
        nextStep={nextStep}
      />;
    case 2:
      return <StepSalesProceeds
        values={formData}
        handleChange={handleChange}
        prevStep={prevStep}
        nextStep={nextStep}
      />;
    case 3:
      return <StepPurchasePower
        values={formData}
        handleChange={handleChange}
        prevStep={prevStep}
        nextStep={nextStep}
      />;
    case 4:
      return <StepPledge
        values={formData}
        handleChange={handleChange}
        prevStep={prevStep}
        nextStep={nextStep}
      />;
    case 5:
      return <Summary
        values={formData}
        prevStep={prevStep}
      />;
    default:
      return <StepProfile
        values={formData}
        handleChange={handleChange}
        addOwner={addOwner}
        nextStep={nextStep}
      />;
  }
};

export default MultiStepForm;
