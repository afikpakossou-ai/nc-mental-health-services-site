import React from 'react';
import { Video, Calendar, FileText, Heart, Brain, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Telepsychiatry Consultations',
      description: 'Comprehensive psychiatric evaluations and follow-up appointments via secure video conferencing.',
      features: ['Initial consultations', 'Medication management', 'Follow-up visits', 'Crisis interventions']
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Mental Health Treatment',
      description: 'Evidence-based treatment for depression, anxiety, ADHD, and other mental health conditions.',
      features: ['Depression care', 'Anxiety treatment', 'ADHD management', 'Mood disorders']
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Medication Management',
      description: 'Expert medication evaluation, monitoring, and adjustment for optimal mental health outcomes.',
      features: ['Prescription management', 'Side effect monitoring', 'Dosage adjustments', 'Drug interactions']
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Wellness Support',
      description: 'Holistic approach to mental wellness including lifestyle counseling and coping strategies.',
      features: ['Stress management', 'Sleep hygiene', 'Lifestyle counseling', 'Coping strategies']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Family Consultations',
      description: 'Family-centered care including consultations with loved ones when appropriate.',
      features: ['Family sessions', 'Caregiver support', 'Treatment planning', 'Educational resources']
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Flexible Scheduling',
      description: 'Convenient appointment times including evenings and weekends to fit your schedule.',
      features: ['Same-day appointments', 'Evening hours', 'Weekend availability', 'Urgent consultations']
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Online Psychiatrist Services - Book Appointment North Carolina
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Board-certified psychiatrists providing evidence-based mental health treatment 
            through secure telehealth technology. Same-day appointments available for 
            ADHD, depression, anxiety, and psychiatric medication management across NC.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 group-hover:bg-blue-800 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-800 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Service Highlight - Complete Mental Health Services */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 border border-blue-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2">
              <span>🩺</span>
              <span>Complete Mental Health Services</span>
            </h3>
            <p className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">
              For detailed provider information, insurance details, and same-day appointment booking:
            </p>
            <a
              href="https://www.pinnaclebhw.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-900 transition-colors font-bold text-lg group mb-6"
            >
              <span>Visit Pinnacle Behavioral Health - North Carolina's Premier Mental Health Practice</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Insurance and Payment Info */}
        <div className="mt-8 bg-blue-800 text-white rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Insurance & Payment</h3>
            <p className="text-blue-100 mb-6 text-lg">
              We accept most major insurance plans and offer self-pay options for uninsured patients.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-semibold">Most Insurance Plans</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-semibold">Self-Pay Options</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-semibold">Medicare Accepted</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-semibold">Medicaid Accepted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;