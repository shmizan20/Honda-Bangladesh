import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Heart } from 'lucide-react';

const SafetySection = () => {
    const pillars = [
        {
            icon: <Heart size={30} />,
            title: "Respect for Life",
            description: "A commitment to protect everyone sharing the road, from riders to pedestrians.",
            badge: "01"
        },
        {
            icon: <Shield size={30} />,
            title: "Proactive Safety",
            description: "Developing intelligent systems and skills to prevent risks before they occur.",
            badge: "02"
        },
        {
            icon: <Users size={30} />,
            title: "Human Ability",
            description: "Enhancing rider awareness and compassion through global safety education.",
            badge: "03"
        }
    ];

    return (
        <section className="safety-section" id="safety">
            {/* Cinematic Background Elements */}
            <div className="safety-bg-container">
                <img src="/safety-bg.jpg" alt="Safety Background" className="safety-bg-image" />
                <div className="safety-bg-overlay"></div>
            </div>

            <div className="safety-title-large">Safety</div>

            <div className="safety-container">
                <div className="safety-grid">
                    <motion.div
                        className="safety-content-side"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h4 className="safety-subtitle">Social Commitment</h4>
                        <h2 className="safety-title">
                            Safety <span>Bangladesh</span>
                        </h2>
                        <p className="safety-description">
                            "Safety which enables people to spread their wings." Honda is dedicated to realizing a collision-free society where mobility brings joy and peace of mind to all.
                        </p>
                    </motion.div>

                    <div className="pillars-stack">
                        {pillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                className="pillar-premium-card"
                                initial={{ opacity: 0, x: 50, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="pillar-badge">{pillar.badge}</span>
                                <div className="pillar-icon-wrapper">
                                    {pillar.icon}
                                </div>
                                <div className="pillar-details">
                                    <h3>{pillar.title}</h3>
                                    <p>{pillar.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SafetySection;
