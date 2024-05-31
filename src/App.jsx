import React from 'react';
import MainContainer from './components/MainContainer';
import { SalaryProvider } from './context/SalaryContext';

const App = () => {
  return (
    <SalaryProvider>
      <MainContainer />
    </SalaryProvider>
  );
};

export default App;
