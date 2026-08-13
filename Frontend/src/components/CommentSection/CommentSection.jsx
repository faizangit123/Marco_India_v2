import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, Loader, AlertCircle, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiClient from '../../api/client';
import './CommentSection.css';

const CommentSection = ({ pageSlug }) => {
  const { isAuthenticated, user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const { data } = await apiClient.get(`/api/comments/?page=${pageSlug}`);
        setComments(Array.isArray(data) ? data : data.results || []);
      } catch {
        setError('Unable to load comments.');
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [pageSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setPosting(true);
    setPostError('');
    try {
      const { data } = await apiClient.post('/api/comments/', {
        page: pageSlug,
        text: text.trim(),
      });
      setComments((prev) => [data, ...prev]);
      setText('');
    } catch (err) {
      setPostError(err.response?.data?.detail || 'Failed to post comment.');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="comments">
      <h3 className="comments__title">
        <MessageSquare size={20} />
        Comments {comments.length > 0 && <span className="comments__count">{comments.length}</span>}
      </h3>

      {/* Post form */}
      {isAuthenticated ? (
        <form className="comments__form" onSubmit={handleSubmit}>
          <div className="comments__form-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="comments__form-body">
            <textarea
              className="comments__textarea"
              placeholder="Share your thoughts..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={1000}
              rows={3}
            />
            {postError && (
              <div className="comments__post-error">
                <AlertCircle size={14} /> {postError}
              </div>
            )}
            <button type="submit" className="comments__submit" disabled={posting || !text.trim()}>
              {posting ? <Loader size={14} className="auth-form__spinner" /> : <><Send size={14} /> Post</>}
            </button>
          </div>
        </form>
      ) : (
        <div className="comments__login-prompt">
          <Link to="/login" className="auth-card__link">Sign in</Link> to leave a comment.
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="comments__loading"><Loader size={18} className="auth-form__spinner" /> Loading comments...</div>
      ) : error ? (
        <div className="comments__error">{error}</div>
      ) : comments.length === 0 ? (
        <div className="comments__empty">No comments yet. Be the first to share your thoughts!</div>
      ) : (
        <div className="comments__list">
          {comments.map((c) => (
            <div key={c.id} className="comments__item">
              <div className="comments__item-avatar">
                <UserIcon size={16} />
              </div>
              <div className="comments__item-body">
                <div className="comments__item-header">
                  <strong>{c.user_name || c.author || 'User'}</strong>
                  <span>{c.created_at ? new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
                </div>
                <p className="comments__item-text">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
