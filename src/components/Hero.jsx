import React from 'react';

const Hero = ({ scrollToSection }) => {
    return (
        <section className="hero" id="home">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Connecting Talent with Opportunities</h1>
                        <p>Smart assessments & recruitment platform for candidates, HR professionals, and admins. Streamline
                            your hiring process with AI-powered matching and comprehensive skill evaluations.</p>
                        <button className="cta-btn" onClick={() => scrollToSection('features')}>
                            <i className="fas fa-user-check"></i>
                            Get Started Today
                        </button>
                    </div>
                    <div className="hero-image">
                        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Recruitment Platform" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;    
