import React from 'react';
import { useSalary } from '../context/SalaryContext';

const SalaryDetails = () => {
  const { calculateSalary, basicSalary } = useSalary();
  const salaryDetails = calculateSalary();

  if (!salaryDetails || !basicSalary) {
    return (
      <div className="w-full h-full bg-white rounded-lg border border-neutral-200 p-6">
        <div className="text-black text-xl font-bold mb-4">Your salary</div>
        <div className="text-red-500">Please enter your basic salary to calculate.</div>
      </div>
    );
  }

  const {
    totalEarnings,
    grossEarnings,
    grossDeductions,
    employeeEPF,
    employerEPF,
    employerETF,
    APIT,
    netSalary,
    ctc
  } = salaryDetails;

  return (
    <div className="w-full h-full bg-white rounded-lg border border-neutral-200 p-6">
      <div className="text-black text-xl font-bold mb-4">Your salary</div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span>Basic Salary</span>
          <span>{basicSalary}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Earnings</span>
          <span>{totalEarnings}</span>
        </div>
        <div className="flex justify-between">
          <span>Gross Earnings</span>
          <span>{grossEarnings}</span>
        </div>
        <div className="flex justify-between">
          <span>Gross Deduction</span>
          <span>-{grossDeductions}</span>
        </div>
        <div className="flex justify-between">
          <span>Employee EPF (8%)</span>
          <span>-{employeeEPF}</span>
        </div>
        <div className="flex justify-between">
          <span>APIT</span>
          <span>-{APIT}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Net Salary (Take Home)</span>
          <span>{netSalary}</span>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex justify-between">
            <span>Employer EPF (12%)</span>
            <span>{employerEPF}</span>
          </div>
          <div className="flex justify-between">
            <span>Employer ETF (3%)</span>
            <span>{employerETF}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>CTC (Cost to Company)</span>
            <span>{ctc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryDetails;
