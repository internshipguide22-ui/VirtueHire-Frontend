import React from 'react';

const SuccessStories = () => {
    const stories = [
        {
            company: "TechCorp Solutions",
            metric: "87%",
            period: "faster hiring",
            features: [
                "Reduced hiring time from 8 weeks to 1 week",
                "Improved candidate quality by 60%",
                "Saved $150K annually in recruitment costs",
                "Increased retention rate to 95%",
                "Eliminated bias in hiring process"
            ],
            buttonText: "Read Full Story",
            featured: false
        },
        {
            company: "Global Healthcare Inc.",
            metric: "200+",
            period: "positions filled",
            features: [
                "Scaled team from 50 to 500 employees",
                "Maintained 98% candidate satisfaction",
                "Expanded to 12 international locations",
                "Achieved diversity goals across all levels",
                "Streamlined compliance requirements",
                "Built talent pipeline for future needs"
            ],
            buttonText: "View Case Study",
            featured: true
        },
        {
            company: "StartupX Ventures",
            metric: "10x",
            period: "growth achieved",
            features: [
                "Hired 50+ engineers in 3 months",
                "Found perfect culture-fit candidates",
                "Reduced interview-to-offer time by 75%",
                "Built remote-first distributed team",
                "Secured Series B funding with strong team"
            ],
            buttonText: "Learn More",
            featured: false
        }
    ];

    return (
        <section className="pricing" id="success-stories">
            <div className="container">
                <h2 className="section-title">Success Stories</h2>
                <p className="section-subtitle">Real results from companies and candidates who transformed their hiring experience with Virtue Hire</p>
                <div className="pricing-grid">
                    {stories.map((story, index) => (
                        <div key={index} className={`pricing-card ${story.featured ? 'featured' : ''}`}>
                            <div className="pricing-header">
                                <h3>{story.company}</h3>
                                <div className="pricing-price">{story.metric}</div>
                                <div className="pricing-period">{story.period}</div>
                            </div>
                            <ul className="pricing-features">
                                {story.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>{feature}</li>
                                ))}
                            </ul>
                            <button className="pricing-btn">{story.buttonText}</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
