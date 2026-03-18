import React from 'react';

const Process = () => {
    const steps = [
        { number: 1, icon: "fa-user-plus", title: "Sign Up", description: "Create your account and complete your profile with relevant information" },
        { number: 2, icon: "fa-tasks", title: "Take Assessment", description: "Complete skill assessments tailored to your industry and expertise" },
        { number: 3, icon: "fa-search", title: "Get Matched", description: "HR will matches you with the most suitable opportunities" },
        { number: 4, icon: "fa-handshake", title: "Get Hired", description: "Connect with employers and land your dream job or find perfect candidates" }
    ];

    return (
        <section className="process">
            <div className="container">
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">Simple steps to transform your recruitment experience</p>
                <div className="process-grid">
                    {steps.map((step, index) => (
                        <div key={index} className="process-step">
                            <div className="process-number">{step.number}</div>
                            <div className="process-icon">
                                <i className={`fas ${step.icon}`}></i>
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
