import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What types of assessments are available?",
            answer: "We offer technical assessments, behavioral evaluations, cognitive ability tests, and industry-specific assessments. All tests are scientifically validated and regularly updated."
        },
        {
            question: "Is there a free trial available?",
            answer: "Yes! We offer a 14-day free trial for our Professional plan. No credit card required to get started."
        },
        {
            question: "How secure is candidate data?",
            answer: "We use enterprise-grade security measures including encryption, secure data centers, and comply with GDPR and other data protection regulations."
        },
        {
            question: "Can I integrate with existing HR systems?",
            answer: "Yes, we offer API integrations with popular HR systems and ATS platforms. Our team can help with custom integrations for Enterprise clients."
        }
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq">
            <div className="container">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-subtitle">Find answers to common questions about Virtue Hire</p>
                <div className="faq-container">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button
                                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                            </button>
                            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
