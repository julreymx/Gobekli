import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const LABELS = [
    "Más tiempo.",
    "Cero código.",
    "Enfoque humano.",
    "Control total."
];

export default function OrderChaosGrid({ rows = 3, cols = 4 }) {
    const [pieces, setPieces] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const arr = [];
        const itemW = 100 / cols;
        const itemH = 100 / rows;
        const centerX = 50 - itemW / 2;
        const centerY = 50 - itemH / 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Polar distribution for a dense circular cluster
                const angle = Math.random() * Math.PI * 2;
                const radius = Math.sqrt(Math.random()) * 30;
                const randomX = Math.cos(angle) * radius;
                const randomY = Math.sin(angle) * radius;
                const randomRot = (Math.random() - 0.5) * 160;

                // Extra variables for continuous "floating in water" motion
                const driftX = (Math.random() - 0.5) * 20;
                const driftY = (Math.random() - 0.5) * 20;
                const driftRot = (Math.random() - 0.5) * 25;
                const durX = 3 + Math.random() * 5; // 3 to 8 seconds float loop
                const durY = 3 + Math.random() * 5;
                const durRot = 3 + Math.random() * 5;

                // Repartimos los textos secuencialmente en las piezas
                const label = LABELS[(r * cols + c) % LABELS.length];

                arr.push({
                    id: `r${r}-c${c}`,
                    gridX: c * itemW,
                    gridY: r * itemH,
                    chaosX: centerX + randomX,
                    chaosY: centerY + randomY,
                    chaosRot: randomRot,

                    driftX, driftY, driftRot, durX, durY, durRot,
                    label
                });
            }
        }
        setPieces(arr);
    }, [rows, cols]);

    const itemWidth = 100 / cols;
    const itemHeight = 100 / rows;

    if (!pieces.length) return null;

    return (
        <div
            className="order-chaos-container"
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* 1:1 container so items (25%w and 33.3%h) are vertical rectangles */}
            <div style={{ position: 'relative', width: '75%', aspectRatio: '1/1' }}>
                {pieces.map((p) => (
                    <motion.div
                        key={p.id}
                        style={{
                            position: 'absolute',
                            width: `${itemWidth}%`,
                            height: `${itemHeight}%`,
                            mixBlendMode: 'multiply',
                            transformOrigin: 'center',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-start',
                            padding: '0.8rem',
                            boxSizing: 'border-box',
                            overflow: 'hidden'
                        }}
                        initial={false}
                        animate={isHovered ? "order" : "chaos"}
                        whileHover={isHovered ? "pieceHover" : undefined}
                        variants={{
                            chaos: {
                                left: `${p.chaosX}%`,
                                top: `${p.chaosY}%`,
                                rotate: [p.chaosRot, p.chaosRot + p.driftRot, p.chaosRot], // Smooth infinite wobble
                                scale: 1.1,
                                backgroundColor: '#d44d22', // Vibrant orange
                                opacity: 0.85,
                                x: ['0%', `${p.driftX}%`, '0%'], // Smooth infinite drift X
                                y: ['0%', `${p.driftY}%`, '0%'], // Smooth infinite drift Y
                                transition: {
                                    default: { duration: 1.6, ease: [0.25, 1, 0.3, 1] }, // Main transition when mouse leaves
                                    x: { duration: p.durX, repeat: Infinity, ease: 'easeInOut' },
                                    y: { duration: p.durY, repeat: Infinity, ease: 'easeInOut' },
                                    rotate: { duration: p.durRot, repeat: Infinity, ease: 'easeInOut' },
                                }
                            },
                            order: {
                                left: `${p.gridX}%`,
                                top: `${p.gridY}%`,
                                rotate: 0,
                                scale: 0.90, // Gap between items
                                backgroundColor: '#269c8a', // Vibrant Turquoise
                                opacity: 0.95,
                                x: '0%', // Lock to grid (cancels drift)
                                y: '0%', // Lock to grid (cancels drift)
                                transition: { duration: 1.6, ease: [0.25, 1, 0.3, 1] }
                            },
                            pieceHover: {
                                left: `${p.gridX}%`,
                                top: `${p.gridY}%`,
                                rotate: 0,
                                scale: 0.96, // Se agranda apenas sobre la grilla
                                backgroundColor: '#208575', // Turquesa milimétricamente más oscuro para contraste
                                opacity: 1,
                                x: '0%',
                                y: '0%',
                                transition: { duration: 0.3, ease: 'easeOut' }
                            }
                        }}
                    >
                        {/* Texto imperceptible */}
                        <motion.span
                            style={{
                                color: 'rgba(8, 30, 25, 0.85)', // Tono oscuro teal para que el multiply lo imprima como marca de agua sutil
                                fontSize: '0.70rem',
                                fontFamily: 'var(--font-mono, "Share Tech Mono", monospace)',
                                fontWeight: 700,
                                letterSpacing: '-0.02em',
                                pointerEvents: 'none'
                            }}
                            variants={{
                                chaos: { opacity: 0 },
                                order: { opacity: 0 },
                                pieceHover: { opacity: 1, transition: { duration: 0.4 } }
                            }}
                        >
                            {p.label}
                        </motion.span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
