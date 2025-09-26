import React from 'react';
import { Phone, Mail, MapPin, Shield, Award, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">
              Pinnacle Behavioral Health
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Professional telepsychiatry services across North Carolina. 
              Providing quality mental health care from the comfort of your home.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services & Partners */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Telepsychiatry Consultations</li>
              <li className="text-gray-300">Medication Management</li>
              <li className="text-gray-300">Mental Health Treatment</li>
              <li className="text-gray-300">Crisis Interventions</li>
              <li className="text-gray-300">Family Consultations</li>
            </ul>
            <div className="pt-2">
              <p className="text-xs text-gray-400 mb-2">Partner Practice:</p>
              <a 
                href="https://www.pinnaclebhw.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                title="Pinnacle Behavioral Health and Wellness - Partner telepsychiatry practice serving NC"
              >
                Pinnacle Behavioral Health & Wellness
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:+13368282599" className="text-gray-300 hover:text-blue-400 transition-colors">
                  (336) 828-2599
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:info@nctelepsychiatric.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                  info@nctelepsychiatric.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Serving North Carolina</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
            <p className="text-gray-300 max-w-4xl mx-auto">
              <strong>Serving the following North Carolina cities:</strong> Raleigh, Charlotte, Durham, 
              Greensboro, Winston-Salem, Asheville, Wilmington, Cary, Chapel Hill, Greenville, 
              Morrisville, Holly Springs, Knightdale, Garner, Apex, and surrounding areas.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Pinnacle Behavioral Health and Wellness. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-center md:text-left">
              <div>
                📞 <a href="tel:336-828-2599" className="text-blue-400 hover:text-blue-300 transition-colors">336-828-2599</a> |
                <a href="https://www.pinnaclebhw.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors ml-2">
                  Complete Services & Booking
                </a>
              </div>
              <div>
                <strong className="text-gray-300">North Carolina Mental Health Services:</strong>{' '}
                <a href="https://www.pinnaclebhw.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                  ADHD, Depression, Anxiety Treatment
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <strong>Medical Disclaimer:</strong> This website is for informational purposes only and 
            does not constitute medical advice. Always consult with qualified healthcare professionals 
            for medical diagnosis and treatment. In case of medical emergency, call 911 immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;