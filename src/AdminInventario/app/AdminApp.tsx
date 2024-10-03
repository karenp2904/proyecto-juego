import * as React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './shared/components/headers/AdminHeader';

interface IAdminAppProps {
}

const AdminApp: React.FunctionComponent<IAdminAppProps> = (props) => {
  return (
    <div className='h-screen bg-secundary flex flex-col'>
      <AdminHeader />
      <div className='flex-1 overflow-hidden'>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminApp;
