import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ scrolled, mobileMenuOpen, setMobileMenuOpen, currentView, navigateToHome, navigateToProducts }) => {
    return (
        <nav className={`navbar ${scrolled || currentView === 'details' ? 'scrolled' : ''}`}>
            <div className="nav-logo">
                <a href="#" onClick={(e) => { e.preventDefault(); navigateToHome(); }}>
                    <img src="/honda-logo.svg" alt="Honda Logo" />
                </a>
            </div>

            <ul className="nav-links">
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToProducts(); }}>Products</a></li>
                <li><a href="#service">Service & Parts</a></li>
                <li><a href="#safety">Safety Bangladesh</a></li>
                <li><a href="#yes-award">Y-E-S Award</a></li>
                <li><a href="#about">About Us</a></li>
            </ul>

            <div className="nav-actions">
                <button className="btn-outline">Find a Dealer</button>
                <button className="btn-primary">Book Test Ride</button>
                <button className="mobile-menu-btn" style={{ display: 'none' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X color="#fff" /> : <Menu color="#fff" />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
