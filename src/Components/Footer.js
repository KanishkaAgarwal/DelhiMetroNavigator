import React from 'react';
import './Footer.css';
import logo from './logo2.jpeg';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-bottom">
        <div className="company-info">
          <div className="logo">
            <img src={logo} alt="logo" className="logo-icon" />
            <h3 style={{color:'white'}}>Delhi Metro Navigator</h3>
          </div>
        </div>

        <div className="copyright">
            <p>Copyright © 2020 Landify UI Kit.</p>
            <p>All rights reserved</p>
        </div>
        <div className="social-links">
            <img src="https://dashboard.codeparrot.ai/api/image/Z-_eoOGYgKEKiAnc/social-i.png" alt="social" className="social-icon" />
            <img src="https://dashboard.codeparrot.ai/api/image/Z-_eoOGYgKEKiAnc/social-i-2.png" alt="social" className="social-icon" />
            <img src="https://dashboard.codeparrot.ai/api/image/Z-_eoOGYgKEKiAnc/social-i-3.png" alt="social" className="social-icon" />
            <img src="https://dashboard.codeparrot.ai/api/image/Z-_eoOGYgKEKiAnc/social-i-4.png" alt="social" className="social-icon" />
        </div>

        <div className="footer-links">
          <div className="newsletter">
            <h3>Stay up to date</h3>
            <div className="email-input">
              <input type="email" placeholder="Your email address" />
              <img src="https://dashboard.codeparrot.ai/api/image/Z-_eoOGYgKEKiAnc/essentia.png" alt="send" className="send-icon" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  heading: "Pellentesque suscipit fringilla libero eu.",
  demoButtonText: "Get a Demo",
  companyName: "Nexcent",
  copyrightText: "Copyright © 2020 Landify UI Kit.",
  allRightsReservedText: "All rights reserved",
  companyLinks: ["About us", "Blog", "Contact us", "Pricing", "Testimonials"],
  supportLinks: ["Help center", "Terms of service", "Legal", "Privacy policy", "Status"],
  newsletterText: "Stay up to date",
  emailPlaceholder: "Your email address"
};

export default Footer;