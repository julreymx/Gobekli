import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export const SplashScreen = () => {
    return (
        // Contenedor exterior — NO tiene exit para no interferir con el layoutId del logo
        <div
            key="splash-screen"
            style={{
                position: 'fixed',
                top: 0, left: 0, width: '100vw', height: '100vh',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        >
            {/* Fondo: fade+blur independiente del logo */}
            <motion.div
                exit={{ opacity: 0, filter: 'blur(24px)' }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'var(--surface-light)',
                    zIndex: 0,
                }}
            />
            {/* Logo: layoutId permite que vuele a su posición en el hero */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <Logo
                    size={2.5}
                    animated={true}
                    delayTime={0.5}
                    layoutIdPrefix="gobekli"
                />
            </div>
        </div>
    );
};
