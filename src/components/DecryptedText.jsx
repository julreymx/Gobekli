import { useEffect, useState, useRef, useMemo, useCallback } from 'react';

const styles = {
    wrapper: { display: 'inline-block', whiteSpace: 'pre-wrap' },
    srOnly: { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }
};

export default function DecryptedText({
    text, speed = 40, sequential = false,
    useOriginalCharsOnly = false, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '', parentClassName = '', encryptedClassName = '', animateOn = 'hover', ...props
}) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState(new Set());
    const containerRef = useRef(null);

    const availableChars = useMemo(() => useOriginalCharsOnly ? Array.from(new Set(text.split(''))).filter(char => char !== ' ') : characters.split(''), [useOriginalCharsOnly, text, characters]);

    const shuffleText = useCallback((originalText, currentRevealed) => {
        return originalText.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (currentRevealed.has(i)) return originalText[i];
            return availableChars[Math.floor(Math.random() * availableChars.length)];
        }).join('');
    }, [availableChars]);

    const triggerDecrypt = useCallback(() => {
        setRevealedIndices(new Set());
        setIsAnimating(true);
    }, []);

    useEffect(() => {
        if (animateOn === 'view') {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        triggerDecrypt();
                        observer.disconnect(); // Solo animar una vez al ver
                    }
                },
                { threshold: 0.1 }
            );
            if (containerRef.current) observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, [animateOn, triggerDecrypt]);


    useEffect(() => {
        if (!isAnimating) return;
        const interval = setInterval(() => {
            setRevealedIndices(prev => {
                if (prev.size < text.length) {
                    const nextIndex = sequential ? prev.size : Math.floor(Math.random() * text.length);
                    const newSet = new Set(prev).add(nextIndex);
                    setDisplayText(shuffleText(text, newSet));
                    return newSet;
                }
                clearInterval(interval);
                setIsAnimating(false);
                setDisplayText(text);
                return prev;
            });
        }, speed);
        return () => clearInterval(interval);
    }, [isAnimating, text, speed, sequential, shuffleText]);

    return (
        <span className={parentClassName} ref={containerRef} style={styles.wrapper} onMouseEnter={animateOn === 'hover' ? triggerDecrypt : undefined} {...props}>
            <span style={styles.srOnly}>{text}</span>
            <span aria-hidden="true">
                {displayText.split('').map((char, index) => (
                    <span key={index} className={revealedIndices.has(index) || !isAnimating ? className : encryptedClassName}>{char}</span>
                ))}
            </span>
        </span>
    );
}
