import React from 'react';
import { CheckCircle, Award, Shield, Clock } from 'lucide-react';

const About = () => {
  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Same Day Appointments',
      description: 'Quick access to psychiatrists online - no waiting weeks for appointments.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'HIPAA Secure Platform',
      description: 'Receive confidential mental health care through our secure telehealth system.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Licensed NC Psychiatrists',
      description: 'Board-certified psychiatrists specializing in ADHD, depression, and anxiety treatment.'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Insurance Accepted',
      description: 'We accept major insurance plans including BCBS NC, Aetna, United Healthcare, Cigna.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'NC Patients Served' },
    { number: '95%', label: 'Patient Satisfaction' },
    { number: '24/7', label: 'Online Booking' },
    { number: '15min', label: 'Average Wait Time' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Why Choose Our North Carolina Telepsychiatry Services?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Access board-certified psychiatrists online for ADHD treatment, depression therapy, 
                and anxiety help. Same-day psychiatric consultations available across North Carolina. 
                Book appointment online or call (336) 569-7223.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
              <a
                href="#contact"
                onClick={() => (window as any).trackCTAClick?.('About Schedule')}
                className="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold text-center"
              >
                Schedule Consultation
              </a>
              <a
                href="tel:+13365697223"
                onClick={() => (window as any).trackPhoneCall?.()}
                className="border-2 border-blue-800 text-blue-800 px-8 py-3 rounded-lg hover:bg-blue-800 hover:text-white transition-colors font-semibold text-center"
              >
                Call (336) 569-7223
              </a>
            </div>
          </div>

          {/* Stats & Image */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800"
                alt="Psychiatrist providing online telepsychiatry consultation"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="font-semibold text-lg">Professional Care</h4>
                <p className="text-blue-100">From licensed psychiatrists</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Secure Telehealth Technology for Mental Health Care
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-800" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">HIPAA Compliant</h4>
              <p className="text-gray-600">End-to-end encryption ensures your mental health information stays private and secure.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-800" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Easy to Use</h4>
              <p className="text-gray-600">Simple video platform works on any device - smartphone, tablet, or computer.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-800" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">High Quality</h4>
              <p className="text-gray-600">HD video and crystal-clear audio for professional psychiatric consultations.</p>
            </div>
          </div>
        </div>

        {/* Local SEO Content */}
        <div className="mt-16 p-8 bg-blue-50 rounded-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Find Psychiatrist Online North Carolina - Serving Your Local Area
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our telepsychiatry services connect you with board-certified psychiatrists licensed in North Carolina. 
            Whether you're searching for "psychiatrist near me" in Raleigh, Charlotte, Durham, or anywhere in NC, 
            our online platform provides immediate access to mental health professionals specializing in ADHD treatment, 
            depression therapy, anxiety management, and comprehensive psychiatric care.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Primary Service Areas:</h4>
              <p>Raleigh telepsychiatry • Charlotte online psychiatrist • Durham mental health • Greensboro ADHD treatment • Winston-Salem psychiatric care • Asheville telepsychiatry • Wilmington online therapy</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Specialty Services:</h4>
              <p>ADHD medication management • Depression treatment online • Anxiety therapy telehealth • Psychiatric evaluation virtual • Mental health consultation NC • Same day psychiatrist appointment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;