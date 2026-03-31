import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Zap, Activity, ShieldCheck } from 'lucide-react';
import InteractiveBike from '../../product-viewer/InteractiveBike/InteractiveBike';
import '../ProductStyles.css';

// Animation variants to ensure perfectly synced execution
const sectionVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 }
    }
};

const ProductDetails = ({ bike, onBack }) => {
    const [activeTooltip, setActiveTooltip] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Close tooltip on outside click
        const handleClickOutside = (event) => {
            if (activeTooltip && !event.target.closest('.hotspot-interactive')) {
                setActiveTooltip(null);
            }
        };

        // Use capture phase to handle clicks before React's synthetic events
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [activeTooltip]);

    if (!bike) return null;

    return (
        <div className="product-details-page">


            {/* SECTION 1: HERO */}
            <motion.section 
                className="figma-hero" 
                style={{ paddingBottom: '10rem', minHeight: '100vh' }}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <div className="figma-hero-content">
                    <motion.div 
                        className="figma-hero-text"
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                        }}
                    >
                        <span className="hero-badge">{bike.badge || "STREET FIGHTER"}</span>
                        <h1 className="hero-title">{bike.name}</h1>
                        <p className="hero-tagline">Fly Against The Wind</p>
                        <p className="hero-desc">
                            Aggressive street fighter styling combined with the power of a 184.4cc engine. 
                            The all-new Hornet 2.0 is designed for those who want to dominate the road with style and performance.
                        </p>
                        
                        <div className="hero-stats">
                            <div className="stat-item">
                                <h3>184.4<span>cc</span></h3>
                                <p>ENGINE</p>
                            </div>
                            <div className="stat-item">
                                <h3>ABS</h3>
                                <p>BRAKING</p>
                            </div>
                            <div className="stat-item">
                                <h3>LED</h3>
                                <p>HEADLAMP</p>
                            </div>
                        </div>


                    </motion.div>

                    <motion.div 
                        className="figma-hero-visual"
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                        }}
                    >

                        <div className="bike-360-container">
                            <InteractiveBike 
                                is360={true}
                                sequencesPath="/360/hornet_nobg"
                                totalFrames={8}
                                altText={bike.name}
                            />
                        </div>
                    </motion.div>
                </div>
                
                <div className="scroll-down-hint">
                    <span className="scroll-hint-text">SCROLL DOWN</span>
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <div>
                        <span className="m_scroll_arrows unu"></span>
                        <span className="m_scroll_arrows doi"></span>
                        <span className="m_scroll_arrows trei"></span>
                    </div>
                </div>
            </motion.section>

            {/* SECTION 2: ENGINE (Tech Panel Layout) */}
            <motion.section 
                className="revamp-feature" 
                style={{ position: 'relative' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }} 
                variants={sectionVariants}
            >
                <div className="feature-container" style={{ alignItems: 'flex-start', gap: '6rem' }}>
                    <motion.div 
                        className="feature-text left-text"
                        style={{ flex: 1 }}
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                        }}
                    >
                        <div className="revamp-header">
                            <span className="revamp-tag">01 / POWER</span>
                            <h2 className="revamp-title">Heart of,<br/>Predator</h2>
                        </div>
                        <p className="editorial-desc">
                            The all-new BS-VI engine guarantees maximum performance alongside superior efficiency. 
                            Built with advanced HET technology to deliver a jaw-dropping mid-range torque curve.
                        </p>
                        
                        <div className="tech-specs-grid">
                            <div className="tech-spec-box">
                                <h4 className="tech-spec-title">184.4cc BS-VI Engine</h4>
                                <p className="tech-spec-desc">Class-leading displacement outputting immense power on demand.</p>
                            </div>
                            <div className="tech-spec-box">
                                <h4 className="tech-spec-title">PGM-FI Technology</h4>
                                <p className="tech-spec-desc">Smart sensors inject exact fuel mixtures for aggressive throttle responses.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="feature-visual right-visual"
                        style={{ height: 'auto', display: 'flex', justifyContent: 'flex-end', flex: 1.2 }}
                        variants={{
                            hidden: { x: '30vw', y: '-10vh', opacity: 0 },
                            visible: { x: 0, y: 0, opacity: 1, transition: { duration: 1, type: 'spring', stiffness: 50, damping: 20 } }
                        }}
                    >
                        <div style={{ position: 'relative', display: 'inline-block', maxWidth: '800px', width: '100%' }}>
                            <img 
                                src="/360/hornet_nobg/8.png" 
                                alt="Engine Architecture" 
                                className="feature-bike-img" 
                                style={{ width: '100%', transform: 'scale(1.05) translateX(-5%)', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.8))' }}
                            />
                            <div 
                                className="hotspot-interactive" 
                                style={{ top: '42%', left: '50%' }}
                                onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === 's2_pgmfi' ? null : 's2_pgmfi'); }}
                            >
                                <div className="product-pulse"></div>
                                {activeTooltip === 's2_pgmfi' && (
                                    <motion.div className="hotspot-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
                                        <h5>PGM-Fi System</h5>
                                        <p>Smart sensors on fuel tank instantly optimize fuel mix for performance.</p>
                                    </motion.div>
                                )}
                            </div>
                            <div 
                                className="hotspot-interactive" 
                                style={{ top: '68%', left: '42%' }}
                                onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === 's2_engine' ? null : 's2_engine'); }}
                            >
                                <div className="product-pulse"></div>
                                {activeTooltip === 's2_engine' && (
                                    <motion.div className="hotspot-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
                                        <h5>184cc HET Engine</h5>
                                        <p>Central high-torque engine core designed for raw street dominance.</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* SECTION 3: SUSPENSION (Fullwidth Overlay Layout) */}
            <motion.section 
                className="revamp-feature fullwidth-focus" 
                style={{ paddingBottom: '12rem', marginTop: '4rem' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                variants={sectionVariants}
            >
                <motion.div className="revamp-header" variants={{ hidden: {opacity: 0, y: 30}, visible: {opacity: 1, y: 0, transition:{duration: 0.8}}}}>
                    <span className="revamp-tag">02 / HANDLING</span>
                    <h2 className="revamp-title">Absolute<br/>Precision</h2>
                </motion.div>
                
                <motion.div 
                    style={{ width: '100%', position: 'relative', zIndex: 1 }}
                    variants={{
                        hidden: { scale: 1.1, opacity: 0 },
                        visible: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
                    }}
                >
                    <img 
                        src="/360/hornet_nobg/4.png" 
                        alt="Suspension Layout" 
                        style={{ width: '100%', maxWidth: '1100px', filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.9))' }}
                    />
                    <div 
                        className="hotspot-interactive" 
                        style={{ top: '23%', left: '38%' }}
                        onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === 's3_meter' ? null : 's3_meter'); }}
                    >
                        <div className="product-pulse"></div>
                        {activeTooltip === 's3_meter' && (
                            <motion.div className="hotspot-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
                                <h5>Digital Console</h5>
                                <p>Integrated liquid crystal display for all vital ride diagnostics.</p>
                            </motion.div>
                        )}
                    </div>
                    <div 
                        className="hotspot-interactive" 
                        style={{ top: '56.5%', left: '32%' }}
                        onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === 's3_suspension' ? null : 's3_suspension'); }}
                    >
                        <div className="product-pulse"></div>
                        {activeTooltip === 's3_suspension' && (
                            <motion.div className="hotspot-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
                                <h5>Golden USD Forks</h5>
                                <p>Premium upside-down front forks for absolute precision and stability.</p>
                            </motion.div>
                        )}
                    </div>
                    <div 
                        className="hotspot-interactive" 
                        style={{ top: '78%', left: '52%' }}
                        onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === 's3_chain' ? null : 's3_chain'); }}
                    >
                        <div className="product-pulse"></div>
                        {activeTooltip === 's3_chain' && (
                            <motion.div className="hotspot-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
                                <h5>Seal Chain</h5>
                                <p>Low-maintenance durable chain designed for smooth power delivery.</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                <motion.div 
                    className="focus-cards-container"
                    variants={{
                        hidden: { y: 50, opacity: 0 },
                        visible: { y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.4 } }
                    }}
                >
                    <div className="focus-card">
                        <Zap className="focus-card-icon" />
                        <h4 className="tech-spec-title">USD Front Forks</h4>
                        <p className="tech-spec-desc">Golden upside-down forks meant to absorb the harshest impacts while preserving high-speed stability.</p>
                    </div>
                    <div className="focus-card">
                        <Activity className="focus-card-icon" />
                        <h4 className="tech-spec-title">Rear Monoshock</h4>
                        <p className="tech-spec-desc">Keeps the center of gravity pinned, giving you cornering confidence like never before.</p>
                    </div>
                    <div className="focus-card">
                        <ShieldCheck className="focus-card-icon" />
                        <h4 className="tech-spec-title">Petal Disc Braking</h4>
                        <p className="tech-spec-desc">Dual petal discs designed for superior heat dissipation and precise stopping power.</p>
                    </div>
                    <div className="focus-card">
                        <Activity className="focus-card-icon" />
                        <h4 className="tech-spec-title">Wide Rear Tire</h4>
                        <p className="tech-spec-desc">140mm wide radial rear tire for massive grip and road presence at high speeds.</p>
                    </div>
                </motion.div>
            </motion.section>

            {/* SECTION 4: DESIGN (Editorial Stagger Layout) */}
            <motion.section 
                className="revamp-feature" 
                style={{ padding: '8rem 5%', backgroundColor: 'rgba(255,0,0,0.02)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }} 
                variants={sectionVariants}
            >
                <div className="feature-container" style={{ alignItems: 'center', gap: '8rem' }}>
                    <motion.div 
                        className="feature-visual left-visual"
                        style={{ flex: 1.2 }}
                        variants={{
                            hidden: { x: '-20vw', opacity: 0 },
                            visible: { x: 0, opacity: 1, transition: { duration: 1.5, type: 'spring', stiffness: 40, damping: 20 } }
                        }}
                    >
                        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                            <img 
                                src="/360/hornet_nobg/6.png" 
                                alt="Aggressive Design" 
                                style={{ width: '100%', transform: 'scale(1.05)', filter: 'drop-shadow(20px 20px 40px rgba(0,0,0,0.6))' }}
                            />
                            <div 
                                className="hotspot-interactive" 
                                style={{ top: '35%', left: '10%' }}
                                onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === 's4_taillight' ? null : 's4_taillight'); }}
                            >
                                <div className="product-pulse"></div>
                                {activeTooltip === 's4_taillight' && (
                                    <motion.div className="hotspot-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
                                        <h5>X-Shaped LED Taillight</h5>
                                        <p>Distinctive tail lamp clearly visible at the top-rear.</p>
                                    </motion.div>
                                )}
                            </div>
                            <div 
                                className="hotspot-interactive" 
                                style={{ top: '60%', left: '46%' }}
                                onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === 's4_engine' ? null : 's4_engine'); }}
                            >
                                <div className="product-pulse"></div>
                                {activeTooltip === 's4_engine' && (
                                    <motion.div className="hotspot-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
                                        <h5>Engine Block</h5>
                                        <p>Centered on the actual engine unit for precise identification.</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="feature-text right-text"
                        style={{ flex: 1 }}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1.2, delay: 0.3, ease: 'easeOut' } }
                        }}
                    >
                        <div className="revamp-header">
                            <span className="revamp-tag">03 / AESTHETICS</span>
                            <h2 className="revamp-title">Fierce By<br/>Design</h2>
                        </div>
                        <p className="editorial-desc">
                            Designed to freeze traffic. From its dominating aerodynamic front profile to the muscular fuel tank echoing a fighter jet, the Hornet screams street dominance.
                        </p>
                        
                        <div className="editorial-highlights">
                            <span className="editorial-pill">Bulky Muscular Tank</span>
                            <span className="editorial-pill">X-Shaped LED Taillight</span>
                            <span className="editorial-pill">Aggressive Shrouds</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* SECTION 5: SAFETY (Glowing Tech Container) */}
            <motion.section 
                className="revamp-feature" 
                style={{ padding: '10rem 5% 12rem', position: 'relative' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
                variants={sectionVariants}
            >
                <div className="radar-bg"></div>
                <div className="feature-container" style={{ alignItems: 'center', zIndex: 5, position: 'relative', gap: '6rem' }}>
                    <motion.div 
                        className="feature-text left-text safety-glass-panel"
                        style={{ flex: 1 }}
                        variants={{
                            hidden: { opacity: 0, x: -40 },
                            visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: 'easeOut' } }
                        }}
                    >
                        <div className="revamp-header" style={{ marginBottom: '2rem' }}>
                            <span className="revamp-tag" style={{ borderLeftColor: '#fff', color: '#fff' }}>04 / CONTROL</span>
                            <h2 className="revamp-title" style={{ fontSize: '3.5rem', background: 'linear-gradient(to right, #ff4444, #aa0000)', WebkitBackgroundClip: 'text' }}>Command<br/>Center</h2>
                        </div>
                        
                        <ul className="safety-list">
                            <li>
                                <ShieldCheck className="safety-check" size={24} />
                                <div className="safety-text">
                                    <h4>1-Channel ABS Braking</h4>
                                    <p>Dual petal discs combined with ABS prevents wheel locking under sudden heavy braking.</p>
                                </div>
                            </li>
                            <li>
                                <Activity className="safety-check" size={24} />
                                <div className="safety-text">
                                    <h4>Full Digital Console</h4>
                                    <p>Vivid liquid crystal meter displaying gear position, battery voltmeter, and trips.</p>
                                </div>
                            </li>
                            <li>
                                <CheckCircle2 className="safety-check" size={24} />
                                <div className="safety-text">
                                    <h4>Hazard Switch</h4>
                                    <p>Flashing indicators designed for emergency stops and low visibility zones.</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div 
                        className="feature-visual right-visual"
                        style={{ flex: 1.3, display: 'flex', justifyContent: 'center' }}
                        variants={{
                            hidden: { x: '15vw', scale: 0.95, opacity: 0 },
                            visible: { x: 0, scale: 1, opacity: 1, transition: { duration: 1.5, type: 'spring', stiffness: 40, damping: 20 } }
                        }}
                    >
                        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                            <img 
                                src="/360/hornet_nobg/2.png" 
                                alt="Safety Console" 
                                style={{ width: '100%', transform: 'scale(1.05)', filter: 'drop-shadow(-30px 40px 60px rgba(0,0,0,0.9))' }}
                            />
                            <div 
                                className="hotspot-interactive" 
                                style={{ top: '75%', right: '15%', left: 'auto' }}
                                onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === 's5_abs' ? null : 's5_abs'); }}
                            >
                                <div className="product-pulse"></div>
                                {activeTooltip === 's5_abs' && (
                                    <motion.div className="hotspot-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
                                        <h5>Single Channel ABS</h5>
                                        <p>ABS sensor ring and braking system for non-lock performance.</p>
                                    </motion.div>
                                )}
                            </div>
                            <div 
                                className="hotspot-interactive" 
                                style={{ top: '22%', right: '50%', left: 'auto' }}
                                onClick={(e) => { e.stopPropagation(); setActiveTooltip(activeTooltip === 's5_console' ? null : 's5_console'); }}
                            >
                                <div className="product-pulse"></div>
                                {activeTooltip === 's5_console' && (
                                    <motion.div className="hotspot-tooltip" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()}>
                                        <h5>Integrated Command Center</h5>
                                        <p>Close-up of the LCD console with all vital ride diagnostics.</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default ProductDetails;
