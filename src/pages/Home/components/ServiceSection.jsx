import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Settings, Droplets, ShieldCheck, ArrowRight } from 'lucide-react';

const ServiceSection = () => {
    const services = [
        {
            icon: <Wrench size={32} />,
            title: "Certified Service",
            desc: "Expert care from Honda-trained technicians using state-of-the-art diagnostic tools.",
            link: "Book Service"
        },
        {
            icon: <Settings size={32} />,
            title: "Genuine Parts",
            desc: "100% genuine parts engineered specifically for your Honda's peak performance.",
            link: "Explore Parts"
        },
        {
            icon: <Droplets size={32} />,
            title: "Engine Oil",
            desc: "Honda genuine synthetic oil designed to maximize your engine's life and power.",
            link: "View Range"
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Warranty",
            desc: "Comprehensive coverage and extended warranty options for complete peace of mind.",
            link: "Learn More"
        }
    ];

    return (
        <section className="service-section" id="service">
            <div className="service-header">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h4 className="service-subtitle">Maintenance & Care</h4>
                    <h2 className="service-title">
                        Honda <span>Service & Parts</span>
                    </h2>
                    <p className="service-description">
                        Keep your Honda running like new. Trust the experts who know your motorcycle best with certified service and genuine components.
                    </p>
                </motion.div>
            </div>

            <div className="service-grid">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        className="service-card"
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="service-icon">
                            {service.icon}
                        </div>
                        <h3 className="service-card-title">{service.title}</h3>
                        <p className="service-card-desc">{service.desc}</p>
                        <a href="#" className="service-link" onClick={(e) => e.preventDefault()}>
                            {service.link} <ArrowRight size={16} />
                        </a>
                    </motion.div>
                ))}
            </div>

            {/* Optional Banner Image / CTA */}
            <motion.div
                className="service-banner"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
            >
                <div className="banner-content">
                    <h3>Looking for a specific part?</h3>
                    <p>Browse our extensive catalog of genuine Honda parts catalog.</p>
                </div>
                <button className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
                    Parts Catalog
                </button>
            </motion.div>
        </section>
    );
};

export default ServiceSection;
