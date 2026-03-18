import React from 'react';

const Footer = () => {
    const footerStyles = {
        footer: {
            backgroundColor: '#2c3e50',
            color: '#ecf0f1',
            padding: '0',
            marginTop: 'auto',
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '40px 20px 20px',
        },
        footerContent: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '30px',
        },
        footerSection: {
            display: 'flex',
            flexDirection: 'column',
        },
        companyTitle: {
            color: '#3498db',
            marginBottom: '15px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
        },
        companyDescription: {
            lineHeight: '1.6',
            marginBottom: '20px',
            color: '#bdc3c7',
        },
        socialLinks: {
            display: 'flex',
            gap: '15px',
        },
        socialIcon: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            backgroundColor: '#34495e',
            borderRadius: '50%',
            color: '#ecf0f1',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
        },
        sectionTitle: {
            color: '#3498db',
            marginBottom: '20px',
            fontSize: '1.2rem',
            fontWeight: '600',
        },
        linksList: {
            listStyle: 'none',
            padding: '0',
            margin: '0',
        },
        linkItem: {
            marginBottom: '12px',
        },
        link: {
            color: '#bdc3c7',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'color 0.3s ease',
        },
        icon: {
            width: '16px',
            color: '#3498db',
        },
        footerBottom: {
            borderTop: '1px solid #34495e',
            paddingTop: '20px',
            textAlign: 'center',
        },
        copyright: {
            color: '#95a5a6',
            marginBottom: '10px',
        },
        policyLinks: {
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap',
        },
        policyLink: {
            color: '#bdc3c7',
            textDecoration: 'none',
            fontSize: '0.9rem',
        },
    };

    // Dynamic hover effects
    const socialIconHover = {
        backgroundColor: '#3498db',
        transform: 'translateY(-2px)',
    };

    const linkHover = {
        color: '#3498db',
    };

    return (
        <footer style={footerStyles.footer}>
            <div style={footerStyles.container}>
                <div style={footerStyles.footerContent}>
                    {/* Company Information Section */}
                    <div style={footerStyles.footerSection}>
                        <h3 style={footerStyles.companyTitle}>Virtue Hire</h3>
                        <p style={footerStyles.companyDescription}>
                            "Connecting talent with opportunities through smart assessments and HR-driven recruitment solutions. Empower your hiring process today."
                        </p>
                        <div style={footerStyles.socialLinks}>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                style={footerStyles.socialIcon}
                                onMouseEnter={(e) => Object.assign(e.target.style, socialIconHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, footerStyles.socialIcon)}
                            >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                style={footerStyles.socialIcon}
                                onMouseEnter={(e) => Object.assign(e.target.style, socialIconHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, footerStyles.socialIcon)}
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                href="#"
                                aria-label="Facebook"
                                style={footerStyles.socialIcon}
                                onMouseEnter={(e) => Object.assign(e.target.style, socialIconHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, footerStyles.socialIcon)}
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                href="#"
                                aria-label="Instagram"
                                style={footerStyles.socialIcon}
                                onMouseEnter={(e) => Object.assign(e.target.style, socialIconHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, footerStyles.socialIcon)}
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a
                                href="#"
                                aria-label="YouTube"
                                style={footerStyles.socialIcon}
                                onMouseEnter={(e) => Object.assign(e.target.style, socialIconHover)}
                                onMouseLeave={(e) => Object.assign(e.target.style, footerStyles.socialIcon)}
                            >
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div style={footerStyles.footerSection}>
                        <h3 style={footerStyles.sectionTitle}>Quick Links</h3>
                        <ul style={footerStyles.linksList}>
                            <li style={footerStyles.linkItem}>
                                <a
                                    href="#home"
                                    style={footerStyles.link}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.link, color: '#bdc3c7' })}
                                >
                                    Home
                                </a>
                            </li>
                            <li style={footerStyles.linkItem}>
                                <a
                                    href="#why-choose"
                                    style={footerStyles.link}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.link, color: '#bdc3c7' })}
                                >
                                    About
                                </a>
                            </li>
                            <li style={footerStyles.linkItem}>
                                <a
                                    href="#features"
                                    style={footerStyles.link}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.link, color: '#bdc3c7' })}
                                >
                                    Features
                                </a>
                            </li>
                            <li style={footerStyles.linkItem}>
                                <a
                                    href="#contact"
                                    style={footerStyles.link}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.link, color: '#bdc3c7' })}
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information Section */}
                    <div style={footerStyles.footerSection}>
                        <h3 style={footerStyles.sectionTitle}>Contact Us</h3>
                        <ul style={footerStyles.linksList}>
                            <li style={footerStyles.linkItem}>
                                <a
                                    href="#"
                                    style={footerStyles.link}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.link, color: '#bdc3c7' })}
                                >
                                    <i className="fas fa-map-marker-alt" style={footerStyles.icon}></i>
                                    1/10, 7th street, Gandipuram, Coimbatore
                                </a>
                            </li>
                            <li style={footerStyles.linkItem}>
                                <a
                                    href="tel:+919876543210"
                                    style={footerStyles.link}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.link, color: '#bdc3c7' })}
                                >
                                    <i className="fas fa-phone" style={footerStyles.icon}></i>
                                    +91 9876543210
                                </a>
                            </li>
                            <li style={footerStyles.linkItem}>
                                <a
                                    href="mailto:info@virtuehire.com"
                                    style={footerStyles.link}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.link, color: '#bdc3c7' })}
                                >
                                    <i className="fas fa-envelope" style={footerStyles.icon}></i>
                                    info@virtuehire.com
                                </a>
                            </li>
                            <li style={footerStyles.linkItem}>
                                <a
                                    href="#"
                                    style={footerStyles.link}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.link, color: '#bdc3c7' })}
                                >
                                    <i className="fas fa-clock" style={footerStyles.icon}></i>
                                    Mon-Fri: 9AM-6PM
                                </a>
                            </li>
                            <li style={footerStyles.linkItem}>
                                <a
                                    href="#"
                                    style={footerStyles.link}
                                    onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                                    onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.link, color: '#bdc3c7' })}
                                >
                                    <i className="fas fa-headset" style={footerStyles.icon}></i>
                                    24/7 Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div style={footerStyles.footerBottom}>
                    <p style={footerStyles.copyright}>
                        &copy; 2025 Virtue Hire. All Rights Reserved.
                    </p>
                    <div style={footerStyles.policyLinks}>
                        <a
                            href="#"
                            style={footerStyles.policyLink}
                            onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.policyLink, color: '#bdc3c7' })}
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            style={footerStyles.policyLink}
                            onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.policyLink, color: '#bdc3c7' })}
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            style={footerStyles.policyLink}
                            onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.policyLink, color: '#bdc3c7' })}
                        >
                            Cookie Policy
                        </a>
                        <a
                            href="#"
                            style={footerStyles.policyLink}
                            onMouseEnter={(e) => Object.assign(e.target.style, linkHover)}
                            onMouseLeave={(e) => Object.assign(e.target.style, { ...footerStyles.policyLink, color: '#bdc3c7' })}
                        >
                            Security
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
