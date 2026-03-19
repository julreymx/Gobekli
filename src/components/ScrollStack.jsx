import React, { useRef, useState, useEffect } from 'react';
import {
    motion as Motion,
    useScroll,
    useTransform,
    useSpring,
} from 'framer-motion';
import './ScrollStack.css';

export const ScrollStackItem = ({
    children,
    index = 0,
    total = 1,
    progress,
}) => {
    // Add responsive detection to update ranges on rotation/resize
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 900 : false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Smooth the global progress with a fluid spring
    const smoothProgress = useSpring(progress, {
        stiffness: 75,
        damping: 24,
        restDelta: 0.001,
    });

    // We reserve the last 20% of the total scroll container as a visual "pause" buffer.
    // This gives the spring animations time to settle and lets the user appreciate
    // the fully stacked cards before the container unpins and scrolls away to the next section.
    const activeScroll = 0.8;
    const step = activeScroll / Math.max(1, total - 1);

    // Each card is allotted a fraction of the *active* scroll.
    const enterStart = (index - 1) * step;
    const enterEnd = index * step;

    // 1. Sliding in from the bottom (translation)
    // We use a safe numeric offset (2000px) which is safely offscreen on standard displays
    const yDomain = [Math.max(0, enterStart), Math.max(0.01, enterEnd)];
    // Card 0 doesn't slide in, it's just there. The rest slide in from Y=1800 to their cascade offset.
    // On mobile, we want a larger overlap factor so the content remains visible as a "stack"
    const yRange = index === 0 ? [0, 0] : [1800, index * (isMobile ? 32 : 30)];
    const y = useTransform(smoothProgress, yDomain, yRange);

    // 2. Shrinking into the background (depth effects)
    // Avoid identical domain bounds (which breaks Framer) for the last card
    const depthDomain = [
        Math.max(0.01, enterEnd),
        Math.max(enterEnd + 0.01, activeScroll)
    ];

    // Calculates how many cards will eventually stack OVER this specific card
    const cardsOnTop = Math.max(0, total - 1 - index);

    // Target scale drops by 0.05 for each card placed on top
    const finalScale = 1 - (cardsOnTop * 0.05);
    const scale = useTransform(smoothProgress, depthDomain, [1, finalScale]);

    // Opacity fades slightly to give a sense of shadow/depth
    const finalOpacity = 1 - (cardsOnTop * 0.18);
    const opacity = useTransform(smoothProgress, depthDomain, [1, Math.max(0.3, finalOpacity)]);

    // Blur increases to simulate focus depth
    const finalBlur = cardsOnTop * 2;
    const blurVal = useTransform(smoothProgress, depthDomain, [0, finalBlur]);
    const filter = useTransform(blurVal, v => `blur(${v}px)`);

    // Alternate layout
    const isOdd = index % 2 === 1;

    // Radius logic is necessary inline to alternate perfectly without clipping bugs
    const videoRadius = isOdd ? '36px 0 0 36px' : '0 36px 36px 0';

    return (
        <Motion.div
            data-index={index}
            className="sc-card-inner wow-stack-inner"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                y,
                scale,
                opacity,
                filter,
                transformOrigin: 'top center',
                willChange: 'transform, filter, opacity',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                display: 'flex',
                flexDirection: isOdd ? 'row-reverse' : 'row',
                zIndex: index, // Natural rendering order prevents visual glitches
            }}
        >
            <div className="sc-card-text-col" style={{ flex: 1 }}>
                {children[0]}
            </div>
            <div
                className="sc-card-video-col"
                style={{
                    flex: 1,
                    borderRadius: videoRadius,
                    position: 'relative',
                    overflow: 'hidden' // Ensure grain/glow doesn't bleed out of corners
                }}
            >
                {/* The video placeholder is styled structurally inside Landing.jsx, 
                    but constrained by this wrapper */}
                {children[1]}
            </div>
        </Motion.div>
    );
};

const ScrollStack = ({ children, className = '' }) => {
    const containerRef = useRef(null);
    const total = React.Children.count(children);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Track from the moment the container top hits the viewport top
        // until the container bottom hits the viewport bottom
        offset: ['start start', 'end end']
    });

    // Give roughly 120vh of scrolling *per card* for a luxurious slow pace
    const containerHeight = `${total * 120}vh`;

    return (
        <div
            ref={containerRef}
            className={`scroll-stack-container ${className}`.trim()}
            style={{
                height: containerHeight,
                position: 'relative',
                width: '100%',
                padding: 0
            }}
        >
            <div
                className="scroll-stack-sticky-wrapper"
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden', // Essential to trap any overflow during flight
                }}
            >
                {/* The layout box that defines the central card bounds */}
                <div
                    className="sc-layout-box"
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: 'var(--content-max)',
                        minHeight: '70vh',
                        height: 'auto',
                        padding: '0 1.5rem',
                        boxSizing: 'border-box'
                    }}
                >
                    {React.Children.map(children, (child, index) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, {
                                index,
                                total,
                                progress: scrollYProgress
                            });
                        }
                        return child;
                    })}
                </div>
            </div>
        </div>
    );
};

export default ScrollStack;
