import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const AboutSection = () => {
    const stats = [
        {
            icon: <Globe size={24} />,
            label: "Global Leader",
            value: "World's #1",
            desc: "Largest manufacturer of two-wheelers globally."
        },
        {
            icon: <ShieldCheck size={24} />,
            label: "Legacy",
            value: "Since 2012",
            desc: "Operating with excellence in Bangladesh."
        },
        {
            icon: <Award size={24} />,
            label: "Joint Venture",
            value: "Honda Japan & BSEC",
            desc: "A partnership for industrial growth."
        },
        {
            icon: <Zap size={24} />,
            label: "Innovation",
            value: "Japanese Tech",
            desc: "Precision engineering on every ride."
        }
    ];

    return (
        <section className="about-section" id="about">
            <div className="about-container">
                <div className="about-grid">
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h4 className="about-subtitle">The Power of Dreams</h4>
                        <h2 className="about-title">
                            Honda is the World's <span>Largest Manufacturer</span> of Two Wheelers
                        </h2>
                        <div className="about-text-wrapper">
                            <p className="about-text">
                                Bangladesh Honda Private Limited (BHL) operates as a joint venture between Honda Motor Company Limited, Japan and Bangladesh Steel and Engineering Corporation (State Own Corporation).
                            </p>
                            <p className="about-text-secondary">
                                Incorporated on December 04, 2012, BHL brings the global standards of <strong>Japanese precision engineering</strong> to the heart of Bangladesh, ensuring every rider experiences unmatched quality and reliability.
                            </p>
                        </div>

                        <div className="about-stats-grid">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    className="stat-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    <div className="stat-icon" style={{ color: 'var(--primary)' }}>
                                        {stat.icon}
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stat.value}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            className="btn-primary"
                            style={{
                                marginTop: '3.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                width: 'fit-content'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Discover Our Story <ArrowRight size={20} />
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="about-image-side"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="about-image-wrapper">
                            <div className="image-overlay-glow"></div>
                            <img
                                src="/about-bhl.jpg"
                                alt="Honda Bangladesh Factory"
                                className="about-image"
                            />
                            <div className="experience-badge">
                                <span className="years">12+</span>
                                <span className="text">Years of Quality</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
