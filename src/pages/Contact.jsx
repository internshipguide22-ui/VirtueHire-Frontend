import React from 'react'
import ContactHero from '../components/contact/ContactHero'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import ContactMap from '../components/contact/ContactMap'
import ContactFaq from '../components/contact/ContactFaq'
import ContactTeam from '../components/contact/ContactTeam'
import ContactResources from '../components/contact/ContactResources'

const Contact = () => {
    return (
        <div className="contact-page">
            <ContactHero />
            <div className="container">
                <div className="contact-content">
                    <div className="contact-form-section">
                        <ContactForm />
                    </div>
                    <div className="contact-info-section">
                        <ContactInfo />
                        <ContactMap />
                    </div>
                </div>
            </div>
            <ContactTeam />
            <ContactResources />
            <ContactFaq />
        </div>
    )
}

export default Contact
