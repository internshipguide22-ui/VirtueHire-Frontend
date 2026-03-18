import React from 'react';

const CtaSection = ({ scrollToSection }) => {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-content">
                    <h2>Ready to Transform Your Hiring Process?</h2>
                    <p>Join thousands of companies and candidates who have already discovered the power of Virtue Hire.
                        Start your journey today with our free trial.</p>
                    <div className="cta-buttons">
                        <button className="cta-primary" onClick={() => scrollToSection('success-stories')}>
                            <i className="fas fa-rocket"></i>
                            Start Free Trial
                        </button>
                        <a href="#contact" className="cta-secondary">
                            <i className="fas fa-phone"></i>
                            Schedule Demo
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
