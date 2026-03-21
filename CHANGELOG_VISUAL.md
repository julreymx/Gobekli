# 🎨 Changelog Visual — Göbekli Landing

Registro de mejoras visuales y de UX aplicadas al proyecto.

---

## [2026-03-21] — Refinamiento de tipografía y espaciado

### Cambios aplicados

#### 1. Tipografía — Jerarquía corregida
**Archivo:** `src/index.css`

**Problema:** `hero-headline` y `section-headline` usaban `var(--font-heading, "Inter", sans-serif)` pero la variable no estaba definida.

**Solución:**
```css
:root {
  --font-heading: 'Montserrat', sans-serif;
}
```

**Impacto:** Ahora todas las headlines usan Montserrat consistentemente, sin fallback inesperado a Inter.

---

#### 2. Espaciado — Ritmo vertical unificado
**Archivo:** `src/components/Landing.css`

**Problema:** Gaps inconsistentes entre secciones (pain-items, diff-items, rubro-cards).

**Solución:** Unificar a `2.5rem` como estándar para spacing entre elementos relacionados.

| Elemento | Antes | Ahora | Delta |
|----------|-------|-------|-------|
| `.pain-grid` gap | 2rem | 2.5rem | +0.5rem |
| `.pain-grid` margin-bottom | 3.5rem | 4rem | +0.5rem |
| `.pain-item` gap | 1.25rem | 1.5rem | +0.25rem |
| `.pain-item` padding | 2.25rem | 2.5rem | +0.25rem |
| `.diff-item` padding | 3rem | 2.5rem | -0.5rem |

**Impacto:** Ritmo visual más consistente, mejor respiración entre elementos.

---

### Commit asociado
```
8a962f6 — refactor: unificar espaciado y agregar font-heading variable
```

---

## Pendientes para próxima iteración

### Accesibilidad
- [ ] Aumentar contraste en `.pain-text` y `.diff-pre` (opacidad 0.6→0.8)
- [ ] Agregar `:focus-visible` styles en botones y navegación
- [ ] Verificar WCAG AA ratios para naranja sobre verde oscuro

### Micro-interacciones
- [ ] Ticker pause on hover
- [ ] Box-shadow transition en cards hover
- [ ] Cursor pointer en todos los elementos clickeables

### Mobile
- [ ] Revisar order de hero-img-col en responsive
- [ ] Ajustar font-sizes en <600px
- [ ] Testear touch targets (min 44px)

### Performance
- [ ] Preload de Montserrat Bold en index.html
- [ ] Lazy loading en imágenes de rubro-cards
- [ ] Verificar Lenis smooth scroll en todas las secciones

---

## Notas de diseño

### Sistema cromático
- **Naranja:** `#d33d0f` — Acento primario, CTAs, highlights
- **Turquesa:** `#269c8a` — Secundario, branding, success states
- **Base dark:** `#1b2207` — Texto principal, fondos oscuros
- **Surface light:** `#f6f5ef` — Fondo principal (hueso)

### Tipografía
- **Headlines:** Montserrat (700/800)
- **Body:** Montserrat (400/500)
- **Mono:** Share Tech Mono (para taglines, badges, detalles técnicos)

### Espaciado estándar
- **section-v:** 8rem (desktop) → 5.5rem (tablet) → 3rem (mobile)
- **section-h:** max(2rem, calc(50vw - 540px))
- **gap estándar:** 2.5rem para elementos relacionados
- **padding cards:** 2.5rem

---

_Generated: 2026-03-21 15:21 GMT-3_
