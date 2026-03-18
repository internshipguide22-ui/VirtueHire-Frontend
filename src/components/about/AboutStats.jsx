import React from 'react'

const AboutStats = () => {
    const stats = [
        { number: "50K+", label: "Successful Placements", icon: "fas fa-user-check" },
        { number: "2K+", label: "Partner Companies", icon: "fas fa-building" },
        { number: "150+", label: "Team Members", icon: "fas fa-users" },
        { number: "4.9/5", label: "Platform Rating", icon: "fas fa-chart-line" }
    ]

    return (
        <section className="about-stats">
            <div className="container">
                <h2 className="section-title">Our Impact in Numbers</h2>
                <p className="section-subtitle">
                    Real results that demonstrate our commitment to transforming the recruitment landscape
                </p>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-icon">
                                <i className={stat.icon}></i>
                            </div>
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutStats
