# CEREBRO - Arquitectura y Reglas Maestras (Göbekli)

## 1. Stack Tecnológico (Frontend)

- **Core:** React 19.2 + Vite 8.0
- **Estilos:** Pure CSS (CSS Variables) - En proceso de modularización para escalabilidad.
- **Animaciones e Interacciones:** `framer-motion` (Micro-interacciones, transiciones de rutas y montaje de componentes).
- **Iconografía:** `@phosphor-icons/react`

## 2. Convenciones de Marca y Diseño

- **Misión de la UI:** "human judgement, ai brute force." La IA es la maquinaria silenciosa (esfuerzo bruto), el usuario tiene el juicio final (cierra el trato).
- **Tipografía Oficial:** `Montserrat` (Regular y Bold) para web general. `Share Tech Mono` para elementos técnicos y acentos visuales.
- **Reglas Cromáticas (CSS Tokens):**
  - Accent Orange: `#d33d0f` (Atención, Alertas)
  - Accent Turquoise: `#269c8a` (Botones primarios, Tabs)
  - Base Dark Green: `#232b0a` (Tipografía principal, Fondos de contraste)
  - Surface Light/Cream: `#f6f5ef` (Fondo general UI)
- **Reglas de UI/UX:** Estricto apego a las 10 Heurísticas de Usabilidad. Interfaces estilo "glassmorphism", elevación sutil y texturas físicas simuladas (papercraft).

## 3. Patrones Obligatorios y Políticas

1. Ningún cambio al código fuente, instalación de dependencias o alteración de arquitectura se hace si no está previamente asentado en `BACKLOG_Y_ROADMAP.md`.
2. Todo avance concluyente de un hito debe volcarse cronológicamente al archivo `COLUMNA_VERTEBRAL.md`.
