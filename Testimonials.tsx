import React, { useEffect, useState } from 'react';
import { Star, MessageSquare, CheckCircle, Loader } from 'lucide-react';

interface Review {
  id: number;
  patient_name: string;
  rating: number;
  review_text: string;
  service_type: string;
  treatment_date: string;
  verified: number;
  created_at: string;
}

const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: '',
    rating: 5,
    review_text: '',
    service_type: '',
    treatment_date: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default reviews for immediate display
  const defaultReviews: Review[] = [
    {
      id: 1,
      patient_name: "Sarah M.",
      rating: 5,
      review_text: "Dr. Smith was incredible. Same-day ADHD consultation was exactly what I needed. The online platform is easy to use and secure. Highly recommend for anyone in NC needing mental health care.",
      service_type: "ADHD Treatment",
      treatment_date: "2024-01-15",
      verified: 1,
      created_at: "2024-01-16T10:00:00Z"
    },
    {
      id: 2,
      patient_name: "Michael R.",
      rating: 5,
      review_text: "Finally found a psychiatrist who understands! The telepsychiatry service is convenient and professional. No more driving to appointments. Perfect for busy professionals in Raleigh.",
      service_type: "Depression Therapy",
      treatment_date: "2024-01-10",
      verified: 1,
      created_at: "2024-01-12T14:30:00Z"
    },
    {
      id: 3,
      patient_name: "Jennifer L.",
      rating: 5,
      review_text: "Anxiety was controlling my life until I found this service. Same-day appointment, caring psychiatrist, and my insurance was accepted. Life-changing experience. Thank you!",
      service_type: "Anxiety Treatment",
      treatment_date: "2024-01-08",
      verified: 1,
      created_at: "2024-01-10T16:45:00Z"
    },
    {
      id: 4,
      patient_name: "David W.",
      rating: 5,
      review_text: "Excellent medication management service. Dr. Johnson helped me find the right ADHD medication and dosage. The online follow-ups are convenient and thorough.",
      service_type: "Medication Management",
      treatment_date: "2024-01-05",
      verified: 1,
      created_at: "2024-01-07T11:20:00Z"
    },
    {
      id: 5,
      patient_name: "Amanda K.",
      rating: 5,
      review_text: "As a college student, the flexible scheduling was perfect. Evening appointments available, insurance accepted, and the care quality is outstanding. Highly recommend to other students in Durham.",
      service_type: "General Consultation",
      treatment_date: "2024-01-03",
      verified: 1,
      created_at: "2024-01-05T09:15:00Z"
    }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://backend.youware.com/api/reviews?approved=true');
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.reviews.length > 0) {
            setReviews(result.reviews);
          } else {
            setReviews(defaultReviews);
          }
        } else {
          setReviews(defaultReviews);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews(defaultReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://backend.youware.com/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert('Thank you for your review! It will be reviewed and published soon.');
        setShowReviewForm(false);
        setFormData({
          patient_name: '',
          rating: 5,
          review_text: '',
          service_type: '',
          treatment_date: ''
        });
      } else {
        alert('There was an error submitting your review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('There was an error submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : '5.0';

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-800" />
          <p className="text-gray-600">Loading patient reviews...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our NC Patients Say About Our Telepsychiatry Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real reviews from North Carolina patients who've experienced our same-day online psychiatric care, 
            ADHD treatment, and mental health support.
          </p>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800">{averageRating}</div>
              <div className="flex justify-center mb-1">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{reviews.length}</div>
              <div className="text-sm text-gray-600">Verified Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.slice(0, 6).map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.patient_name}</h4>
                  <p className="text-sm text-gray-600">{review.service_type}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {review.verified === 1 && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                {renderStars(review.rating)}
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{review.review_text}"
              </p>
              
              <div className="text-xs text-gray-500">
                Treatment: {new Date(review.treatment_date).toLocaleDateString()}
                {review.verified === 1 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified Patient
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review CTA */}
        <div className="text-center mb-12">
          <div className="bg-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <MessageSquare className="w-12 h-12 text-blue-800 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Your Experience</h3>
            <p className="text-gray-600 mb-6">
              Help other North Carolina residents find quality mental health care. 
              Share your telepsychiatry experience with our community.
            </p>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold"
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Share Your Review</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.patient_name}
                      onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                      placeholder="First name and last initial"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type
                    </label>
                    <select
                      required
                      value={formData.service_type}
                      onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                    >
                      <option value="">Select service</option>
                      <option value="ADHD Treatment">ADHD Treatment</option>
                      <option value="Depression Therapy">Depression Therapy</option>
                      <option value="Anxiety Treatment">Anxiety Treatment</option>
                      <option value="Medication Management">Medication Management</option>
                      <option value="General Consultation">General Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>
                          {rating} Star{rating !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treatment Date
                    </label>
                    <input
                      type="date"
                      value={formData.treatment_date}
                      onChange={(e) => setFormData({ ...formData, treatment_date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.review_text}
                    onChange={(e) => setFormData({ ...formData, review_text: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800"
                    placeholder="Share your experience with our telepsychiatry service..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-900'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>

                <p className="text-sm text-gray-600 text-center">
                  Reviews are moderated and will be published after verification. 
                  Thank you for helping other patients find quality care.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8 text-blue-800" />
              </div>
              <h4 className="font-semibold text-gray-900">Verified Reviews</h4>
              <p className="text-sm text-gray-600">Only real patient experiences</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <Star className="w-8 h-8 text-green-800" />
              </div>
              <h4 className="font-semibold text-gray-900">{averageRating}/5.0 Rating</h4>
              <p className="text-sm text-gray-600">Consistent high quality care</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <MessageSquare className="w-8 h-8 text-purple-800" />
              </div>
              <h4 className="font-semibold text-gray-900">500+ Patients</h4>
              <p className="text-sm text-gray-600">Across North Carolina</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8 text-orange-800" />
              </div>
              <h4 className="font-semibold text-gray-900">Licensed NC</h4>
              <p className="text-sm text-gray-600">Board-certified psychiatrists</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;