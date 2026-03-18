import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            rating: 5,
            content: "Virtue Hire completely transformed our hiring process! The assessment quality is exceptional and the AI matching saved us countless hours. I landed my dream job in just 2 weeks!",
            author: "JS",
            name: "John Smith",
            position: "Software Engineer at TechCorp"
        },
        {
            rating: 5,
            content: "As an HR manager, Virtue Hire has cut our hiring time by 40%. The candidate matching is incredibly accurate and the analytics help us make better decisions.",
            author: "MJ",
            name: "Maria Johnson",
            position: "HR Director at Global Solutions"
        },
        {
            rating: 5,
            content: "The admin dashboard gives me complete visibility into platform performance. It's intuitive, powerful, and the support team is fantastic.",
            author: "RW",
            name: "Robert Williams",
            position: "Platform Administrator"
        }
    ];

    return (
        <section className="testimonials" id="testimonials">
            <div className="container">
                <h2 className="section-title">What Our Users Say</h2>
                <p className="section-subtitle">Hear from candidates and companies who have found success with Virtue Hire</p>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-rating">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <i key={i} className="fas fa-star star"></i>
                                ))}
                            </div>
                            <div className="testimonial-content">
                                "{testimonial.content}"
                            </div>
                            <div className="testimonial-author">
                                <div className="author-avatar">{testimonial.author}</div>
                                <div className="author-info">
                                    <h4>{testimonial.name}</h4>
                                    <p>{testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
