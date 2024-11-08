import React, { useState } from 'react';

const testimonialsData = [
  {
    review: "Along bypass Kiambu rd, enjoy the best cool service of Cafe, tea is Worth, waiters r Cool, snacks prepared well.",
    name: "kamariki kirima ",
    rating: 4,
  },
  {
    review: "Best food of my life",
    name: "clarence henry",
    rating: 5,
  },
  {
    review: "Good wheelchair accessibility. best atmosphere.",
    name: "henry",
    rating: 5,
  },
  // Add more reviews as needed
];

const Testimonials: React.FC = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(0);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the review submission logic here
    alert(`Review submitted: ${userReview} with a rating of ${userRating} stars`);
    setUserReview('');
    setUserRating(0);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-[#e8ac07] to-white text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Customer Reviews</h2>

        <div className="flex overflow-x-auto space-x-4 py-4">
          {testimonialsData.map((testimonial, index) => (
            <div key={index} className="min-w-[300px] bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic">"{testimonial.review}"</p>
              <p className="text-right mt-4">- {testimonial.name}</p>
            </div>
          ))}
        </div>

        {showReviewForm ? (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-center mb-4">Your Opinion Matters to Us!</h3>
            <form onSubmit={handleReviewSubmit} className="flex flex-col items-center">
              <span className="text-lg text-gray-800 mb-2">How would you rate your experience?</span>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-8 h-8 cursor-pointer ${i < userRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => setUserRating(i + 1)}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <textarea
                rows={3}
                className="p-4 text-gray-500 border border-gray-300 rounded-xl resize-none mb-4 w-full"
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Leave a message, if you want"
              />
              <button className="py-3 my-2 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">
                Rate now
              </button>
            </form>
            <div className="flex items-center justify-center">
              <button className="text-gray-600" onClick={() => setShowReviewForm(false)}>Maybe later</button>
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center">
            <button className="text-lg text-blue-500" onClick={() => setShowReviewForm(true)}>Leave a Review</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
