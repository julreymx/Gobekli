import React, { useState, useEffect } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { SplashScreen } from './components/SplashScreen';
import { Landing } from './components/Landing';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 4 segundos de animación WOW, luego transición fluida del logo a su posición
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    // LayoutGroup comparte el contexto de layoutId entre SplashScreen y Landing
    // Esto permite que el logo "viaje" fluidamente de la animación a la esquina superior
    <LayoutGroup>
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" />}
      </AnimatePresence>
      {!showSplash && <Landing />}
    </LayoutGroup>
  );
}

export default App;
