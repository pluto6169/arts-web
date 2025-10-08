// Graduate Programs Tabs Functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Function to switch tabs
    function switchTab(tabId) {
        // Remove active class from all buttons and panes
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });

        // Add active class to clicked button and corresponding pane
        const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const activePane = document.getElementById(tabId);

        if (activeBtn && activePane) {
            activeBtn.classList.add('active');
            activePane.classList.add('active');
        }
    }

    // Add click event listeners to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Handle URL hash for direct tab access
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && ['masters', 'phd', 'diploma'].includes(hash)) {
            switchTab(hash);
        }
    }

    // Initial tab setup based on URL hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Add smooth scrolling for better UX
    const tabLinks = document.querySelectorAll('a[href^="#"]');
    tabLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function (e) {
        const activeTab = document.querySelector('.tab-btn.active');
        if (!activeTab) return;

        const tabsArray = Array.from(tabBtns);
        const currentIndex = tabsArray.indexOf(activeTab);

        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            let nextIndex;

            if (e.key === 'ArrowRight') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : tabsArray.length - 1;
            } else {
                nextIndex = currentIndex < tabsArray.length - 1 ? currentIndex + 1 : 0;
            }

            const nextTabId = tabsArray[nextIndex].getAttribute('data-tab');
            switchTab(nextTabId);
            tabsArray[nextIndex].focus();
        }
    });

    // Add touch swipe support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    const tabContent = document.querySelector('.tab-content');

    if (tabContent) {
        tabContent.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        tabContent.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const activeTab = document.querySelector('.tab-btn.active');
            const tabsArray = Array.from(tabBtns);
            const currentIndex = tabsArray.indexOf(activeTab);

            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next tab
                const nextIndex = currentIndex < tabsArray.length - 1 ? currentIndex + 1 : 0;
                const nextTabId = tabsArray[nextIndex].getAttribute('data-tab');
                switchTab(nextTabId);
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous tab
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabsArray.length - 1;
                const prevTabId = tabsArray[prevIndex].getAttribute('data-tab');
                switchTab(prevTabId);
            }
        }
    }
});

// Program card animations
document.addEventListener('DOMContentLoaded', function () {
    const programCards = document.querySelectorAll('.program-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    programCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});