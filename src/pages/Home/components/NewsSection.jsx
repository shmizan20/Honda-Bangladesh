import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

const NewsSection = () => {
    const newsItems = [
        {
            image: "https://www.bdhonda.com/assets/images/news-events/1709440615.jpg", // Replace with valid URL or placeholder if needed, using a generic high quality bike image for now
            category: "Campaign",
            date: "Mar 03, 2024",
            title: "Honda Eid Mubarak Campaign 2024",
            desc: "Celebrate this Eid with Honda's exclusive cashback offers and free registration on selected models.",
        },
        {
            image: "https://www.bdhonda.com/assets/images/news-events/1704285499.jpg",
            category: "Event",
            date: "Jan 03, 2024",
            title: "Honda Safety Riding Camp in Dhaka",
            desc: "Join us for an exclusive safety riding training session conducted by expert Honda instructors.",
        },
        {
            image: "https://www.bdhonda.com/assets/images/news-events/1698739199.jpg",
            category: "Launch",
            date: "Oct 31, 2023",
            title: "Introducing the All-New SP 160",
            desc: "Experience thrilling performance with the all-new SP 160, featuring advanced technology and bold design.",
        }
    ];

    return (
        <section className="news-section" id="news">
            <div className="news-header">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="news-header-content"
                >
                    <div>
                        <h4 className="news-subtitle">Updates & Offers</h4>
                        <h2 className="news-title">
                            What's <span>New</span>
                        </h2>
                    </div>
                    <button className="btn-outline news-view-all">
                        View All News
                    </button>
                </motion.div>
            </div>

            <div className="news-grid">
                {newsItems.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="news-card"
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="news-image-wrapper">
                            <img src={item.image} alt={item.title} className="news-image"
                                onError={(e) => { e.target.src = '/about-bhl.jpg'; }} // fallback
                            />
                            <div className="news-category">{item.category}</div>
                        </div>
                        <div className="news-content">
                            <div className="news-meta">
                                <span className="news-date">
                                    <Calendar size={14} /> {item.date}
                                </span>
                            </div>
                            <h3 className="news-card-title">{item.title}</h3>
                            <p className="news-card-desc">{item.desc}</p>
                            <a href="#" className="news-link" onClick={(e) => e.preventDefault()}>
                                Read More <ArrowRight size={16} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default NewsSection;
