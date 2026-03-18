import React from 'react';

const WhyChoose = () => {
    const benefits = [
        {
            icon: "fa-check-double",
            title: "Accurate Assessments",
            description: "Scientifically validated assessment tools ensure fair and accurate evaluation of all candidates, reducing bias and improving hiring quality."
        },
        {
            icon: "fa-users",
            title: "Smart Hiring",
            description: "Efficient hiring tools help HR teams filter and select the right candidates quickly, reducing time-to-hire by up to 60%."
        },
        {
            icon: "fa-sliders-h",
            title: "Complete Control",
            description: "Centralized administrative control with comprehensive analytics, reporting tools, and platform customization options."
        }
    ];

    return (
        <section className="why-choose" id="why-choose">
            <div className="container">
                <h2 className="section-title">Why Choose Virtue Hire?</h2>
                <p className="section-subtitle">Our platform offers unique advantages for all users in the recruitment ecosystem</p>
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <div className="benefit-icon">
                                <i className={`fas ${benefit.icon}`}></i>
                            </div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;
