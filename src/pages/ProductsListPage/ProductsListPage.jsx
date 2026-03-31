import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductsPage.css';

import { PRODUCT_MODELS } from '../../constants/products';

const ProductsPage = ({ onExplore }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const models = PRODUCT_MODELS;

    const tabs = ['All', 'Sports', 'Commuter', 'Scooter'];

    const filteredModels = models.filter(m => {
        const matchesTab = activeTab === 'All' || m.category === activeTab;
        const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="products-page">
            {/* Header Section */}
            <div className="products-hero">
                <div className="products-hero-content">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="page-title"
                    >
                        DISCOVER OUR <span>TOP MODELS</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="page-subtitle"
                    >
                        Experience track-bred performance and urban reliability in every ride.
                    </motion.p>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="filter-bar-container">
                <div className="filter-bar">
                    <div className="tabs-wrapper">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search your bike..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Main Listing Grid */}
            <div className="products-grid-container">
                <motion.div layout className="products-bento-grid">
                    <AnimatePresence>
                        {filteredModels.map((model) => (
                            <motion.div
                                key={model.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                className={`product-card size-${model.size}`}
                                onClick={() => onExplore(model)}
                            >
                                <div className="card-overlay"></div>
                                <div className="card-watermark">{model.name.split(' ')[0]}</div>
                                
                                <div className="card-labels">
                                    <span className="card-badge" style={{ color: model.accent }}>{model.category}</span>
                                    <h3 className="card-name">{model.name}</h3>
                                    <p className="card-pricing">Starting at {model.price}</p>
                                    <p className="card-description-hover">{model.description}</p>
                                    
                                    <div className="card-btn">
                                        EXPLORE <ArrowUpRight size={16} />
                                    </div>
                                </div>

                                <motion.div className="card-img-container">
                                    <img src={model.image} alt={model.name} className="card-img" />
                                </motion.div>

                                <div className="card-accent-glow" style={{ background: `radial-gradient(circle, ${model.accent}22 0%, transparent 70%)` }}></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                {filteredModels.length === 0 && (
                    <div className="no-results">
                        <h3>No bikes found matching your search.</h3>
                        <button className="reset-btn" onClick={() => {setSearchQuery(''); setActiveTab('All');}}>Reset Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
