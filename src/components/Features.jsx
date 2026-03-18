import React from 'react';

const Features = () => {
    const features = [
        {
            icon: "fa-user-graduate",
            iconClass: "candidate-icon",
            title: "Candidate Portal",
            description: "Register, take comprehensive assessments, and showcase your skills to top employers. Get matched with opportunities that perfectly fit your profile and career aspirations.",
            buttonClass: "btn-candidate",
            buttonText: "Candidate Login/Register"
        },
        {
            icon: "fa-user-tie",
            iconClass: "hr-icon",
            title: "HR Professional",
            description: "Find qualified candidates, submit detailed job descriptions, and streamline your hiring process with our intelligent matching system and advanced filtering options.",
            buttonClass: "btn-hr",
            buttonText: "HR Login/Register"
        },
        {
            icon: "fa-cogs",
            iconClass: "admin-icon",
            title: "Admin Dashboard",
            description: "Manage platform activities, users, assessments, and comprehensive analytics. Ensure smooth operation and continuous improvement with powerful administrative tools.",
            buttonClass: "btn-admin",
            buttonText: "Admin Login"
        }
    ];

    return (
        <section className="features" id="features">
            <div className="container">
                <h2 className="section-title">Platform Features</h2>
                <p className="section-subtitle">Designed to meet the needs of all stakeholders in the recruitment process</p>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className={`feature-icon ${feature.iconClass}`}>
                                <i className={`fas ${feature.icon}`}></i>
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                            <a href="#" className={`feature-btn ${feature.buttonClass}`}>
                                <i className="fas fa-sign-in-alt"></i>
                                {feature.buttonText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
