import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';
import './InteractiveBike.css';

const InteractiveBike = ({ imageSrc, altText, is360 = false, sequencesPath = '', totalFrames = 36, animationTrigger = 0 }) => {
    const containerRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [currentFrame, setCurrentFrame] = useState(1);

    // Maintain a list of preloaded images mapped by frame number
    const [loadedImages, setLoadedImages] = useState({});
    const [allLoaded, setAllLoaded] = useState(false);

    const dragState = useRef({
        startX: 0,
        startY: 0,
        rotX: 0,
        rotY: 0,
        currentRotX: 0,
        currentRotY: 0,
        startIdx: 1,
        currentIdx: 1
    });

    // Helper to determine the extension. If sequencesPath contains nobg, it's png, else jpg.
    const getExt = () => sequencesPath.includes('nobg') ? 'png' : 'jpg';

    // Preload images silently in the background
    useEffect(() => {
        if (is360 && sequencesPath) {
            const ext = getExt();
            let loadedCount = 0;
            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                img.src = `${sequencesPath}/${i}.${ext}`;
                img.onload = () => {
                    loadedCount++;
                    setLoadedImages(prev => ({ ...prev, [i]: img.src }));
                    if (loadedCount === totalFrames) {
                        setAllLoaded(true);
                    }
                };
            }
        }
    }, [is360, sequencesPath, totalFrames]);

    // Auto-rotate preview effect - Triggers on animationTrigger change
    useEffect(() => {
        if (is360 && allLoaded && !isDragging && animationTrigger > 0) {
            let interval;
            // A simple 1-lap rotation to show off the 360 feature
            const spin = () => {
                let frame = 1;
                interval = setInterval(() => {
                    setCurrentFrame(frame);
                    dragState.current.currentIdx = frame;
                    frame++;
                    if (frame > totalFrames) {
                        clearInterval(interval);
                        setCurrentFrame(1);
                        dragState.current.currentIdx = 1;
                    }
                }, 80); // Slightly faster spin for preview
            };
            
            spin();
            return () => clearInterval(interval);
        }
    }, [is360, allLoaded, animationTrigger]);

    const updateView = useCallback(() => {
        if (is360) {
            setCurrentFrame(dragState.current.currentIdx);
        } else if (imageWrapperRef.current) {
            imageWrapperRef.current.style.transform = `perspective(1200px) rotateX(${dragState.current.currentRotX}deg) rotateY(${dragState.current.currentRotY}deg)`;
        }
    }, [is360]);

    const handleMouseMove = useCallback((e) => {
        if (!isDragging) return;
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - dragState.current.startX;

        if (is360) {
            const sensitivity = 6;
            const framesMoved = Math.floor(deltaX / sensitivity);
            // Reverse direction logically to match the standard bike rotation convention if needed (or keep it as is)
            let nextIdx = ((dragState.current.startIdx - 1 - framesMoved) % totalFrames);
            if (nextIdx < 0) nextIdx += totalFrames;
            nextIdx += 1;

            if (dragState.current.currentIdx !== nextIdx) {
                dragState.current.currentIdx = nextIdx;
                updateView();
            }
        } else {
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            const deltaY = clientY - dragState.current.startY;
            let newRotY = dragState.current.rotY + (deltaX * 0.4);
            let newRotX = dragState.current.rotX - (deltaY * 0.2);
            newRotY = Math.max(-35, Math.min(35, newRotY));
            newRotX = Math.max(-10, Math.min(10, newRotX));
            dragState.current.currentRotX = newRotX;
            dragState.current.currentRotY = newRotY;
            updateView();
        }
    }, [isDragging, is360, totalFrames, updateView]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        if (is360) {
            dragState.current.startIdx = dragState.current.currentIdx;
        } else {
            dragState.current.rotX = 0;
            dragState.current.rotY = 0;
            dragState.current.currentRotX = 0;
            dragState.current.currentRotY = 0;
            if (imageWrapperRef.current) {
                imageWrapperRef.current.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                updateView();
            }
        }
    }, [is360, updateView]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setShowHint(false);
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        dragState.current.startX = clientX;
        dragState.current.startY = clientY;
        if (is360) {
            dragState.current.startIdx = dragState.current.currentIdx;
        } else if (imageWrapperRef.current) {
            imageWrapperRef.current.style.transition = 'none';
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMouseMove, { passive: false });
            window.addEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (
        <div
            className={`interactive-bike-container ${isDragging ? 'grabbing' : 'grab'}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            <div className={`bike-360-hint ${!showHint ? 'hidden' : ''}`}>
                <RotateCcw size={24} className="spin-icon" />
                <span>Drag to Rotate 360°</span>
            </div>

            <div
                className="interactive-bike-model"
                ref={imageWrapperRef}
            >
                {is360 ? (
                    <img
                        src={loadedImages[currentFrame] || `${sequencesPath}/1.${getExt()}`}
                        alt={`${altText} 360 view`}
                        className="main-bike-img processed"
                        draggable="false"
                    />
                ) : (
                    <img
                        src={imageSrc}
                        alt={altText}
                        className="main-bike-img"
                        draggable="false"
                    />
                )}
            </div>
        </div>
    );
};

export default InteractiveBike;
