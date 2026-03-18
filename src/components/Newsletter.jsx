import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubscribed(true);
            setEmail('');

            // Reset after 2 seconds
            setTimeout(() => {
                setIsSubscribed(false);
            }, 2000);
        }, 1000);
    };

    return (
        <section className="newsletter">
            <div className="container">
                <h2>Stay Updated</h2>
                <p>Subscribe to our newsletter for the latest updates, tips, and industry insights</p>
                <form className="newsletter-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="newsletter-input"
                        placeholder="Enter your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting || isSubscribed}
                    />
                    <button type="submit" className="newsletter-btn" disabled={isSubmitting || isSubscribed}>
                        <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : isSubscribed ? 'fa-check' : 'fa-paper-plane'}`}></i>
                        {isSubmitting ? 'Subscribing...' : isSubscribed ? 'Subscribed!' : 'Subscribe'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
