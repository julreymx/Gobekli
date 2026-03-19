import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import {
    SquaresFour, Keyboard, ListDashes, Receipt, Info, Gear,
    Globe, MagnifyingGlass, Bell, DotsThree, WarningCircle, CreditCard, Image as ImageIcon
} from '@phosphor-icons/react';

export const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Daily');
    const [activeNav, setActiveNav] = useState('Overview');
    const [activeChip, setActiveChip] = useState('All');

    const navItems = [
        { name: 'Overview', icon: SquaresFour },
        { name: 'Inputs', icon: Keyboard },
        { name: 'Tabs', icon: ListDashes },
        { name: 'Billing', icon: Receipt },
        { name: 'Info', icon: Info },
        { name: 'Settings', icon: Gear },
    ];

    // Animation variants for Staggered Children
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <>
            <div className="app-container">
                {/* Sidebar */}
                <nav className="sidebar">
                    <div className="logo-container">
                        {/* Logo con animación en hover, sin el montaje inicial */}
                        <Logo size={0.5} animated={false} />
                    </div>

                    <p className="tagline" style={{ marginBottom: '2rem', opacity: 0.9 }}>human judgement, ai brute force.</p>

                    <ul className="nav-links">
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                className={`nav-item ${activeNav === item.name ? 'active' : ''}`}
                                onClick={() => setActiveNav(item.name)}
                            >
                                <item.icon weight={activeNav === item.name ? "fill" : "regular"} />
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="user-control">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-secondary">
                            <Globe /> Visitar sitio
                        </motion.button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="main-content">
                    <header className="top-header">
                        <div className="search-container">
                            <MagnifyingGlass className="search-icon" />
                            <input type="text" className="search-input" placeholder="Search invoices" />
                        </div>
                        <div className="header-actions">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-icon">
                                <Bell />
                            </motion.button>
                            <motion.div whileHover={{ scale: 1.05 }} className="avatar" style={{ background: 'var(--accent-orange)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', fontWeight: 600 }}>
                                JR
                            </motion.div>
                        </div>
                    </header>

                    <motion.div
                        className="content-wrapper"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={itemVariants} className="hero-section">
                            <h2 className="headline-1">
                                El sistema hace el<br />
                                <span className="chromatic">esfuerzo bruto</span>,<br />
                                tú cierras el trato.
                            </h2>
                            <p className="subhead-1">
                                Integrar la inteligencia artificial en las pequeñas y medianas empresas de forma invisible y sin fricción, absorbiendo toda la complejidad tecnológica.
                            </p>
                        </motion.div>

                        <div className="components-grid">
                            {/* Controls Card */}
                            <motion.div variants={itemVariants} className="card glass-card">
                                <div className="card-header">
                                    <h3 className="subhead-2">System Controls</h3>
                                    <button className="btn btn-icon btn-small"><DotsThree /></button>
                                </div>
                                <div className="controls-list">
                                    <div className="control-row">
                                        <span className="label-1">AI Automated Triage</span>
                                        <label className="switch switch-dark">
                                            <input type="checkbox" defaultChecked />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="control-row">
                                        <span className="label-1">Human-in-the-Loop</span>
                                        <label className="switch switch-cream">
                                            <input type="checkbox" defaultChecked />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                    <div className="control-row">
                                        <span className="label-1">Frictionless Mode</span>
                                        <label className="switch switch-beige">
                                            <input type="checkbox" />
                                            <span className="slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Actions Card */}
                            <motion.div variants={itemVariants} className="card glass-card">
                                <div className="card-header">
                                    <h3 className="subhead-2">Quick Actions</h3>
                                </div>
                                <div className="actions-group">
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary">
                                        <WarningCircle /> Alerts
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-accent">
                                        <CreditCard /> Billing
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-outline">
                                        <ImageIcon /> Buscar imagen
                                    </motion.button>
                                </div>

                                <div className="chips-container mt-4">
                                    <h4 className="label-1 mb-2">Filters (Chips)</h4>
                                    <div className="chips-list">
                                        {['All', 'Pending', 'Approved', 'Errors'].map(chip => (
                                            <span
                                                key={chip}
                                                className={`chip ${activeChip === chip ? 'active' : ''}`}
                                                onClick={() => setActiveChip(chip)}
                                            >
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Metrics Card */}
                            <motion.div variants={itemVariants} className="card glass-card span-2">
                                <div className="card-header">
                                    <h3 className="subhead-2">Performance Metrics</h3>
                                    <div className="tab-list">
                                        {['Daily', 'Weekly', 'Monthly'].map(tab => (
                                            <button
                                                key={tab}
                                                className={`tab ${activeTab === tab ? 'active' : ''}`}
                                                onClick={() => setActiveTab(tab)}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="metrics-grid"
                                    >
                                        <div className="metric-item">
                                            <span className="measure-1">Processed Invoices</span>
                                            <span className="value-1">{activeTab === 'Daily' ? '1,204' : activeTab === 'Weekly' ? '8,412' : '36,589'}</span>
                                        </div>
                                        <div className="metric-item">
                                            <span className="measure-1">Time Saved (hrs)</span>
                                            <span className="value-1">{activeTab === 'Daily' ? '142' : activeTab === 'Weekly' ? '985' : '4,280'}</span>
                                        </div>
                                        <div className="metric-item">
                                            <span className="measure-1">Human Interventions</span>
                                            <span className="value-1">{activeTab === 'Daily' ? '12' : activeTab === 'Weekly' ? '84' : '315'}</span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                            </motion.div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </>
    );
};
