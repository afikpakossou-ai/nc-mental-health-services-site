import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    insurance_provider: '',
    preferred_contact: 'email',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Track form submission analytics
      if (typeof window !== 'undefined' && (window as any).trackFormSubmission) {
        (window as any).trackFormSubmission('Contact Form');
      }

      // Get UTM parameters for lead tracking
      const urlParams = new URLSearchParams(window.location.search);
      const leadData = {
        ...formData,
        source: 'website_contact_form',
        utm_campaign: urlParams.get('utm_campaign'),
        utm_medium: urlParams.get('utm_medium'),
        utm_source: urlParams.get('utm_source')
      };

      const response = await fetch('https://backend.youware.com/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service_type: '',
          insurance_provider: '',
          preferred_contact: 'email',
          message: ''
        });

        // Track successful conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            event_category: 'Lead Generation',
            event_label: 'Contact Form Submission',
            value: 1
          });
        }
      } else {
        console.error('Form submission error:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Schedule Your Telepsychiatry Consultation - North Carolina
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book appointment with licensed psychiatrists online. Same-day ADHD consultations available. 
            Secure telehealth platform serving patients across North Carolina.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Appointment Online</h3>
              <p className="text-gray-600">Fill out the form below and we'll contact you within 24 hours to schedule your consultation.</p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800">Thank you! We'll contact you within 24 hours to schedule your consultation.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800">There was an error submitting your request. Please try again or call us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    placeholder="(919) 555-0123"
                  />
                </div>
                <div>
                  <label htmlFor="preferred_contact" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    id="preferred_contact"
                    name="preferred_contact"
                    value={formData.preferred_contact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                    <option value="text">Text Message</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="adhd_treatment">ADHD Treatment</option>
                    <option value="depression_therapy">Depression Therapy</option>
                    <option value="anxiety_treatment">Anxiety Treatment</option>
                    <option value="medication_management">Medication Management</option>
                    <option value="general_consultation">General Consultation</option>
                    <option value="crisis_intervention">Crisis Intervention</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="insurance_provider" className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Provider
                  </label>
                  <select
                    id="insurance_provider"
                    name="insurance_provider"
                    value={formData.insurance_provider}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  >
                    <option value="">Select your insurance</option>
                    <option value="bcbs_nc">Blue Cross Blue Shield NC</option>
                    <option value="aetna">Aetna</option>
                    <option value="united_healthcare">United Healthcare</option>
                    <option value="cigna">Cigna</option>
                    <option value="medicare">Medicare</option>
                    <option value="medicaid">Medicaid</option>
                    <option value="self_pay">Self-Pay</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                  placeholder="Tell us about your concerns, preferred appointment times, or any questions you have..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-800 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-blue-900 transform hover:scale-105'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Schedule Free Consultation'}
              </button>

              <p className="text-sm text-gray-600 text-center">
                By submitting this form, you agree to be contacted regarding your mental health needs. 
                All information is kept confidential and HIPAA compliant.
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Get Started Today */}
            <div className="bg-blue-800 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="text-lg font-semibold">Call:</p>
                    <a
                      href="tel:+13368282599"
                      onClick={() => (window as any).trackPhoneCall?.()}
                      className="text-xl hover:text-blue-200 transition-colors"
                    >
                      (336) 828-2599
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <p className="text-lg font-semibold mb-1">Website:</p>
                    <a
                      href="https://www.pinnaclebhw.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-blue-100 transition-colors underline"
                    >
                      www.pinnaclebhw.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <a
                      href="https://www.pinnaclebhw.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-blue-200 hover:text-blue-100 transition-colors underline"
                    >
                      Book Same-Day Appointments Online
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Information */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-red-900 mb-2">Crisis or Emergency</h4>
                  <p className="text-red-800 mb-4">
                    If you're experiencing a mental health emergency, don't wait for an appointment.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span className="font-medium">Call 911 for immediate emergency</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span>988 Suicide & Crisis Lifeline</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-red-600" />
                      <span>Crisis Text Line: Text HOME to 741741</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Highlight */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <span>🩺</span>
                <span>Complete Mental Health Services</span>
              </h3>
              <p className="text-gray-600 mb-4">
                For detailed provider information, insurance details, and same-day appointment booking:
              </p>
              <a
                href="https://www.pinnaclebhw.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold mb-6 group"
              >
                <span>Visit Pinnacle Behavioral Health - North Carolina's Premier Mental Health Practice</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Our Service?</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Licensed NC Psychiatrists</p>
                    <p className="text-sm text-gray-600">Board-certified mental health professionals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">HIPAA Secure Platform</p>
                    <p className="text-sm text-gray-600">Your privacy is completely protected</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Insurance Accepted</p>
                    <p className="text-sm text-gray-600">Most major insurance plans covered</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Flexible Scheduling</p>
                    <p className="text-sm text-gray-600">Evening and weekend appointments available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className="bg-green-50 rounded-2xl p-8">
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Serving North Carolina</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Online psychiatrist services available to patients throughout North Carolina including:
                  </p>
                  <div className="text-sm text-gray-700">
                    <p>Raleigh • Charlotte • Durham • Greensboro • Winston-Salem • Asheville • Wilmington • Cary • Chapel Hill • Greenville • Fayetteville • High Point • Concord • Gastonia • Rocky Mount</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;