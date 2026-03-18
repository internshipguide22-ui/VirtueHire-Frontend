import React from 'react'

const AboutMission = () => {
    return (
        <section className="about-mission">
            <div className="container">
                <div className="mission-grid">
                    <div className="mission-card">
                        <div className="mission-icon">
                            <i className="fas fa-bullseye"></i>
                        </div>
                        <h3>Our Mission</h3>
                        <p>
                            To democratize hiring by creating transparent, efficient, and fair recruitment processes
                            that benefit both employers and job seekers through cutting-edge technology and data-driven insights.
                        </p>
                    </div>
                    <div className="mission-card">
                        <div className="mission-icon">
                            <i className="fas fa-eye"></i>
                        </div>
                        <h3>Our Vision</h3>
                        <p>
                            A world where every individual finds meaningful work and every organization builds
                            exceptional teams through intelligent, bias-free matching and comprehensive skill assessment.
                        </p>
                    </div>
                    <div className="mission-card">
                        <div className="mission-icon">
                            <i className="fas fa-handshake"></i>
                        </div>
                        <h3>Our Promise</h3>
                        <p>
                            We commit to maintaining the highest standards of integrity, innovation, and user experience
                            while continuously evolving to meet the changing needs of the modern workforce.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutMission
