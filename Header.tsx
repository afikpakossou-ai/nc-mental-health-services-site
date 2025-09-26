import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, Shield, Clock } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'ADHD Plans', href: '#adhd-subscription' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-blue-800 text-white py-2 px-4 text-center text-sm">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <span>🏠</span>
            <a 
              href="https://www.pinnaclebhw.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 font-medium transition-colors"
            >
              Main Website - Book Appointments
            </a>
          </div>
          <div className="hidden sm:flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>HIPAA Secure Platform</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Same-Day Appointments</span>
          </div>
        </div>
      </div>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">NC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NC Telepsychiatry</h1>
                <p className="text-xs text-gray-600">Expert Mental Health Care</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => (window as any).gtag?.('event', 'navigation_click', {
                    event_category: 'Navigation',
                    event_label: item.label
                  })}
                  className="text-gray-700 hover:text-blue-800 font-medium transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-800 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:+13368282599"
                onClick={() => (window as any).trackPhoneCall?.()}
                className="flex items-center space-x-2 text-blue-800 hover:text-blue-900 font-semibold transition-colors duration-200 group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>(336) 828-2599</span>
              </a>
              <a
                href="#contact"
                onClick={() => (window as any).trackCTAClick?.('Header Schedule')}
                className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors duration-200 font-semibold flex items-center space-x-2 group"
              >
                <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Book Now</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      (window as any).gtag?.('event', 'mobile_navigation_click', {
                        event_category: 'Navigation',
                        event_label: item.label
                      });
                    }}
                    className="text-gray-700 hover:text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    {item.label}
                  </a>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-gray-200">
                  <a
                    href="tel:+13368282599"
                    onClick={() => {
                      setIsMenuOpen(false);
                      (window as any).trackPhoneCall?.();
                    }}
                    className="flex items-center justify-center space-x-2 text-blue-800 hover:text-blue-900 font-semibold py-3 px-4 border-2 border-blue-800 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    <Phone className="w-5 h-5" />
                    <span>(336) 828-2599</span>
                  </a>
                  <a
                    href="#contact"
                    onClick={() => {
                      setIsMenuOpen(false);
                      (window as any).trackCTAClick?.('Mobile Header Schedule');
                    }}
                    className="flex items-center justify-center space-x-2 bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-900 transition-colors duration-200"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Appointment</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;