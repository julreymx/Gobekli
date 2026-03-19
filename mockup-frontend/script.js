/**
 * GÖBEKLI Frontend Mockup - Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Sidebar Active State
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // 2. Chips Selection
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    });

    // 3. Tabs Switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Subtle transition effect on metrics
            const metrics = document.querySelectorAll('.metric-item');
            metrics.forEach((metric, index) => {
                metric.style.opacity = '0';
                metric.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    metric.style.transition = 'all 0.4s ease';
                    metric.style.opacity = '1';
                    metric.style.transform = 'translateY(0)';
                }, 50 * index);
            });
        });
    });

    // 4. Micro-interactions for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.96)';
        });
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // 5. Hero Card Entry Animation
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (100 * index));
    });

});
