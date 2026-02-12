import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import './DashboardLayout.css';

const DashboardLayout = () => {
    // We don't need state for sidebar visibility if we use the template's class-based approach
    // But we might want to track it for overlay rendering if we don't rely fully on main.js

    const location = useLocation();

    // Close sidebar on route change (mobile)
    useEffect(() => {
        document.documentElement.classList.remove('layout-menu-expanded');
    }, [location]);

    const toggleSidebar = () => {
        document.documentElement.classList.toggle('layout-menu-expanded');
    };

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

                <Sidebar toggleSidebar={toggleSidebar} />

                <div className="layout-page">
                    <Navbar toggleSidebar={toggleSidebar} />

                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <Outlet />
                        </div>

                        <div className="content-backdrop fade"></div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile - usage of template class layout-overlay */}
            <div
                className="layout-overlay layout-menu-toggle"
                onClick={() => document.documentElement.classList.remove('layout-menu-expanded')}
            ></div>
        </div>
    );
};

export default DashboardLayout;
