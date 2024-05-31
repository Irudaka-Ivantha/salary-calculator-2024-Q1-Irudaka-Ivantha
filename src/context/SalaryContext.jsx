import React, { createContext, useContext, useState } from 'react';

const SalaryContext = createContext();

export const useSalary = () => useContext(SalaryContext);

export const SalaryProvider = ({ children }) => {
  const [allowances, setAllowances] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [basicSalary, setBasicSalary] = useState('');

  const handleAddAllowance = () => {
    setAllowances([...allowances, { id: Date.now(), title: '', amount: 0, isEpfEtf: false }]);
  };

  const handleAddDeduction = () => {
    setDeductions([...deductions, { id: Date.now(), title: '', amount: 0, isEpfEtf: false }]);
  };

  const handleDeleteAllowance = (id) => {
    setAllowances(allowances.filter(allowance => allowance.id !== id));
  };

  const handleDeleteDeduction = (id) => {
    setDeductions(deductions.filter(deduction => deduction.id !== id));
  };

  const handleReset = () => {
    setAllowances([]);
    setDeductions([]);
    setBasicSalary('');
  };

  const calculateSalary = () => {
    if (!basicSalary) {
      return null; 
    }

   
    const numericBasicSalary = parseFloat(basicSalary);

  
    const totalEarnings = numericBasicSalary + allowances.reduce((sum, allowance) => sum + parseFloat(allowance.amount || 0), 0);

    
    const totalEarningsForEPF = numericBasicSalary + allowances
      .filter(allowance => allowance.isEpfEtf)
      .reduce((sum, allowance) => sum + parseFloat(allowance.amount || 0), 0);

    
    const grossDeductions = deductions.reduce((sum, deduction) => sum + parseFloat(deduction.amount || 0), 0);

    
    const grossEarnings = totalEarnings - grossDeductions;

  
    const grossSalaryForEPF = totalEarningsForEPF - grossDeductions;

    
    const employeeEPF = (grossSalaryForEPF * 0.08).toFixed(2);

    
    const employerEPF = (grossSalaryForEPF * 0.12).toFixed(2);

    
    const employerETF = (grossSalaryForEPF * 0.03).toFixed(2);

    
    let APIT = 0;

    if (grossEarnings > 308333) {
        APIT = grossEarnings * 0.36 - 73500;
    } else if (grossEarnings > 266667) {
        APIT = grossEarnings * 0.30 - 55000;
    } else if (grossEarnings > 225000) {
        APIT = grossEarnings * 0.24 - 39000;
    } else if (grossEarnings > 183333) {
        APIT = grossEarnings * 0.18 - 25500;
    } else if (grossEarnings > 141667) {
        APIT = grossEarnings * 0.12 - 14500;
    } else if (grossEarnings > 100000) {
        APIT = grossEarnings * 0.06 - 6000;
    }

 
    const netSalary = (grossEarnings - parseFloat(employeeEPF) - APIT).toFixed(2);

   
    const ctc = (grossEarnings + parseFloat(employerEPF) + parseFloat(employerETF)).toFixed(2);

    return {
      totalEarnings: totalEarnings.toFixed(2),
      grossEarnings: grossEarnings.toFixed(2),
      grossDeductions: grossDeductions.toFixed(2),
      employeeEPF,
      employerEPF,
      employerETF,
      APIT,
      netSalary,
      ctc,
    };
  };

  return (
    <SalaryContext.Provider
      value={{
        allowances,
        deductions,
        basicSalary,
        setBasicSalary,
        handleAddAllowance,
        handleAddDeduction,
        handleDeleteAllowance,
        handleDeleteDeduction,
        handleReset,
        calculateSalary
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};
