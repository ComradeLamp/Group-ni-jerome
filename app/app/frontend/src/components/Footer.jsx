import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-section">
            <h3 className="footer-brand">McLaren Premium Motors</h3>
            <p className="footer-description">
              Your premier destination for new and certified pre-owned McLaren supercars. Experience automotive excellence.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="social-link" aria-label="Youtube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/inventory">View Inventory</Link></li>
              <li><Link to="/financing">Financing</Link></li>
              <li><Link to="/appointment">Schedule Test Drive</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><a href="#">Trade-In</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-links">
              <li><a href="#">New Vehicles</a></li>
              <li><a href="#">Certified Pre-Owned</a></li>
              <li><a href="#">Service & Parts</a></li>
              <li><a href="#">Warranty</a></li>
              <li><a href="#">McLaren Care</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact">
              <li>
                <MapPin className="h-4 w-4" />
                <span>123 Supercar Blvd<br />Beverly Hills, CA 90210</span>
              </li>
              <li>
                <Phone className="h-4 w-4" />
                <span>(310) 555-0100</span>
              </li>
              <li>
                <Mail className="h-4 w-4" />
                <span>sales@mclarendealer.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} McLaren Premium Motors. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span className="legal-divider">•</span>
            <a href="#">Terms of Service</a>
            <span className="legal-divider">•</span>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;