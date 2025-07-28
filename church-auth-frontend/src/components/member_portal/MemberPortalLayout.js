import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './MemberPortalLayout.css';

const MemberPortalLayout = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // <-- NEW: State for user dropdown
    const memberName = "Valued Member";
    const dropdownRef = useRef(null); // <-- NEW: Ref to detect clicks outside the dropdown

    const handleLogout = () => {
        console.log('Member logged out');
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    // <-- NEW: Function to toggle the user dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    // <-- NEW: Function to close all menus
    const closeAllMenus = () => {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
    };

    // <-- NEW: useEffect to handle clicks outside the dropdown menu to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        // Add event listener when the dropdown is open
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        // Cleanup the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);


    return (
        <div className="member-portal-layout">
            <header className="member-portal-header">
                <div className="portal-logo">
                    <NavLink to="/portal" onClick={closeAllMenus}>CMS Member Portal</NavLink>
                </div>

                <nav className="member-portal-nav-desktop">
                    <NavLink to="/portal" end>Home</NavLink>
                   
                    <NavLink to="/portal/giving">Giving</NavLink>
                    <NavLink to="/portal/events">Events</NavLink>
                    <NavLink to="/portal/groups">Groups</NavLink>
                    <NavLink to="/portal/serve">Serve</NavLink>
                    <NavLink to="/portal/prayer">Prayer</NavLink>
                    <NavLink to="/portal/resources">Resources</NavLink>
                </nav>

                <div className="member-portal-user-actions">
                    {/* --- REPLACED: Original welcome/logout with new Dropdown --- */}
                    <div className="user-dropdown-container" ref={dropdownRef}>
                        <button className="user-dropdown-toggle" onClick={toggleDropdown}>
                            <span className="user-name-display">{memberName}</span>
                            <i className="fas fa-user-circle user-icon"></i>
                            <i className={`fas fa-chevron-down chevron-icon ${isDropdownOpen ? 'open' : ''}`}></i>
                        </button>

                        {isDropdownOpen && (
                            <div className="user-dropdown-menu">
                                <NavLink to="/portal/profile" onClick={closeAllMenus}>
                                    <i className="fas fa-user-edit"></i> My Profile
                                </NavLink>
                                <button onClick={handleLogout}>
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Mobile hamburger menu toggle remains the same */}
                    <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                        <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                    </button>
                </div>
            </header>

            {isMobileMenuOpen && (
                <nav className="member-portal-nav-mobile">
                    {/* No changes here */}
                    <NavLink to="/portal" end onClick={closeAllMenus}>Home</NavLink>
                    <NavLink to="/portal/profile" onClick={closeAllMenus}>My Profile</NavLink>
                    <NavLink to="/portal/giving" onClick={closeAllMenus}>Giving</NavLink>
                    <NavLink to="/portal/events" onClick={closeAllMenus}>Events</NavLink>
                    <NavLink to="/portal/groups" onClick={closeAllMenus}>Groups</NavLink>
                    <NavLink to="/portal/serve" onClick={closeAllMenus}>Serve</NavLink>
                    <NavLink to="/portal/prayer" onClick={closeAllMenus}>Prayer</NavLink>
                    <NavLink to="/portal/resources" onClick={closeAllMenus}>Resources</NavLink>
                    
                </nav>
            )}

            <main className="member-portal-content">
                <Outlet />
            </main>

            <footer className="member-portal-footer">
                <p>© {new Date().getFullYear()} Church Management Software. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default MemberPortalLayout;