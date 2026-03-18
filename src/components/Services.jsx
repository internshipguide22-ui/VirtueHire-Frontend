import React from 'react';

const Services = () => {
    const services = [
        {
            icon: "fa-building",
            title: "Enterprise Hiring Solutions",
            description: "Comprehensive recruitment solutions designed for companies of all sizes, from startups to Fortune 500 enterprises.",
            features: [
                "Bulk candidate screening and management",
                "Multi-location recruitment coordination",
                "Integration with existing HR systems",
                "Industry-specific recruitment expertise"
            ]
        },
        {
            icon: "fa-clipboard-check",
            title: "Skill Assessments",
            description: "Comprehensive evaluation tools to measure technical skills, soft skills, and cultural fit.",
            features: [
                "Technical skill evaluations",
                "Behavioral assessments",
                "Industry-specific tests",
                "Custom assessment creation"
            ]
        },
        {
            icon: "fa-chart-line",
            title: "Analytics & Reporting",
            description: "Detailed insights and reports to help you make data-driven recruitment decisions.",
            features: [
                "Performance dashboards",
                "Hiring metrics tracking",
                "Custom report generation",
                "ROI analysis"
            ]
        },
        {
            icon: "fa-users-cog",
            title: "Candidate Management",
            description: "Complete candidate lifecycle management from application to onboarding.",
            features: [
                "Application tracking",
                "Interview scheduling",
                "Communication tools",
                "Onboarding assistance"
            ]
        }
    ];

    return (
        <section className="services">
            <div className="container">
                <h2 className="section-title">Our Services</h2>
                <p className="section-subtitle">Comprehensive recruitment solutions for modern businesses</p>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-icon">
                                <i className={`fas ${service.icon}`}></i>
                            </div>
                            <div className="service-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <ul className="service-features">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
