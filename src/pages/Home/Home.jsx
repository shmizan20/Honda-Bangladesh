import React, { useRef, useEffect } from 'react';
import { Play, ChevronRight } from 'lucide-react';
import NewLaunch from '../../features/products/NewLaunch/NewLaunch';
import TopModels from '../../features/products/TopModels/TopModels';
import AboutSection from './components/AboutSection';
import SafetySection from './components/SafetySection';
import NewsSection from './components/NewsSection';
import MediaSection from './components/MediaSection';
import DealerSection from '../../features/dealer-locator/DealerSection';

const Home = ({ onExplore }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 2; // Jump straight to aggressive shots
        }
    }, []);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const time = videoRef.current.currentTime;
            if (time > 8 && time < 18) {
                videoRef.current.currentTime = 18;
            }
            if (time >= 28 || time >= videoRef.current.duration - 0.5) {
                videoRef.current.currentTime = 2;
                videoRef.current.play();
            }
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <video
                    ref={videoRef}
                    className="hero-video-bg"
                    autoPlay
                    muted
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    src="/cbr-hero2.mp4"
                />
                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <h4 className="hero-subtitle">The Power of Dreams</h4>
                    <h1 className="hero-title">
                        CBR150R
                        <span>Beyond Speed</span>
                    </h1>
                    <p className="hero-description">
                        Experience the adrenaline rush with the track-bred CBR150R. Unmatched aerodynamics, liquid-cooled DOHC engine, and aggressive racing aesthetics built for the bold.
                    </p>

                    <div className="hero-buttons">
                        <button 
                            className="btn-primary" 
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            onClick={() => onExplore({ name: 'HORNET 2.0', badge: 'Street Fighter' })}
                        >
                            Explore Model <ChevronRight size={18} />
                        </button>
                        <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Play size={18} /> View Video
                        </button>
                    </div>

                    <div className="hero-specs">
                        <div className="spec-item">
                            <span className="spec-value">150<span style={{ fontSize: '1rem' }}>cc</span></span>
                            <span className="spec-label">Engine</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-value">16.3<span style={{ fontSize: '1rem' }}>PS</span></span>
                            <span className="spec-label">Max Power</span>
                        </div>
                        <div className="spec-item">
                            <span className="spec-value">ABS</span>
                            <span className="spec-label">Dual Channel</span>
                        </div>
                        <div className="spec-item" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '2rem' }}>
                            <span className="spec-value" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                                5.5<span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '4px' }}>Lakh BDT</span>
                            </span>
                            <span className="spec-label">Starting at</span>
                        </div>
                    </div>
                </div>
            </section>

            <NewLaunch onExplore={onExplore} />
            <TopModels onExplore={onExplore} />
            <AboutSection />
            <SafetySection />
            <NewsSection />
            <MediaSection />
            <DealerSection />
        </>
    );
};

export default Home;
