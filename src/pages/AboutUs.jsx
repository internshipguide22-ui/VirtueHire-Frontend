import React from 'react'
import AboutHeader from '../components/about/AboutHeader'
import AboutMission from '../components/about/AboutMission'
import AboutTeam from '../components/about/AboutTeam'
import AboutValues from '../components/about/AboutValues'
import AboutTimeline from '../components/about/AboutTimeline'
import AboutStats from '../components/about/AboutStats'
import AboutTestimonials from '../components/about/AboutTestimonials'
import AboutPartners from '../components/about/AboutPartners'

const AboutUs = () => {
    return (
        <div className="about-us-page">
            <AboutHeader />
            <AboutMission />
            <AboutStats />
            <AboutValues />
            <AboutTimeline />
            <AboutTeam />
            <AboutPartners />
            <AboutTestimonials />
        </div>
    )
}

export default AboutUs
