import React, { useState } from 'react';
import { CheckCircle, Clock, Users, Shield, Star, ArrowRight, Phone } from 'lucide-react';

const ADHDSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'initial',
      name: 'Initial ADHD Assessment',
      price: 200,
      duration: 'one-time',
      description: 'Comprehensive initial evaluation with psychological testing',
      features: [
        'Comprehensive psychological testing',
        'ADHD diagnostic assessment',
        'Mental health evaluation',
        '90-minute initial consultation',
        'Personalized treatment plan',
        'Medication recommendations if appropriate',
        'Educational resources and materials'
      ],
      popular: true,
      color: 'blue'
    },
    {
      id: 'followup',
      name: 'Follow-Up Appointment',
      price: 80,
      duration: 'per visit',
      description: 'Ongoing ADHD care and medication management',
      features: [
        '30-minute consultation',
        'Medication management & adjustments',
        'Progress monitoring',
        'Prescription refills',
        'Treatment plan updates',
        'Email support between visits',
        'Crisis intervention when needed'
      ],
      popular: false,
      color: 'green'
    }
  ];

  const handleSubscription = async (planId: string) => {
    setIsProcessing(true);
    // In a real app, this would handle payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to contact form or payment system
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };

  const getPlanColor = (color: string) => {
    const colors = {
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        button: 'bg-indigo-600 hover:bg-indigo-700',
        text: 'text-indigo-600'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        button: 'bg-green-600 hover:bg-green-700',
        text: 'text-green-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700',
        text: 'text-purple-600'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="adhd-subscription" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>Specialized Adult ADHD Care</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ADHD Care Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, transparent pricing for comprehensive ADHD care. Pay per appointment with no contracts or hidden fees.
          </p>
        </div>

        {/* Benefits Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600 text-sm">Evening and weekend appointments available</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">ADHD Specialists</h3>
            <p className="text-gray-600 text-sm">Licensed PMHNP focused on ADHD care</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No Commitment</h3>
            <p className="text-gray-600 text-sm">Cancel or change plans anytime</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Direct Access</h3>
            <p className="text-gray-600 text-sm">Contact your provider between visits</p>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {plans.map((plan) => {
            const colors = getPlanColor(plan.color);
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? 'border-green-300 scale-105' : 'border-gray-200'
                } ${colors.border}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`p-8 ${colors.bg} rounded-t-2xl`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.duration}</span>
                  </div>
                  <button
                    onClick={() => handleSubscription(plan.id)}
                    disabled={isProcessing}
                    className={`w-full text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${colors.button} disabled:opacity-50`}
                  >
                    <span>{isProcessing ? 'Processing...' : 'Get Started'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-8">
                  <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className={`w-5 h-5 mt-0.5 ${colors.text}`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your ADHD Care?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Begin with a comprehensive initial assessment, then schedule follow-up appointments as needed. 
            Our ADHD specialist PMHNP is ready to provide personalized care.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+13365697223"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call (336) 569-7223</span>
            </a>
            <a
              href="#contact"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold"
            >
              Schedule Consultation
            </a>
          </div>
        </div>

        {/* Insurance & Payment Info */}
        <div className="mt-12 bg-gray-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-3">Payment & Insurance Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Accepted Insurance:</h5>
              <ul className="space-y-1">
                <li>• Blue Cross Blue Shield NC</li>
                <li>• Aetna</li>
                <li>• United Healthcare</li>
                <li>• Cigna</li>
                <li>• Medicare (select plans)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Payment Options:</h5>
              <ul className="space-y-1">
                <li>• Pay per appointment - no subscriptions</li>
                <li>• Credit card or HSA/FSA accepted</li>
                <li>• No setup fees or contracts</li>
                <li>• Transparent pricing with no hidden costs</li>
                <li>• Flexible scheduling available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ADHDSubscription;