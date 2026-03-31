import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { PRODUCT_MODELS } from '../../../constants/products';

const TopModels = ({ onExplore }) => {
    const [activeTab, setActiveTab] = useState('All');
    const models = PRODUCT_MODELS;

    const tabs = ['All', 'Sports', 'Commuter', 'Scooter'];

    const filteredModels = activeTab === 'All'
        ? models
        : models.filter(m => m.category === activeTab);

    return (
        <section className="top-models" id="models">
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div>
                    <h2 className="section-title">Discover Our <span>Top Models</span></h2>
                    <p className="section-desc">Experience cutting-edge engineering across categories. From track-bred sports bikes to urban commuters.</p>
                </div>

                {/* Glassmorphism Tabs */}
                <div className="models-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div layout className="models-bento-grid">
                <AnimatePresence>
                    {filteredModels.map((model, idx) => (
                        <motion.div
                            key={model.id}
                            layout
                            className={`model-card size-${model.size}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: false, amount: 0.1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            onClick={() => onExplore(model)}
                            style={{ cursor: 'pointer' }}
                            transition={{
                                duration: 0.5,
                                ease: [0.16, 1, 0.3, 1],
                                layout: { type: "spring", stiffness: 300, damping: 30 }
                            }}
                        >
                            <div className="card-bg"></div>
                            <span className="card-watermark">{model.name.split(' ')[0]}</span>

                            <div className="card-content">
                                <span className="card-category" style={{ color: model.accent }}>{model.category}</span>
                                <h3 className="card-title">{model.name}</h3>
                                <p className="card-price">Starting at {model.price}</p>

                                <button className="card-action" onClick={() => onExplore(model)}>
                                    Explore <ArrowUpRight size={18} />
                                </button>
                            </div>

                            <motion.div
                                className="card-image-wrapper"
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{
                                    type: "spring",
                                    stiffness: 50,
                                    damping: 15,
                                    delay: 0.2
                                }}
                            >
                                <img src={model.image} alt={model.name} className="card-image" />
                            </motion.div>

                            <div className="card-glow" style={{ backgroundColor: model.accent }}></div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default TopModels;
