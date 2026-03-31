import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import InteractiveBike from '../../product-viewer/InteractiveBike/InteractiveBike';
import './NewLaunch.css';

import { NEW_BIKES } from '../../../constants/products';

const newBikes = NEW_BIKES;

const NewLaunch = ({ onExplore }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const [animationTrigger, setAnimationTrigger] = useState(0);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimationTrigger(prev => prev + 1);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const nextBike = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIdx((prev) => (prev + 1) % newBikes.length);
            setIsAnimating(false);
            setAnimationTrigger(prev => prev + 1);
        }, 400);
    };

    const prevBike = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIdx((prev) => (prev - 1 + newBikes.length) % newBikes.length);
            setIsAnimating(false);
            setAnimationTrigger(prev => prev + 1);
        }, 400);
    };

    const currentBike = newBikes[currentIdx];

    return (
        <section className="new-launches-section" id="new-launches" ref={sectionRef}>
            <div className="container">
                <div className="launches-header">
                    <div className="launches-header-text">
                        <div className="section-badge">
                            <span className="pulse-dot"></span> New Launches
                        </div>
                        <h2 className="section-title">Fresh of the Line</h2>
                    </div>
                    <div className="slider-controls">
                        <button onClick={prevBike} className="control-btn" aria-label="Previous Bike"><ChevronLeft size={24} /></button>
                        <button onClick={nextBike} className="control-btn" aria-label="Next Bike"><ChevronRight size={24} /></button>
                    </div>
                </div>

                <div className="launches-slider-container">
                    {/* Background visual elements */}
                    <div className="slider-watermark">{currentBike.watermark}</div>

                    <div className={`slider-main-content ${isAnimating ? 'animating' : ''}`}>

                        <div className="slider-bike-wrapper">
                            <InteractiveBike
                                imageSrc={currentBike.image}
                                altText={currentBike.name}
                                is360={currentBike.is360}
                                sequencesPath={currentBike.sequencesPath}
                                totalFrames={currentBike.totalFrames}
                                animationTrigger={animationTrigger}
                            />
                        </div>

                        <div className="slider-info-card">
                            <div className="card-inner">
                                <span className="bike-badge">{currentBike.badge}</span>
                                <div className="name-with-badge">
                                    <h3 className="bike-name">{currentBike.name}</h3>
                                </div>
                                <p className="bike-subtitle">{currentBike.subtitle}</p>
                                <p className="bike-desc">{currentBike.description}</p>

                                <div className="bike-specs-grid">
                                    {currentBike.specs.map((spec, idx) => (
                                        <div key={idx} className="spec-box">
                                            <span className="spec-value">{spec.val}<span className="unit">{spec.unit}</span></span>
                                            <span className="spec-label">{spec.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    className="btn-primary w-100-btn"
                                    onClick={() => onExplore(currentBike)}
                                >
                                    Explore {currentBike.name} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="slider-dots">
                        {newBikes.map((_, idx) => (
                            <button
                                key={idx}
                                className={`dot ${idx === currentIdx ? 'active' : ''}`}
                                onClick={() => {
                                    if (isAnimating || idx === currentIdx) return;
                                    setIsAnimating(true);
                                    setTimeout(() => {
                                        setCurrentIdx(idx);
                                        setIsAnimating(false);
                                        setAnimationTrigger(prev => prev + 1);
                                    }, 400);
                                }}
                                aria-label={`View bike ${idx + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewLaunch;
