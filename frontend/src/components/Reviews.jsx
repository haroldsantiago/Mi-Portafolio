import React, { useState, useEffect } from 'react';
import '../styles/Reviews.css';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        rating: 0,
        comment: ''
    });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000').replace(/\/$/, '');

    // Fetch reviews on component mount
    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`${API_URL}/api/reviews/`);
            const data = await response.json();
            if (response.ok) {
                setReviews(data.reviews || []);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.comment || formData.rating === 0) {
            setMessage({ text: 'Por favor completa todos los campos', type: 'error' });
            return;
        }

        setSubmitting(true);
        setMessage({ text: '', type: '' });

        try {
            const response = await fetch(`${API_URL}/api/reviews/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ text: '¡Gracias por tu reseña!', type: 'success' });
                setFormData({ name: '', rating: 0, comment: '' });
                fetchReviews(); // Refresh reviews list
            } else {
                setMessage({ text: data.error || 'Error al enviar la reseña', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error de conexión. Intenta de nuevo.', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRatingClick = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
    };

    const renderStars = (rating, interactive = false, size = 'medium') => {
        return (
            <div className={`stars ${size}`}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= (interactive ? (hoveredRating || rating) : rating) ? 'filled' : ''}`}
                        onClick={interactive ? () => handleRatingClick(star) : undefined}
                        onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
                        onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
                        style={{ cursor: interactive ? 'pointer' : 'default' }}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <section className="reviews-section" id="reviews">
            <div className="container">
                <h2 className="section-title">Reseñas y Testimonios</h2>
                <p className="section-subtitle">Lo que otros dicen sobre mi trabajo</p>

                {/* Review Form */}
                <div className="review-form-container">
                    <h3>Deja tu Reseña</h3>
                    <form onSubmit={handleSubmit} className="review-form">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Tu nombre"
                                maxLength={100}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Calificación</label>
                            {renderStars(formData.rating, true, 'large')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="comment">Comentario</label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                                placeholder="Comparte tu experiencia..."
                                rows="4"
                                required
                            />
                        </div>

                        {message.text && (
                            <div className={`message ${message.type}`}>
                                {message.text}
                            </div>
                        )}

                        <button type="submit" disabled={submitting} className="submit-btn">
                            {submitting ? 'Enviando...' : 'Enviar Reseña'}
                        </button>
                    </form>
                </div>

                {/* Reviews List */}
                <div className="reviews-list">
                    <h3>Reseñas Recientes</h3>
                    {loading ? (
                        <div className="loading">Cargando reseñas...</div>
                    ) : reviews.length === 0 ? (
                        <div className="no-reviews">
                            <p>Aún no hay reseñas. ¡Sé el primero en dejar una!</p>
                        </div>
                    ) : (
                        <div className="reviews-grid">
                            {reviews.map((review) => (
                                <div key={review.id} className="review-card">
                                    <div className="review-header">
                                        <div className="review-author">
                                            <div className="author-avatar">
                                                {review.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="author-info">
                                                <h4>{review.name}</h4>
                                                <span className="review-date">{formatDate(review.created_at)}</span>
                                            </div>
                                        </div>
                                        {renderStars(review.rating, false, 'small')}
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
