import React from 'react';
import { motion } from 'framer-motion';

/**
 * Logo Göbekli — Dos rectángulos superponiéndose
 *
 * CONSTRUCCIÓN CORRECTA (confirmada por JR):
 *
 *   Rectángulo NARANJA: left=0, width=totalW, height=barH+darkH
 *   Rectángulo TEAL:    left=offsetX, width=colW, height=darkH+tealH
 *
 *   Al superponer, el resultado visual es:
 *
 *   Row A (barH):   [~~ORANGE~~ 180px ~~ORANGE~~]  → solo naranja (puro)
 *   Row B (darkH):  [ORG 50px | DARK  80px | ORG 50px]  → naranja en laterales, dark en centro
 *   Row C (tealH):  [          | TEAL 80px |          ]  → solo teal (puro)
 *
 *   El truco: el naranja baja hasta barH+darkH, así sus laterales
 *   son visibles en la zona del dark (Row B).
 *
 * Proporciones (size=1):
 *   totalW = 180   barH = 48   darkH = 22   tealH = 140   totalH = 210
 *   colW   =  80   offsetX = 50 (centrado)
 */
export const Logo = ({
    size = 1,
    showText = true,
    animated = false,
    delayTime = 0,
    layoutIdPrefix = 'gobekli-logo'
}) => {
    const totalW = 180 * size;
    const colW = 80 * size;
    const offsetX = 50 * size;   // (totalW - colW) / 2 → centrado

    const barH = 48 * size;
    const darkH = 22 * size;
    const tealH = 140 * size;
    const totalH = barH + darkH + tealH;  // 210px

    const orangeVar = animated ? {
        hidden: { y: -140, opacity: 0, scaleX: 0.05 },
        visible: {
            y: 0, opacity: 1, scaleX: 1,
            transition: { type: 'spring', stiffness: 90, damping: 14, delay: delayTime }
        }
    } : { hidden: {}, visible: {} };

    const darkVar = animated ? {
        hidden: { opacity: 0, scaleY: 0 },
        visible: {
            opacity: 1, scaleY: 1,
            transition: { type: 'spring', stiffness: 100, damping: 14, delay: delayTime + 0.18 }
        }
    } : { hidden: {}, visible: {} };

    const tealVar = animated ? {
        hidden: { y: 170, opacity: 0, scaleY: 0.05 },
        visible: {
            y: 0, opacity: 1, scaleY: 1,
            transition: { type: 'spring', stiffness: 75, damping: 12, delay: delayTime + 0.38 }
        }
    } : { hidden: {}, visible: {} };

    const textVar = animated ? {
        hidden: { opacity: 0, x: 80, filter: 'blur(18px)' },
        visible: {
            opacity: 1, x: 0, filter: 'blur(0px)',
            transition: { duration: 1.3, ease: 'easeOut', delay: delayTime + 1.0 }
        }
    } : { hidden: {}, visible: {} };

    return (
        <motion.div
            layoutId={`${layoutIdPrefix}-wrapper`}
            style={{ display: 'flex', alignItems: 'flex-start', gap: `${1.1 * size}rem`, cursor: 'pointer' }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            initial="hidden"
            animate="visible"
        >
            {/* ── Marca geométrica ───────────────────────────────────────────── */}
            <motion.div
                layoutId={`${layoutIdPrefix}-mark`}
                style={{ position: 'relative', width: totalW, height: totalH, flexShrink: 0 }}
            >
                {/* 1. NARANJA — baja hasta cubrir el nivel del dark zone
                        → sus laterales son visibles en Row B */}
                <motion.div
                    variants={orangeVar}
                    style={{
                        position: 'absolute', top: 0, left: 0,
                        width: totalW,
                        height: barH + darkH,   // ← LA CLAVE: baja hasta incluir la zona dark
                        backgroundColor: 'var(--accent-orange)',
                        transformOrigin: 'top center',
                    }}
                />

                {/* 2. DARK — sobre el naranja, solo en el ancho del teal (centro)
                     → deja expuesto el naranja en los laterales (50px cada lado) */}
                <motion.div
                    variants={darkVar}
                    style={{
                        position: 'absolute', top: barH, left: offsetX,
                        width: colW, height: darkH,
                        backgroundColor: 'var(--base-dark)',
                        transformOrigin: 'top center',
                    }}
                />

                {/* 3. TEAL — debajo del dark, mismo eje central */}
                <motion.div
                    variants={tealVar}
                    style={{
                        position: 'absolute', top: barH + darkH, left: offsetX,
                        width: colW, height: tealH,
                        backgroundColor: 'var(--accent-turquoise)',
                        transformOrigin: 'bottom center',
                    }}
                />
            </motion.div>

            {/* ── Texto vertical "Göbekli" ─────────────────────────────────── */}
            {showText && (
                <motion.div
                    layoutId={`${layoutIdPrefix}-text`}
                    variants={textVar}
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)', userSelect: 'none', lineHeight: 1, marginTop: '-5px' }}
                >
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 400,
                        fontSize: `${totalH / 3.5}px`,  /* Share Tech Mono: advance ≈ 0.5em → 7×0.5=3.5 */
                        letterSpacing: '0',
                        lineHeight: 1,
                        color: '#1b2207',            /* base-dark — color único (JR) */
                        textShadow: 'none',
                    }}>
                        Göbekli
                    </span>
                </motion.div>
            )}
        </motion.div>
    );
};
