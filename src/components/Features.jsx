import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Settings, ArrowRight } from 'lucide-react';

const Features = () => {
    const features = [
        {
            icon: <GraduationCap size={32} />,
            title: "Candidate Portal",
            description: "Register, take comprehensive assessments, and showcase your skills to top employers. Get matched with opportunities that perfectly fit your profile and career aspirations.",
            buttonText: "Candidate Login",
            color: "var(--primary)",
            bgLight: "rgba(79, 70, 229, 0.1)"
        },
        {
            icon: <Briefcase size={32} />,
            title: "HR Professional",
            description: "Find qualified candidates, submit detailed job descriptions, and streamline your hiring process with our intelligent matching system and advanced filtering options.",
            buttonText: "HR Login",
            color: "var(--secondary)",
            bgLight: "rgba(14, 165, 233, 0.1)"
        },
        {
            icon: <Settings size={32} />,
            title: "Admin Dashboard",
            description: "Manage platform activities, users, assessments, and comprehensive analytics. Ensure smooth operation and continuous improvement with powerful administrative tools.",
            buttonText: "Admin Login",
            color: "var(--accent)",
            bgLight: "rgba(244, 63, 94, 0.1)"
        }
    ];

    return (
        <section id="features" style={{ padding: '100px 0', background: 'var(--white)', position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -12, boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
                            style={{ 
                                background: 'white', 
                                borderRadius: '32px', 
                                padding: '3.5rem 2.5rem', 
                                boxShadow: 'var(--shadow-lg)',
                                border: '1px solid var(--medium-gray)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                            }}
                        >
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                borderRadius: '24px', 
                                background: feature.bgLight,
                                color: feature.color,
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                marginBottom: '2.5rem'
                            }}>
                                {feature.icon}
                            </div>
                            
                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--dark)', marginBottom: '1.2rem', letterSpacing: '-0.5px' }}>
                                {feature.title}
                            </h3>
                            
                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.8', marginBottom: '2.5rem', flexGrow: 1, fontSize: '1.05rem' }}>
                                {feature.description}
                            </p>
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: feature.color,
                                    color: 'white',
                                    border: 'none',
                                    padding: '1.2rem',
                                    borderRadius: '16px',
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    width: '100%',
                                    boxShadow: `0 10px 20px ${feature.color}30`
                                }}
                            >
                                {feature.buttonText} <ArrowRight size={20} />
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
        </section>
    );
};

export default Features;
