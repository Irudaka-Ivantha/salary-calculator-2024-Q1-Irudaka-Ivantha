import React from 'react';
import { useSalary } from '../context/SalaryContext';
import SectionItem from './SectionItem';

const Section = () => {
  const {
    basicSalary,
    allowances,
    deductions,
    handleAddAllowance,
    handleAddDeduction,
    handleDeleteAllowance,
    handleDeleteDeduction,
    handleReset,
    setBasicSalary,
    setAllowances,
    setDeductions,
    calculateSalary,
  } = useSalary();

  const handleBasicSalaryChange = (e) => {
    setBasicSalary(parseFloat(e.target.value));
  };

  const handleAllowanceChange = (id, title, amount, isEpfEtf) => {
    setAllowances(prevAllowances =>
      prevAllowances.map(allowance =>
        allowance.id === id ? { ...allowance, title, amount, isEpfEtf } : allowance
      )
    );
  };

  const handleDeductionChange = (id, title, amount, isEpfEtf) => {
    setDeductions(prevDeductions =>
      prevDeductions.map(deduction =>
        deduction.id === id ? { ...deduction, title, amount, isEpfEtf } : deduction
      )
    );
  };

  return (
    <div className="relative z-10 w-full p-6 bg-neutral-50 rounded-lg border border-neutral-200">
      <h2 className="text-2xl font-semibold mb-4">Calculate Your Salary</h2>
      <div className="mb-4">
        <label htmlFor="basicSalary" className="text-base font-semibold">Basic Salary</label>
        <input
          type="number"
          id="basicSalary"
          className="w-full px-4 py-2 bg-white rounded border border-neutral-200 text-base"
          value={basicSalary}
          onChange={handleBasicSalaryChange}
          placeholder="Enter basic salary"
        />
      </div>

      <div className="mb-4">
        <div className="text-black text-base font-semibold">Earnings</div>
        <div className="text-neutral-500 text-xs">
          Allowance, Fixed Allowance, Bonus and etc.
        </div>
        {allowances.map((allowance) => (
          <SectionItem
            key={allowance.id}
            id={allowance.id}
            title={allowance.title}
            amount={allowance.amount}
            isEpfEtf={allowance.isEpfEtf}
            onChange={handleAllowanceChange}
            onDelete={handleDeleteAllowance}
          />
        ))}
        <button type="button" className="text-blue-500 mt-2" onClick={handleAddAllowance}>
          + Add New Allowance
        </button>
      </div>

      <div className="mt-6 mb-4">
        <div className="text-black text-base font-semibold">Deductions</div>
        <div className="text-neutral-500 text-xs">
          Salary Advances, Loan Deductions and all
        </div>
        {deductions.map((deduction) => (
          <SectionItem
            key={deduction.id}
            id={deduction.id}
            title={deduction.title}
            amount={deduction.amount}
            isEpfEtf={deduction.isEpfEtf}
            onChange={handleDeductionChange}
            onDelete={handleDeleteDeduction}
          />
        ))}
        <button type="button" className="text-blue-500 mt-2" onClick={handleAddDeduction}>
          + Add New Deduction
        </button>
      </div>

      <button type="button" className="absolute top-4 right-4 text-blue-700 text-sm font-medium" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Section;
