import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const MediaSection = () => {
    // Array of videos fetched directly from Honda Bangladesh Official YouTube Channel
    const videos = [
        {
            id: "Hornet",
            title: "Hornet 2.0 Eid Offer",
            thumbnail: "https://img.youtube.com/vi/aVEFdaPgfWY/maxresdefault.jpg",
            youtubeId: "aVEFdaPgfWY"
        },
        {
            id: "CBR150R",
            title: "CBR 150R - Rev Up Your Racing Passion",
            thumbnail: "https://img.youtube.com/vi/1gGM7xqth68/maxresdefault.jpg",
            youtubeId: "1gGM7xqth68"
        },
        {
            id: "XBlade",
            title: "X Blade DD ABS 50 SEC HD",
            thumbnail: "https://img.youtube.com/vi/XtWFi7hNkCU/hqdefault.jpg",
            youtubeId: "XtWFi7hNkCU"
        },
        {
            id: "SP125",
            title: "Honda SP 125 এর সাথে মাইলের পর মাইল ছুটে চলার গল্প।",
            thumbnail: "https://img.youtube.com/vi/99-Dn9EgSGI/maxresdefault.jpg",
            youtubeId: "99-Dn9EgSGI"
        },
        {
            id: "Shine",
            title: "Shine TVC - এগিয়ে থাকো",
            thumbnail: "https://img.youtube.com/vi/E_RLyl-xF7s/maxresdefault.jpg",
            youtubeId: "E_RLyl-xF7s"
        }
    ];

    const [activeVideo, setActiveVideo] = useState(videos[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="media-section" id="media">
            <div className="media-container">
                <motion.div
                    className="media-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h4 className="media-subtitle">Media Center</h4>
                    <h2 className="media-title">
                        Featured <span>Videos</span>
                    </h2>
                </motion.div>

                <div className="media-layout">
                    {/* Main Featured Video Area */}
                    <motion.div
                        className="media-main-video"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="video-player-wrapper" onClick={() => {
                            setActiveVideo(videos[0]);
                            setIsModalOpen(true);
                        }}>
                            {/* Fallback image with absolute play button if no iframe used, or use actual iframe if needed */}
                            <img
                                src={videos[0].thumbnail}
                                alt={videos[0].title}
                                className="main-video-thumb"
                                onError={(e) => { e.target.src = '/about-bhl.jpg'; }}
                            />
                            <div className="video-overlay">
                                <button className="play-button-large">
                                    <Play fill="currentColor" size={32} />
                                </button>
                            </div>
                        </div>
                        <div className="main-video-info">
                            <h3 className="main-video-title">{videos[0].title}</h3>
                        </div>
                    </motion.div>

                    {/* Side List of Videos */}
                    <div className="media-playlist">
                        {videos.map((vid, idx) => (
                            <motion.div
                                key={vid.id}
                                className={`playlist-item ${activeVideo.id === vid.id ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveVideo(vid);
                                    setIsModalOpen(true);
                                }}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <div className="playlist-thumb-wrapper">
                                    <img
                                        src={vid.thumbnail}
                                        alt={vid.title}
                                        className="playlist-thumb"
                                        onError={(e) => { e.target.src = '/about-bhl.jpg'; }}
                                    />
                                    <div className="playlist-play-icon">
                                        <Play fill="white" size={12} />
                                    </div>
                                </div>
                                <div className="playlist-info">
                                    <h4>{vid.title}</h4>
                                    <span>Watch TVC</span>
                                </div>
                            </motion.div>
                        ))}

                        <button className="btn-outline media-view-all">
                            View All Media
                        </button>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {isModalOpen && (
                <div className="video-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="video-modal-close" onClick={() => setIsModalOpen(false)}>
                            <X size={24} />
                        </button>
                        <div className="video-modal-body">
                            {/* Use actual YouTube embed URL with activeVideo.youtubeId */}
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                                title={activeVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MediaSection;
