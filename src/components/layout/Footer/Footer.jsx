import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import './Footer.css'; // Let's use a separate CSS or add it to index.css

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">

                        {/* Column 1: Brand & Contact */}
                        <div className="footer-col brand-col">
                            <img src="/honda-logo.svg" alt="Honda Logo" className="footer-logo" />
                            <p className="footer-desc">
                                Bangladesh Honda Private Limited (BHL) operates with a commitment to providing high-quality products and services, aiming to establish Honda as the number one motorcycle brand in Bangladesh.
                            </p>

                            <div className="contact-info">
                                <div className="contact-item">
                                    <MapPin size={18} className="contact-icon" />
                                    <span>Abdul Monem Economic Zone, Char Baushia, Gazaria, Munshiganj, Bangladesh</span>
                                </div>
                                <div className="contact-item">
                                    <Phone size={18} className="contact-icon" />
                                    <span>08000430430 (Toll Free)</span>
                                </div>
                                <div className="contact-item">
                                    <Mail size={18} className="contact-icon" />
                                    <span>info@bdhonda.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Motorcycles */}
                        <div className="footer-col links-col">
                            <h4 className="footer-heading">Motorcycles</h4>
                            <ul className="footer-links">
                                <li><a href="#"><ArrowRight size={14} /> CBR150R</a></li>
                                <li><a href="#"><ArrowRight size={14} /> Hornet 160R</a></li>
                                <li><a href="#"><ArrowRight size={14} /> XBlade 160 ABS</a></li>
                                <li><a href="#"><ArrowRight size={14} /> Livo 110</a></li>
                                <li><a href="#"><ArrowRight size={14} /> Dream 110</a></li>
                                <li><a href="#"><ArrowRight size={14} /> SP125</a></li>
                                <li><a href="#"><ArrowRight size={14} /> Dio</a></li>
                            </ul>
                        </div>

                        {/* Column 3: Quick Links */}
                        <div className="footer-col links-col">
                            <h4 className="footer-heading">Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href="#"><ArrowRight size={14} /> Find a Dealer</a></li>
                                <li><a href="#"><ArrowRight size={14} /> Book a Test Ride</a></li>
                                <li><a href="#"><ArrowRight size={14} /> Service & Parts</a></li>
                                <li><a href="#"><ArrowRight size={14} /> Safety Bangladesh</a></li>
                                <li><a href="#"><ArrowRight size={14} /> Y-E-S Award</a></li>
                            </ul>
                        </div>

                        {/* Column 4: Newsletter & Social */}
                        <div className="footer-col subscribe-col">
                            <h4 className="footer-heading">Stay Connected</h4>
                            <p className="subscribe-desc">Subscribe to our newsletter for the latest updates and offers.</p>
                            <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
                                <input type="email" placeholder="Your Email Address" required />
                                <button type="submit" className="btn-primary">Subscribe</button>
                            </form>

                            <div className="social-links-wrapper">
                                <h5 className="social-heading">Follow Us</h5>
                                <div className="social-links">
                                    <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
                                    <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
                                    <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
                                    <a href="#" className="social-icon" aria-label="Youtube"><Youtube size={20} /></a>
                                    <a href="#" className="social-icon" aria-label="Linkedin"><Linkedin size={20} /></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-inner">
                        <p className="copyright">&copy; {new Date().getFullYear()} Bangladesh Honda Private Limited. All Rights Reserved.</p>
                        <ul className="legal-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
