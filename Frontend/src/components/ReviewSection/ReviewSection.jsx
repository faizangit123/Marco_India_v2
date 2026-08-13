import { useState } from 'react';
import { Star, Send, User, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './ReviewSection.css';

const StarRating = ({ rating, onRate, interactive = false, size = 18 }) => (
  <div className="review-stars">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type={interactive ? 'button' : undefined}
        className={`review-stars__star ${star <= rating ? 'review-stars__star--filled' : ''} ${interactive ? 'review-stars__star--interactive' : ''}`}
        onClick={interactive ? () => onRate(star) : undefined}
        disabled={!interactive}
        aria-label={`${star} star${star > 1 ? 's' : ''}`}
      >
        <Star size={size} />
      </button>
    ))}
  </div>
);

const MOCK_REVIEWS = [];

const ReviewSection = ({ serviceSlug, serviceTitle }) => {
  const { isAuthenticated, user } = useAuth();
  const [reviews] = useState(MOCK_REVIEWS);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }
    if (reviewText.trim().length < 10) {
      setError('Please write at least 10 characters.');
      return;
    }
    if (reviewText.trim().length > 500) {
      setError('Review must be under 500 characters.');
      return;
    }

    // TODO: POST to /api/reviews/ when backend is ready
    // await apiClient.post('/api/reviews/', {
    //   service: serviceSlug,
    //   rating,
    //   text: reviewText.trim(),
    // });

    setSubmitted(true);
    setRating(0);
    setReviewText('');
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="sp__block">
      <h2 className="sp__block-title">
        <MessageSquare size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8 }} />
        Reviews & Ratings
      </h2>

      {/* Summary */}
      {reviews.length > 0 ? (
        <div className="review-summary">
          <div className="review-summary__score">
            <span className="review-summary__avg">{avgRating}</span>
            <StarRating rating={Math.round(Number(avgRating))} size={16} />
            <span className="review-summary__count">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      ) : (
        <p className="review-empty">No reviews yet. Be the first to share your experience!</p>
      )}

      {/* Review Form */}
      {isAuthenticated ? (
        submitted ? (
          <div className="review-success">
            <Star size={20} />
            <div>
              <strong>Thank you for your review!</strong>
              <p>Your feedback will appear once approved.</p>
            </div>
          </div>
        ) : (
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="review-form__rating">
              <label>Your Rating</label>
              <StarRating rating={rating} onRate={setRating} interactive size={24} />
            </div>
            <div className="review-form__field">
              <label htmlFor={`review-${serviceSlug}`}>Your Review</label>
              <textarea
                id={`review-${serviceSlug}`}
                className="review-form__textarea"
                placeholder={`Share your experience with our ${serviceTitle} service...`}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                maxLength={500}
              />
              <span className="review-form__count">{reviewText.length}/500</span>
            </div>
            {error && <p className="review-form__error">{error}</p>}
            <button type="submit" className="review-form__submit">
              <Send size={16} /> Submit Review
            </button>
          </form>
        )
      ) : (
        <div className="review-login-prompt">
          <User size={18} />
          <p><Link to="/login">Log in</Link> to leave a review for this service.</p>
        </div>
      )}

      {/* Review List */}
      {reviews.length > 0 && (
        <div className="review-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-card__header">
                <div className="review-card__avatar">
                  {review.user_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <strong className="review-card__name">{review.user_name}</strong>
                  <span className="review-card__date">
                    {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <StarRating rating={review.rating} size={14} />
              </div>
              <p className="review-card__text">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
