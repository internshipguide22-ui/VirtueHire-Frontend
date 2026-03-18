import React from 'react'

const ContactInfo = () => {
    const contactMethods = [
        {
            icon: "fas fa-map-marker-alt",
            title: "Visit Our Office",
            details: ["1/10, 7th street, Gandipuram", "Coimbatore, Tamil Nadu 641001"],
            link: "#",
            button: "Get Directions"
        },
        {
            icon: "fas fa-phone",
            title: "Call Us",
            details: ["+91 9876543210", "+91 9123456789"],
            link: "tel:+919876543210",
            button: "Call Now"
        },
        {
            icon: "fas fa-envelope",
            title: "Email Us",
            details: ["info@virtuehire.com", "support@virtuehire.com"],
            link: "mailto:info@virtuehire.com",
            button: "Send Email"
        },
        {
            icon: "fas fa-clock",
            title: "Working Hours",
            details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 1:00 PM", "Sunday: Closed"],
            link: "#",
            button: "View Calendar"
        }
    ]

    return (
        <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We're here to help you find the perfect talent solutions for your business. Choose your preferred method of contact.</p>

            <div className="contact-methods">
                {contactMethods.map((method, index) => (
                    <div key={index} className="contact-method">
                        <div className="method-icon">
                            <i className={method.icon}></i>
                        </div>
                        <div className="method-content">
                            <h3>{method.title}</h3>
                            {method.details.map((detail, detailIndex) => (
                                <p key={detailIndex}>{detail}</p>
                            ))}
                            <a href={method.link} className="method-link">
                                <i className="fas fa-arrow-right"></i>
                                {method.button}
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="social-contact">
                <h3>Follow Us</h3>
                <div className="social-links">
                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo
