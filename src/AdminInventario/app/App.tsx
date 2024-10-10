import * as React from 'react';
import Header from './shared/components/headers/Header';
import { Outlet } from 'react-router-dom';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div className='h-screen bg-quinary flex flex-col'>
      <Header />
      <div className='flex-1 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
