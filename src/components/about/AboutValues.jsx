import React from 'react'

const AboutValues = () => {
    const values = [
        {
            icon: "fas fa-shield-alt",
            title: "Integrity First",
            description: "We believe in transparent, honest practices that build trust with our users and partners."
        },
        {
            icon: "fas fa-lightbulb",
            title: "Innovation Driven",
            description: "Constantly pushing boundaries with AI and machine learning to improve recruitment outcomes."
        },
        {
            icon: "fas fa-heart",
            title: "User Centric",
            description: "Every feature and decision is made with our users' needs and experiences at the forefront."
        },
        {
            icon: "fas fa-random",
            title: "Diversity & Inclusion",
            description: "Committed to creating equal opportunities and reducing bias in the hiring process."
        },
        {
            icon: "fas fa-rocket",
            title: "Excellence",
            description: "Striving for the highest quality in everything we do, from code to customer service."
        },
        {
            icon: "fas fa-hands-helping",
            title: "Collaboration",
            description: "Working together with employers, candidates, and partners to achieve shared success."
        }
    ]

    return (
        <section className="about-values">
            <div className="container">
                <h2 className="section-title">Our Core Values</h2>
                <p className="section-subtitle">
                    The principles that guide our decisions, shape our culture, and drive our success
                </p>
                <div className="values-grid">
                    {values.map((value, index) => (
                        <div key={index} className="value-card">
                            <div className="value-icon">
                                <i className={value.icon}></i>
                            </div>
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutValues
