import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function MainLayout() {
    return (
        <>
            <NavBar />
            <div>
                {/* Aquí se renderizan los componentes según la ruta */}
                <Outlet />
            </div>
        </>
    );
}