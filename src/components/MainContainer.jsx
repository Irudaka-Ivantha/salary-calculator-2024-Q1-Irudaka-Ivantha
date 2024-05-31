import React from 'react';
import Background from './Background';
import Button from './Button';
import Section from './Section';
import SalaryDetails from './SalaryDetails';

const MainContainer = () => {
  return (
    <div className="w-full h-full flex justify-center items-start p-10 bg-white gap-10">
      <div className="relative w-[680px] h-[616px]">
        <Background />
        <Button />
        <Section />
      </div>
      <div className="w-[480px] h-[616px]">
        <SalaryDetails />
      </div>
    </div>
  );
};

export default MainContainer;
