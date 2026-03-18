import React, { useState } from 'react'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        consent: false
    })

    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log('Form submitted:', formData)
        setSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
            setSubmitted(false)
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                subject: '',
                message: '',
                consent: false
            })
        }, 3000)
    }

    if (submitted) {
        return (
            <div className="contact-form">
                <div className="success-message">
                    <i className="fas fa-check-circle"></i>
                    <h2>Thank You!</h2>
                    <p>We've received your message and will get back to you within 1 business day.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="contact-form">
            <h2>Send us a Message</h2>
            <p className="form-description">
                Fill out the form below and our team will get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="demo">Request a Demo</option>
                        <option value="pricing">Pricing Information</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="careers">Careers</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your recruitment challenges and how we can help..."
                        required
                    ></textarea>
                </div>

                <div className="form-group consent">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            required
                        />
                        <span className="checkmark"></span>
                        I agree to receive communications from Virtue Hire regarding my inquiry.
                    </label>
                </div>

                <button type="submit" className="submit-btn">
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                </button>
            </form>
        </div>
    )
}

export default ContactForm
