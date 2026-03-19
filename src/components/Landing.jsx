import React, { useRef, useState, useEffect } from 'react';
import './Landing.css';
import { Logo } from './Logo';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import OrderChaosGrid from './OrderChaosGrid';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

/* ─── useReveal: IntersectionObserver nativo (sin Framer scroll tracking) ─── */
function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

/* ─── Reveal: wrapper con CSS animation ─────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className={`reveal ${visible ? 'reveal--in' : ''} ${className}`}
            style={{ '--reveal-delay': `${delay}s` }}
        >
            {children}
        </div>
    );
}

const IconHome = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
);

const IconChart = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const IconScale = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M2.2 7l9.8 4 9.8-4" />
        <path d="M20 7v9a3 3 0 0 1-6 0V7" />
        <path d="M10 7v9a3 3 0 0 1-6 0V7" />
    </svg>
);

const IconShield = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);

const BadgeStar = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginRight: '4px', display: 'inline-block', verticalAlign: 'middle' }}>
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
);

const IconChevronRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

const IconArrowRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

/* ─── Datos de stack cards (universales, sin rubro) ────────────────────── */
const rubros = [
    {
        id: 'velocidad',
        label: 'Velocidad',
        tagline: (
            <>
                De 4 horas de fricción<br />
                a <span className="text-orange">40 segundos</span> de ejecución.
            </>
        ),
        despues: 'Los agentes procesan la carga bruta en tiempo real. Lo que antes consumía una mañana entera se resuelve antes de que termines el primer café.',
        integraciones: ['WhatsApp', 'Email', 'Portales'],
    },
    {
        id: 'hitl',
        label: 'Human-in-the-Loop',
        tagline: (
            <>
                La máquina procesa el volumen.<br />
                Vos direccionás <span className="text-orange">el impacto</span>.
            </>
        ),
        despues: 'El sistema estructura el caos las 24 horas. Tu única tarea es auditar, aprobar, y aplicar el criterio que ninguna IA puede reemplazar.',
        integraciones: ['WhatsApp', 'Dashboard', 'Notificaciones'],
    },
    {
        id: 'verdad',
        label: 'Gobernanza',
        tagline: (
            <>
                Cero alucinaciones.<br />
                Una Única <span className="text-orange">Fuente de Verdad</span>.
            </>
        ),
        despues: 'Nada se modifica, inventa ni sobrescribe sin un "sí" explícito de tu parte. Ecosistemas blindados donde la IA opera bajo reglas inquebrantables.',
        integraciones: ['Base de datos', 'Auditoría', 'Control'],
    },
    {
        id: 'escala',
        label: 'Escalabilidad',
        tagline: (
            <>
                <span className="text-orange">Más operaciones</span>.<br />
                La misma estructura.
            </>
        ),
        despues: 'Tu equipo deja de apagar incendios operativos. Las validaciones repetitivas se automatizan; el tiempo liberado vuelve a la estrategia.',
        integraciones: ['APIs', 'Flujos', 'Integraciones'],
    },
];

/* ─── Ticker ─────────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
    'Velocidad de ejecución x10',
    'Gobernanza agéntica estricta',
    'Human-in-the-Loop',
    'Elegancia Directiva',
    'SST: Única Fuente de Verdad',
    'Sin formularios. Solo estrategia.',
    'Impacto comercial cuantificable',
    'Trato directo. Sin intermediarios.',
];

function Ticker() {
    const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS];
    return (
        <div className="ticker-wrapper" aria-hidden="true">
            <motion.div
                className="ticker-track"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
            >
                {repeated.map((item, i) => (
                    <span key={i} className="ticker-item">
                        {item}<span className="ticker-dot"><BadgeStar /></span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

/* ─── RubroCard ──────────────────────────────────────────────────────── */
function RubroCard({ rubro, index }) {
    const [open, setOpen] = useState(false);
    return (
        <Reveal delay={index * 0.08}>
            <div className={`rubro-card${open ? ' is-open' : ''}`}>
                {rubro.badge && <span className="rubro-badge">{rubro.badge}</span>}

                <button
                    className="rubro-card__header"
                    onClick={() => setOpen(v => !v)}
                    aria-expanded={open}
                >
                    <span className="rubro-icon">{rubro.icon}</span>
                    <span className="rubro-card__meta">
                        <span className="label-1">{rubro.label}</span>
                        <span className="rubro-tagline">
                            {rubro.tagline.split('\n').map((line, i) => (
                                <span key={i}>{line}{i === 0 && <br />}</span>
                            ))}
                        </span>
                    </span>
                    <span className={`rubro-chevron${open ? ' is-open' : ''}`}><IconChevronRight /></span>
                </button>

                <div className="rubro-body" aria-hidden={!open}>
                    <div className="rubro-body__inner">
                        <div className="rubro-transform">
                            <div className="transform-col">
                                <span className="transform-label transform-label--antes">Antes</span>
                                <p className="transform-text">{rubro.antes}</p>
                            </div>
                            <div className="transform-arrow" aria-hidden="true"><IconArrowRight /></div>
                            <div className="transform-col">
                                <span className="transform-label transform-label--despues">Después</span>
                                <p className="transform-text">{rubro.despues}</p>
                            </div>
                        </div>
                        <div className="rubro-tools">
                            {rubro.herramientas.map((h, i) => (
                                <div key={i} className="tool-item">
                                    <span className="tool-name">{h.nombre}</span>
                                    <span className="tool-desc">{h.desc}</span>
                                </div>
                            ))}
                        </div>
                        <div className="rubro-integraciones">
                            {rubro.integraciones.map((it, i) => (
                                <span key={i} className="chip">{it}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

/* ─── LANDING ─────────────────────────────────────────────────────────── */
export function Landing() {
    return (
        <main className="landing">

            {/* ── NAV ── */}
            <nav className="landing-nav">
                <Logo size={0.4} animated={false} layoutIdPrefix="gobekli" />
            </nav>

            {/* ── HERO ── */}
            <section className="landing-hero">
                <div className="hero-bg-noise" />
                <div className="hero-content hero-content--anim">
                    {/* Col izquierda: Titular */}
                    <div className="hero-text-col">
                        <div className="hero-text-wrapper">
                            <motion.h1
                                className="hero-headline"
                                initial="hidden"
                                animate="visible"
                                style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                                    }
                                }}
                            >
                                {"Human judgement,".split(' ').map((word, i) => (
                                    <span key={`w1-${i}`} style={{ display: 'inline-flex', overflow: 'hidden', marginRight: '0.3em', paddingBottom: '0.1em' }}>
                                        <motion.span
                                            style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                                            variants={{
                                                hidden: { y: '120%', opacity: 0, rotateX: -45, filter: 'blur(8px)' },
                                                visible: { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1] } }
                                            }}
                                            className="hl"
                                        >
                                            {word}
                                        </motion.span>
                                    </span>
                                ))}
                                <br />
                                {"AI scale.".split(' ').map((word, i) => (
                                    <span key={`w2-${i}`} style={{ display: 'inline-flex', overflow: 'hidden', marginRight: '0.3em', paddingBottom: '0.1em' }}>
                                        <motion.span
                                            style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                                            variants={{
                                                hidden: { y: '120%', opacity: 0, rotateX: -45, filter: 'blur(8px)' },
                                                visible: { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.2, 0.8, 0.2, 1] } }
                                            }}
                                            className="hl"
                                        >
                                            {word}
                                        </motion.span>
                                    </span>
                                ))}
                            </motion.h1>
                            <motion.h2
                                className="hero-sub"
                                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                            >
                                <span className="hl hl-orange hl-mono">Inteligencia artificial sin fricción y centrada en el ser humano,</span> para pequeñas y medianas empresas.
                            </motion.h2>
                        </div>
                    </div>
                    {/* Col derecha: Imagen dinámica (React Effect) */}
                    <motion.div
                        className="hero-img-col"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 1, 0.3, 1] }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <OrderChaosGrid rows={4} cols={3} />
                    </motion.div>
                </div>
                <div className="hero-decor" aria-hidden="true">
                    <div className="hero-orb hero-orb--1" />
                    <div className="hero-orb hero-orb--2" />
                </div>
            </section>

            {/* ── TICKER ── */}
            <Ticker />

            {/* ── DOLOR ── */}
            <section className="section section--textured" id="dolor">
                <div className="section-inner">
                    <Reveal>
                        <h2 className="section-headline">
                            <span className="hl">Deja de ser esclavo</span><br />
                            <span className="hl hl-orange">del back-office.</span>
                        </h2>
                    </Reveal>
                    <div className="pain-grid">
                        {[
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>,
                                text: 'Respondiendo mensajes que no van a ningún lado'
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
                                text: 'Tipeando datos que deberían entrar solos'
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
                                text: 'Buscando información que ya tenías, pero no encontrás'
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
                                text: 'Revisando portales manualmente, uno por uno, causa por causa'
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
                                text: 'Persiguiendo a clientes para que manden lo que necesitás'
                            },
                            {
                                icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line></svg>,
                                text: 'Haciendo cuentas que debería hacer una máquina'
                            },
                        ].map((item, i) => (
                            <Reveal key={i} delay={i * 0.07}>
                                <div className="pain-item glass-card">
                                    <span className="pain-icon">{item.icon}</span>
                                    <p className="pain-text">{item.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.35}>
                        <p className="pain-coda">
                            Implementamos asistentes digitales que trabajan en segundo plano.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ── DIFERENCIADORES ── fondo HUESO (2° sección) */}
            <section className="section">
                <div className="section-inner">
                    <Reveal>
                        <h2 className="section-headline">
                            Cómo funciona <span className="riso-word">Göbekli</span>
                        </h2>
                    </Reveal>
                    <div className="differentiators">
                        {[
                            { pre: 'No somos una agencia.', post: 'Somos un equipo que construye asistentes que desaparecen en tu flujo de trabajo.' },
                            { pre: 'No es un SaaS que tenés que aprender.', post: 'Se integra en lo que ya usás. Sin curva de aprendizaje. Sin código.' },
                            { pre: 'La IA nunca decide sola.', post: 'La máquina prepara. Vos revisás. Tu firma siempre es la última. Human-in-the-Loop.' },
                            { pre: 'No son meses de implementación.', post: '3 a 4 semanas. Y lo que era un esfuerzo bruto, desaparece de tu día.' },
                        ].map((d, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <div className="diff-item">
                                    <p className="diff-pre">{d.pre}</p>
                                    <p className="diff-post">{d.post}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── RUBROS ── fondo VERDE texturado (3° sección) */}
            <section className="section section--textured rubros-section" id="rubros">
                <div className="section-inner">
                    <Reveal>
                        <h2 className="section-headline">
                            <span className="hl">Un día en la vida de tu negocio.</span><br />
                            <span className="hl hl-teal">Después.</span>
                        </h2>
                    </Reveal>
                    <div style={{ width: '100%', marginTop: '2rem' }}>
                        <ScrollStack>
                            {rubros.map((r, idx) => (
                                <ScrollStackItem key={r.id} index={idx} total={rubros.length}>
                                    {/* children[0] — Text column */}
                                    <div className="sc-card-text">
                                        <h3 className="sc-card-title">
                                            {r.tagline}
                                        </h3>
                                        <p className="sc-card-body">{r.despues}</p>
                                    </div>
                                    {/* children[1] — Video column (gets parallax) */}
                                    <div className="sc-card-video">
                                        <div className="sc-card-play-icon">
                                            <div className="sc-play-circle">▶</div>
                                            <span>automatización · en vivo</span>
                                        </div>
                                    </div>
                                </ScrollStackItem>
                            ))}
                        </ScrollStack>
                    </div>
                </div>
            </section>

            {/* ── FILOSOFÍA ── fondo HUESO (4° sección) */}
            <section className="section" id="filosofia">
                <div className="section-inner philosophy-layout">
                    <Reveal>
                        <div>
                            <h2 className="section-headline" style={{ marginBottom: '1rem' }}>
                                <span className="hl">Inteligencia Agéntica.</span><br />
                                <span className="hl">El fin de la brecha</span><br />
                                <span className="hl hl-orange">corporativa.</span>
                            </h2>
                        </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className="philosophy-quotes">
                            {[
                                '"Multiplicamos tu capacidad operativa por diez mediante agentes autónomos 24/7."',
                                '"Potencia de multinacional inmediata, sin la fricción estructural de contratar grandes equipos."',
                                '"La máquina absorbe el volumen, pero la gobernanza y estrategia siempre son tuyas."',
                            ].map((q, i) => (
                                <motion.blockquote
                                    key={i}
                                    className="philo-quote"
                                    whileHover={{ x: 6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {q}
                                </motion.blockquote>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── CTA ── fondo VERDE texturado (5° sección) */}
            <section className="section section--textured section--cta">
                <Reveal delay={0.1}>
                    <h2 className="cta-headline">
                        ¿Cuánto tiempo perdés hoy haciendo<br />
                        el trabajo que debería hacer una máquina?
                    </h2>
                </Reveal>
                <Reveal delay={0.2}>
                    <p className="cta-sub">Contanos. Armamos el diagnóstico.</p>
                </Reveal>
                <Reveal delay={0.3}>
                    <motion.a
                        href="mailto:hola@gobekli.ai"
                        className="cta-btn"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span>Empezar la conversación</span>
                        <span className="cta-btn__arrow"><IconArrowRight /></span>
                    </motion.a>
                </Reveal>
            </section>

            {/* ── FOOTER ── */}
            <footer className="landing-footer">

                {/* Left Side: Signature + Contact */}
                <div className="footer-left">
                    <a href="https://eldominiodejr.com" target="_blank" rel="noopener noreferrer" className="footer-mark-link" aria-label="El Dominio de JR">
                        <svg className="footer-mark footer-mark--alien" viewBox="0 0 14 14" width="34" height="34" aria-hidden="true" shapeRendering="crispEdges">
                            {/* Head Structure (Exact Grid from Snippet) */}
                            <rect x="4" y="0" width="6" height="1" fill="currentColor" />
                            <rect x="2" y="1" width="10" height="1" fill="currentColor" />

                            {/* Forehead + Highlights */}
                            <rect x="1" y="2" width="1" height="1" fill="currentColor" />
                            <rect x="2" y="2" width="3" height="1" fill="currentColor" fillOpacity="0.5" />
                            <rect x="5" y="2" width="8" height="1" fill="currentColor" />

                            <rect x="1" y="3" width="1" height="1" fill="currentColor" />
                            <rect x="2" y="3" width="2" height="1" fill="currentColor" fillOpacity="0.5" />
                            <rect x="4" y="3" width="9" height="1" fill="currentColor" />

                            <rect x="0" y="4" width="14" height="2" fill="currentColor" />

                            {/* Eyes (Row 6) */}
                            <rect x="0" y="6" width="2" height="1" fill="currentColor" />
                            <rect x="2" y="6" width="3" height="1" fill="#000" />
                            <rect x="5" y="6" width="4" height="1" fill="currentColor" />
                            <rect x="9" y="6" width="3" height="1" fill="#000" />
                            <rect x="12" y="6" width="2" height="1" fill="currentColor" />

                            {/* Eyes (Row 7 - Shimmers) */}
                            <rect x="0" y="7" width="1" height="1" fill="currentColor" />
                            <rect x="1" y="7" width="1" height="1" fill="#000" />
                            <rect x="2" y="7" width="1" height="1" fill="currentColor" /> {/* Shine L */}
                            <rect x="3" y="7" width="3" height="1" fill="#000" />
                            <rect x="6" y="7" width="2" height="1" fill="currentColor" />
                            <rect x="8" y="7" width="1" height="1" fill="#000" />
                            <rect x="9" y="7" width="1" height="1" fill="currentColor" /> {/* Shine R */}
                            <rect x="10" y="7" width="3" height="1" fill="#000" />
                            <rect x="13" y="7" width="1" height="1" fill="currentColor" />

                            {/* Eyes (Row 8) */}
                            <rect x="0" y="8" width="1" height="1" fill="currentColor" />
                            <rect x="1" y="8" width="5" height="1" fill="#000" />
                            <rect x="6" y="8" width="2" height="1" fill="currentColor" />
                            <rect x="8" y="8" width="5" height="1" fill="#000" />
                            <rect x="13" y="8" width="1" height="1" fill="currentColor" />

                            {/* Eyes (Row 9) */}
                            <rect x="1" y="9" width="1" height="1" fill="currentColor" />
                            <rect x="2" y="9" width="3" height="1" fill="#000" />
                            <rect x="5" y="9" width="4" height="1" fill="currentColor" />
                            <rect x="9" y="9" width="3" height="1" fill="#000" />
                            <rect x="12" y="9" width="1" height="1" fill="currentColor" />

                            {/* Chin */}
                            <rect x="2" y="10" width="10" height="1" fill="currentColor" />
                            <rect x="3" y="11" width="8" height="1" fill="currentColor" />
                            <rect x="4" y="12" width="6" height="1" fill="currentColor" />
                            <rect x="5" y="13" width="4" height="1" fill="currentColor" />
                        </svg>
                    </a>
                    <div className="footer-data">
                        <a href="https://wa.me/5492914296574" target="_blank" rel="noopener noreferrer" className="footer-data-line">+54 9 291 429-6574</a>
                        <a href="mailto:gobekli.ai@gmail.com" className="footer-data-line">gobekli.ai@gmail.com</a>
                        <span className="footer-data-line footer-data-line--hitl">HITL CERTIFIED</span>
                    </div>
                </div>

                {/* Right Side: Copyright + Brand */}
                <div className="footer-right">
                    <div className="footer-data footer-data--right">
                        <span className="footer-data-line">© 2026 Inteligencia Artificial</span>
                        <span className="footer-data-line">Centrada en el ser humano</span>
                    </div>
                    <div className="footer-mark-link">
                        <svg className="footer-mark footer-mark--gobekli" viewBox="0 0 100 110" width="34" height="38" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
                            <rect x="0" y="10" width="100" height="40" fill="currentColor" fillOpacity="0.18" />
                            <rect x="28" y="30" width="44" height="80" fill="currentColor" fillOpacity="0.18" />
                        </svg>
                    </div>
                </div>

            </footer>
        </main>
    );
}
