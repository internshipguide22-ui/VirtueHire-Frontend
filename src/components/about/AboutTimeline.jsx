import React from 'react'

const AboutTimeline = () => {
    const milestones = [
        {
            year: "2023",
            title: "Company Founded",
            description: "Virtue Hire was born from a vision to revolutionize the recruitment industry.",
            icon: "fas fa-seedling"
        },
        {
            year: "2023",
            title: "Job Matching Algorithm",
            description: "Launched our first matching algorithm with 50+ partner companies.",
            icon: "fas fa-robot"
        },
        {
            year: "2024",
            title: "Global Expansion",
            description: "Expanded services to 10+ countries and reached 10,000+ successful placements.",
            icon: "fas fa-globe-americas"
        },
        {
            year: "2024",
            title: "Mobile App Release",
            description: "Launched our mobile application for on-the-go recruitment management.",
            icon: "fas fa-mobile-alt"
        },
        {
            year: "2025",
            title: "Enterprise Solutions",
            description: "Introduced enterprise-grade features for Fortune 500 companies.",
            icon: "fas fa-chart-line"
        },
        {
            year: "2025",
            title: "Industry Recognition",
            description: "Awarded 'Best Recruitment Platform' at the Global HR Tech Awards.",
            icon: "fas fa-trophy"
        }
    ]

    return (
        <section style={{
            padding: "80px 0",
            background: "#FFFFFF"
        }} id="about-timeline">
            <div className="container">
                <h2 className="section-title">Our Journey</h2>
                <p className="section-subtitle">
                    Milestones that mark our growth and commitment to innovation in recruitment technology
                </p>

                {/* Timeline Container */}
                <div style={{
                    position: "relative",
                    maxWidth: "1200px",
                    margin: "4rem auto 0"
                }}>
                    {/* Timeline Line */}
                    <div style={{
                        position: "absolute",
                        width: "6px",
                        background: "#4A5FC8",
                        top: "0",
                        bottom: "0",
                        left: "50%",
                        marginLeft: "-3px",
                        borderRadius: "10px"
                    }}></div>

                    {/* Timeline Items */}
                    {milestones.map((milestone, index) => (
                        <div key={index} style={{
                            padding: "10px 40px",
                            position: "relative",
                            width: "50%",
                            boxSizing: "border-box",
                            left: index % 2 === 0 ? "0" : "50%"
                        }}>
                            <div style={{
                                padding: "2rem",
                                background: "white",
                                borderRadius: "15px",
                                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                                position: "relative",
                                transition: "all 0.3s ease"
                            }}>
                                {/* Year Badge - Fixed Positioning */}
                                <div style={{
                                    position: "absolute",
                                    top: "-15px",
                                    background: "#4A5FC8",
                                    color: "white",
                                    padding: "0.5rem 1.5rem",
                                    borderRadius: "25px",
                                    fontWeight: "bold",
                                    fontSize: "1.1rem",
                                    ...(index % 2 === 0 ? { right: "-60px" } : { left: "-60px" })
                                }}>
                                    {milestone.year}
                                </div>

                                {/* Icon */}
                                <div style={{
                                    width: "60px",
                                    height: "60px",
                                    marginBottom: "1rem",
                                    borderRadius: "50%",
                                    background: "#6c7be8",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                    color: "#4A5FC8"
                                }}>
                                    <i className={milestone.icon}></i>
                                </div>

                                <h3 style={{
                                    fontSize: "1.3rem",
                                    marginBottom: "1rem",
                                    color: "#2C3E50"
                                }}>{milestone.title}</h3>

                                <p style={{
                                    color: "#6C757D",
                                    lineHeight: "1.6"
                                }}>{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutTimeline
