import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './PixelTransition.css';

export default function PixelTransition({
    firstContent, secondContent, gridSize = 12, pixelColor = '#1b2207',
    animationStepDuration = 0.4, once = false, aspectRatio = '100%', className = '', style = {}
}) {
    const containerRef = useRef(null);
    const pixelGridRef = useRef(null);
    const activeRef = useRef(null);

    useEffect(() => {
        const pixelGridEl = pixelGridRef.current;
        if (!pixelGridEl) return;
        pixelGridEl.innerHTML = '';
        for (let i = 0; i < gridSize * gridSize; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixelated-image-card__pixel');
            pixel.style.backgroundColor = pixelColor;
            const size = 100 / gridSize;
            pixel.style.width = `${size}%`;
            pixel.style.height = `${size}%`;
            pixelGridEl.appendChild(pixel);
        }
    }, [gridSize, pixelColor]);

    const animatePixels = activate => {
        const pixels = pixelGridRef.current.querySelectorAll('.pixelated-image-card__pixel');
        gsap.killTweensOf(pixels);
        gsap.set(pixels, { display: 'none' });
        gsap.to(pixels, {
            display: 'block', duration: 0,
            stagger: { each: animationStepDuration / pixels.length, from: 'random' },
            onComplete: () => {
                if (activeRef.current) activeRef.current.style.display = activate ? 'block' : 'none';
                gsap.to(pixels, { display: 'none', delay: 0.1, stagger: { each: animationStepDuration / pixels.length, from: 'random' } });
            }
        });
    };

    return (
        <div ref={containerRef} className={`pixelated-image-card ${className}`} style={style}
            onMouseEnter={() => animatePixels(true)} onMouseLeave={() => !once && animatePixels(false)}>
            <div style={{ paddingTop: aspectRatio }} />
            <div className="pixelated-image-card__default">{firstContent}</div>
            <div className="pixelated-image-card__active" ref={activeRef}>{secondContent}</div>
            <div className="pixelated-image-card__pixels" ref={pixelGridRef} />
        </div>
    );
}
