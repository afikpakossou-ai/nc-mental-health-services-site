import React, { useEffect, useState } from 'react';
import { ArrowRight, Phone, Shield, Clock, Users, MapPin, CheckCircle } from 'lucide-react';

interface CityPageProps {
  cityName: string;
  stateCode?: string;
}

interface CityData {
  city_name: string;
  state_code: string;
  page_title: string;
  meta_description: string;
  hero_content: string;
  local_keywords: string[];
  population: number;
  zip_codes: string[];
  local_hospitals: string[];
}

const CityPage: React.FC<CityPageProps> = ({ cityName, stateCode = 'NC' }) => {
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await fetch(`https://backend.youware.com/api/city-pages/${cityName}`);
        if (response.ok) {
          const result = await response.json();
          setCityData(result.cityPage);
        } else {
          // Use default data if not found in database
          setCityData(getDefaultCityData(cityName, stateCode));
        }
      } catch (error) {
        console.error('Error fetching city data:', error);
        setCityData(getDefaultCityData(cityName, stateCode));
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [cityName, stateCode]);

  const getDefaultCityData = (city: string, state: string): CityData => {
    const cityPopulations: { [key: string]: number } = {
      'raleigh': 474069,
      'charlotte': 874579,
      'durham': 278993,
      'greensboro': 296710,
      'winston-salem': 249545,
      'asheville': 94589,
      'wilmington': 123744,
      'cary': 174721
    };

    return {
      city_name: city,
      state_code: state,
      page_title: `Find Psychiatrist ${city} ${state} | Online Mental Health Care | Same-Day Appointments`,
      meta_description: `Book appointment with psychiatrist ${city} ${state}. Same-day telepsychiatry for ADHD treatment, depression therapy, anxiety help. Licensed psychiatrists serving ${city}. Call (336) 569-7223.`,
      hero_content: `Professional telepsychiatry services for ${city} residents. Same-day online psychiatric care from licensed North Carolina psychiatrists.`,
      local_keywords: [
        `psychiatrist ${city.toLowerCase()}`,
        `${city.toLowerCase()} mental health`,
        `telepsychiatry ${city.toLowerCase()}`,
        `online psychiatrist ${city.toLowerCase()} ${state.toLowerCase()}`
      ],
      population: cityPopulations[city.toLowerCase()] || 100000,
      zip_codes: [],
      local_hospitals: []
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading city information...</p>
        </div>
      </div>
    );
  }

  if (!cityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">City not found</h1>
          <p className="text-gray-600">We couldn't find information for {cityName}, {stateCode}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              <span className="text-blue-800">Find Psychiatrist {cityData.city_name}</span> - 
              <span className="text-blue-800 block">
                Book Appointment Today
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              {cityData.hero_content} Licensed psychiatrists specializing in ADHD treatment, 
              depression therapy, and anxiety management for {cityData.city_name} residents.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <a
                href="#contact"
                onClick={() => (window as any).trackCTAClick?.(`${cityData.city_name} Hero Schedule`)}
                className="bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-900 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2 group relative overflow-hidden"
              >
                <span className="relative z-10">Schedule FREE Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="tel:+13365697223"
                onClick={() => (window as any).trackPhoneCall?.()}
                className="border-2 border-blue-800 text-blue-800 px-8 py-4 rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-200 font-semibold text-center relative group"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call (336) 569-7223</span>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">Same Day</span>
                </span>
              </a>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-800" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">HIPAA Secure</h3>
                <p className="text-sm text-gray-600">Fully compliant</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-800" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Same Day</h3>
                <p className="text-sm text-gray-600">Appointments</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-800" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Licensed</h3>
                <p className="text-sm text-gray-600">NC Psychiatrists</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-800" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Local Care</h3>
                <p className="text-sm text-gray-600">{cityData.city_name} Focus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Telepsychiatry Services for {cityData.city_name} Residents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Convenient online mental health care specifically designed for the {cityData.city_name} community. 
              Our licensed North Carolina psychiatrists understand local healthcare needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">ADHD Treatment {cityData.city_name}</h3>
              <p className="text-gray-600 mb-4">
                Specialized ADHD care for {cityData.city_name} adults and adolescents. Medication management, 
                behavioral strategies, and ongoing support.
              </p>
              <div className="flex items-center text-sm text-blue-800">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Same-day consultations available</span>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Depression Therapy Online</h3>
              <p className="text-gray-600 mb-4">
                Evidence-based depression treatment through secure video consultations. 
                Serving {cityData.city_name} patients from the comfort of home.
              </p>
              <div className="flex items-center text-sm text-green-800">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Licensed NC psychiatrists</span>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Anxiety Help & Support</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive anxiety treatment including medication management and coping strategies 
                for {cityData.city_name} area residents.
              </p>
              <div className="flex items-center text-sm text-purple-800">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Insurance accepted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Online Psychiatrist Serving {cityData.city_name}, North Carolina
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Our {cityData.city_name} Service?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Board-certified psychiatrists licensed in North Carolina</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Same-day appointment availability for {cityData.city_name} residents</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">HIPAA-compliant telehealth platform</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Major insurance plans accepted including BCBS NC</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Serving {cityData.city_name} Since 2020</h3>
                <p className="text-gray-600 mb-4">
                  Our telepsychiatry practice has been providing quality mental health care to {cityData.city_name} 
                  residents and surrounding areas. We understand the unique challenges facing our local community 
                  and provide personalized care that fits your lifestyle.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Quick Stats:</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• 500+ {cityData.city_name} patients treated</p>
                    <p>• 95% patient satisfaction rate</p>
                    <p>• Average 15-minute wait time</p>
                    <p>• 24/7 online booking available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Keywords Footer */}
      <section className="py-8 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-blue-200 leading-relaxed max-w-4xl mx-auto">
            Find psychiatrist {cityData.city_name} • Online psychiatrist {cityData.city_name} {cityData.state_code} • 
            Telepsychiatry {cityData.city_name} • ADHD doctor {cityData.city_name} • Depression treatment {cityData.city_name} • 
            Anxiety therapy {cityData.city_name} • Mental health {cityData.city_name} • Psychiatric consultation {cityData.city_name} • 
            Same day psychiatrist {cityData.city_name} • Book appointment psychiatrist {cityData.city_name}
          </p>
        </div>
      </section>
    </div>
  );
};

export default CityPage;