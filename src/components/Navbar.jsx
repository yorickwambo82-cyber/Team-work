import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, switchLanguage, t } = useLanguage();

    // Dropdown states
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

    // Refs
    const userDropdownRef = useRef(null);
    const langDropdownRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setIsLangDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="#" onClick={(e) => { e.preventDefault(); toggleSidebar(); }}>
                    <i className="bx bx-menu bx-sm"></i>
                </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                {/* Search */}
                <div className="navbar-nav align-items-center">
                    <div className="nav-item d-flex align-items-center">
                        <i className="bx bx-search fs-4 lh-0"></i>
                        <input
                            type="text"
                            className="form-control border-0 shadow-none"
                            placeholder={t('navbar.search')}
                            aria-label="Search..."
                        />
                    </div>
                </div>
                {/* /Search */}

                <ul className="navbar-nav flex-row align-items-center ms-auto">

                    {/* Theme Switcher */}
                    <li className="nav-item me-2 me-xl-0">
                        <a className="nav-link style-switcher-toggle hide-arrow" href="#" onClick={(e) => { e.preventDefault(); toggleTheme(); }}>
                            {theme === 'light' ? (
                                <i className="bx bx-moon bx-sm"></i>
                            ) : (
                                <i className="bx bx-sun bx-sm"></i>
                            )}
                        </a>
                    </li>

                    {/* Language Switcher */}
                    <li className={`nav-item dropdown-language dropdown me-2 me-xl-0 ${isLangDropdownOpen ? 'show' : ''}`} ref={langDropdownRef}>
                        <a
                            className="nav-link dropdown-toggle hide-arrow"
                            href="#"
                            onClick={(e) => { e.preventDefault(); setIsLangDropdownOpen(!isLangDropdownOpen); }}
                        >
                            <i className="bx bx-globe bx-sm"></i>
                        </a>
                        <ul className={`dropdown-menu dropdown-menu-end ${isLangDropdownOpen ? 'show' : ''}`} data-bs-popper={isLangDropdownOpen ? "static" : ""}>
                            <li>
                                <a
                                    className={`dropdown-item ${language === 'en' ? 'active' : ''}`}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); switchLanguage('en'); setIsLangDropdownOpen(false); }}
                                >
                                    <span className="align-middle">English</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className={`dropdown-item ${language === 'fr' ? 'active' : ''}`}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); switchLanguage('fr'); setIsLangDropdownOpen(false); }}
                                >
                                    <span className="align-middle">Français</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    {/* User */}
                    <li className={`nav-item navbar-dropdown dropdown-user dropdown ${isUserDropdownOpen ? 'show' : ''}`} ref={userDropdownRef}>
                        <a
                            className="nav-link dropdown-toggle hide-arrow"
                            href="#"
                            onClick={(e) => { e.preventDefault(); setIsUserDropdownOpen(!isUserDropdownOpen); }}
                        >
                            <div className="avatar avatar-online">
                                <img src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`} alt className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </a>
                        <ul className={`dropdown-menu dropdown-menu-end ${isUserDropdownOpen ? 'show' : ''}`} data-bs-popper={isUserDropdownOpen ? "static" : ""}>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}&background=random`} alt className="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <span className="fw-semibold d-block">{user?.username}</span>
                                            <small className="text-muted">{user?.role}</small>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); logout(); }}>
                                    <i className="bx bx-power-off me-2"></i>
                                    <span className="align-middle">{t('sidebar.logout')}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    {/* / User */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
