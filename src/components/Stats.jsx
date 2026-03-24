import React from 'react';

const Stats = () => {
    const stats = [
        { number: "50,000+", text: "Candidates Hired" },
        { number: "2,000+", text: "Companies Registered" },
        { number: "95%", text: "Satisfaction Rate" },
        { number: "30+", text: "Industries Served" }
    ];

    return (
        <section style={{
            backgroundColor: "#4A5FC8",
            padding: "60px 0",
            width: "100%"
        }}>
            
            <div style={{
                textAlign: "center",
                color: "#fff",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 30px"
            }}>
                {/* Header Section */}
                <div style={{ marginBottom: "50px" }}>
                    <h2 style={{
                        color: "#fff",
                        marginBottom: "16px",
                        fontSize: "36px",
                        fontWeight: "700",
                        lineHeight: "1.2"
                    }}>
                        Our Impact
                    </h2>
                    <p style={{
                        color: "#fff",
                        marginBottom: "0",
                        fontSize: "18px",
                        lineHeight: "1.5",
                        maxWidth: "700px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        opacity: "0.9"
                    }}>
                        Join thousands of companies and candidates who have transformed their hiring process with Virtue Hire
                    </p>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "40px",
                    alignItems: "start",
                    justifyItems: "center"
                }}>
                    {stats.map((stat, index) => (
                        <div key={index} style={{
                            textAlign: "center",
                            color: "#fff",
                            padding: "20px 15px"
                        }}>
                            <div style={{
                                fontSize: "42px",
                                fontWeight: "bold",
                                lineHeight: "1.1",
                                marginBottom: "12px",
                                letterSpacing: "0.5px"
                            }}>
                                {stat.number}
                            </div>
                            <div style={{
                                fontSize: "16px",
                                fontWeight: "500",
                                lineHeight: "1.4",
                                opacity: "0.9"
                            }}>
                                {stat.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Spacing at Bottom */}
                <div style={{ marginTop: "30px" }}></div>
            </div>
        </section>
    );
};

export default Stats;
