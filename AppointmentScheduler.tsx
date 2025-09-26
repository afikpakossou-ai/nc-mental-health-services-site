import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, X } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const AppointmentScheduler = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  // Generate available dates for the next 14 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (0 = Sunday)
      if (date.getDay() !== 0) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          isToday: i === 1
        });
      }
    }
    
    return dates;
  };

  // Generate time slots based on selected date
  const generateTimeSlots = (selectedDate: string): TimeSlot[] => {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();
    const timeSlots: TimeSlot[] = [];
    
    // Different hours for different days
    let startHour = 8;
    let endHour = dayOfWeek === 6 ? 15 : 18; // Saturday ends at 3 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      // Skip lunch hour (12-1 PM)
      if (hour === 12) continue;
      
      ['00', '30'].forEach(minutes => {
        // Simulate some slots being unavailable
        const isAvailable = Math.random() > 0.3;
        
        timeSlots.push({
          time: `${hour.toString().padStart(2, '0')}:${minutes}`,
          available: isAvailable
        });
      });
    }
    
    return timeSlots;
  };

  const services = [
    'Initial ADHD Consultation',
    'Medication Management',
    'Follow-up Appointment',
    'Crisis Intervention',
    'Family Consultation'
  ];

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    setStep(2);
    
    (window as any).gtag?.('event', 'appointment_date_selected', {
      event_category: 'Appointment Booking',
      event_label: date
    });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
    
    (window as any).gtag?.('event', 'appointment_time_selected', {
      event_category: 'Appointment Booking',
      event_label: time
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalData = {
      ...appointmentData,
      date: selectedDate,
      time: selectedTime
    };

    try {
      // In a real app, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Track successful appointment booking
      (window as any).gtag?.('event', 'appointment_booked', {
        event_category: 'Conversion',
        event_label: 'Online Appointment',
        value: 1
      });

      setIsSubmitted(true);
      setStep(4);
    } catch (error) {
      console.error('Appointment booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setIsSubmitted(false);
    setAppointmentData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      notes: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Schedule Appointment</h2>
            <p className="text-blue-100">Book your telepsychiatry consultation</p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > i ? <CheckCircle className="w-5 h-5" /> : i}
                </div>
                {i < 4 && (
                  <div className={`h-1 w-16 mx-2 ${
                    step > i ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Select Date</span>
            <span>Choose Time</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {/* Step 1: Date Selection */}
          {step === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Select a Date
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {generateAvailableDates().map((dateOption) => (
                  <button
                    key={dateOption.date}
                    onClick={() => handleDateSelect(dateOption.date)}
                    className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                  >
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                      {dateOption.display}
                    </div>
                    {dateOption.isToday && (
                      <div className="text-xs text-green-600 font-medium mt-1">Same day available</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Time Selection */}
          {step === 2 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Choose Time
                </h3>
                <button 
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Change Date
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Selected: {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {generateTimeSlots(selectedDate).map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => slot.available && handleTimeSelect(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 border rounded-lg text-center font-medium transition-all ${
                      slot.available 
                        ? 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-900'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                    {!slot.available && (
                      <div className="text-xs mt-1">Booked</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Patient Details */}
          {step === 3 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Your Details
                </h3>
                <button 
                  onClick={() => setStep(2)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Change Time
                </button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Appointment Summary</h4>
                <p className="text-blue-800">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {selectedTime}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={appointmentData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={appointmentData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={appointmentData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(919) 555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type *
                    </label>
                    <select
                      name="service"
                      value={appointmentData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={appointmentData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any specific concerns or questions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
                </button>
              </form>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && isSubmitted && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-4">Appointment Details:</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Service:</strong> {appointmentData.service}</p>
                  <p><strong>Contact:</strong> {appointmentData.phone}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  We'll send you a secure video link 15 minutes before your appointment.
                </p>
                <div className="flex space-x-4 justify-center">
                  <a
                    href="tel:+13365697223"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <Phone className="w-4 h-4" />
                    <span>(336) 569-7223</span>
                  </a>
                  <a
                    href="mailto:info@nctelepsychiatric.com"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact Support</span>
                  </a>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;