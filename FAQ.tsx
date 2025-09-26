import React, { useState } from 'react';
import { Plus, Minus, Phone, Shield, Clock, Video } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'What is telepsychiatry and how does it work?',
      answer: 'Telepsychiatry is the delivery of psychiatric care through secure video technology. You connect with a licensed psychiatrist via a HIPAA-compliant video platform from your home, office, or any private location. The consultation includes the same comprehensive evaluation and treatment you would receive in person, including medication management and follow-up care.',
      category: 'Getting Started'
    },
    {
      id: '2',
      question: 'Is telepsychiatry as effective as in-person care?',
      answer: 'Yes, research shows telepsychiatry is equally effective as in-person psychiatric care for most mental health conditions. Studies demonstrate similar outcomes for depression, anxiety, ADHD, and other conditions. Our board-certified psychiatrists provide the same quality care remotely, with the added convenience of accessing treatment from your preferred location.',
      category: 'Effectiveness'
    },
    {
      id: '3',
      question: 'What technology do I need for a telepsychiatry appointment?',
      answer: 'You need a device with a camera and microphone (smartphone, tablet, or computer), a stable internet connection, and a private space for your appointment. We use a simple, secure platform that works on most devices without downloading special software. We\'ll provide technical support to ensure you\'re ready for your first appointment.',
      category: 'Technical'
    },
    {
      id: '4',
      question: 'What mental health conditions can be treated through telepsychiatry?',
      answer: 'We treat a wide range of mental health conditions including depression, anxiety disorders, ADHD, bipolar disorder, PTSD, OCD, panic disorders, and many others. Our psychiatrists can also provide medication management, crisis interventions, and ongoing psychiatric care. We\'ll assess your specific needs during your initial consultation.',
      category: 'Conditions'
    },
    {
      id: '5',
      question: 'How do I schedule a same-day appointment?',
      answer: 'Call us at (919) 582-7272 to check same-day availability. We often have openings for urgent consultations and new patient appointments. You can also use our online contact form, and we\'ll call you back within a few hours to schedule your appointment. Emergency situations should call 911 or go to the nearest emergency room.',
      category: 'Scheduling'
    },
    {
      id: '6',
      question: 'Is my information secure during telepsychiatry sessions?',
      answer: 'Absolutely. We use HIPAA-compliant video platforms with end-to-end encryption to protect your privacy. All sessions are conducted on secure servers, and no recordings are made without your explicit consent. Your personal health information is protected with the same security standards as traditional in-person care.',
      category: 'Privacy'
    },
    {
      id: '7',
      question: 'Does insurance cover telepsychiatry services?',
      answer: 'Most major insurance plans, including Medicare and Medicaid, cover telepsychiatry services at the same rate as in-person care. We accept most insurance plans and will verify your coverage before your appointment. We also offer self-pay options for those without insurance or who prefer not to use insurance.',
      category: 'Insurance'
    },
    {
      id: '8',
      question: 'Can you prescribe medication through telepsychiatry?',
      answer: 'Yes, our licensed psychiatrists can prescribe medication during telepsychiatry appointments. We can initiate new medications, adjust dosages, and provide ongoing medication management. Prescriptions are sent directly to your preferred pharmacy. We follow all state and federal regulations for prescribing psychiatric medications.',
      category: 'Medication'
    },
    {
      id: '9',
      question: 'What happens during my first telepsychiatry appointment?',
      answer: 'Your first appointment is a comprehensive psychiatric evaluation lasting 45-60 minutes. We\'ll discuss your symptoms, medical history, current medications, and treatment goals. Based on this assessment, we\'ll develop a personalized treatment plan which may include medication, therapy recommendations, or lifestyle modifications.',
      category: 'First Visit'
    },
    {
      id: '10',
      question: 'Are there any limitations to telepsychiatry care?',
      answer: 'While telepsychiatry is effective for most mental health conditions, some situations may require in-person care, such as certain medical emergencies or complex cases requiring physical examination. We\'ll always discuss the best approach for your specific needs and can refer you to local resources when appropriate.',
      category: 'Limitations'
    },
    {
      id: '11',
      question: 'How long are follow-up appointments?',
      answer: 'Follow-up appointments typically last 15-30 minutes and focus on medication management, symptom monitoring, and treatment adjustments. The frequency depends on your individual needs - some patients need weekly visits initially, while others may have monthly check-ins once stable.',
      category: 'Follow-up'
    },
    {
      id: '12',
      question: 'What if I have a mental health crisis outside of business hours?',
      answer: 'For mental health emergencies, call 911 or go to your nearest emergency room immediately. You can also contact the National Suicide Prevention Lifeline at 988 or the Crisis Text Line by texting HOME to 741741. We provide crisis support during business hours and can help connect you with local emergency resources.',
      category: 'Crisis'
    }
  ];

  const categories = ['All', 'Getting Started', 'Technical', 'Insurance', 'Medication', 'Privacy', 'Crisis'];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Common questions about telepsychiatry services, online mental health care, 
            and what to expect from your virtual psychiatric appointments.
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <Phone className="w-6 h-6 text-blue-800 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">Same-Day Available</h3>
            <p className="text-xs text-gray-600">Call (919) 582-7272</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <Shield className="w-6 h-6 text-green-800 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">HIPAA Secure</h3>
            <p className="text-xs text-gray-600">Fully encrypted</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <Clock className="w-6 h-6 text-purple-800 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">Flexible Hours</h3>
            <p className="text-xs text-gray-600">Evening & weekends</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <Video className="w-6 h-6 text-red-800 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm">Easy Technology</h3>
            <p className="text-xs text-gray-600">No software needed</p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  {openItems.includes(item.id) ? (
                    <Minus className="w-5 h-5 text-gray-500" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openItems.includes(item.id) && (
                <div className="px-6 pb-4">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-blue-800 text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-blue-100 mb-6 text-lg">
            Our team is here to help you understand how telepsychiatry can work for your mental health needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+19195827272"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-800 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call (919) 582-7272
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-800 transition-colors duration-200"
            >
              Send a Message
            </a>
          </div>
        </div>
      </div>

      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default FAQ;