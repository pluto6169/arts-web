// News Page Filtering and Search
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-page-card');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    let currentCategory = 'all';
    let searchTerm = '';

    // Filter by category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            currentCategory = this.dataset.category;
            filterNews();
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', function () {
        searchTerm = searchInput.value.toLowerCase();
        filterNews();
    });

    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            searchTerm = this.value.toLowerCase();
            filterNews();
        }
    });

    function filterNews() {
        newsCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();

            const categoryMatch = currentCategory === 'all' || category === currentCategory;
            const searchMatch = searchTerm === '' || title.includes(searchTerm) || content.includes(searchTerm);

            if (categoryMatch && searchMatch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            // Simulate subscription
            alert(`شكراً لك على الاشتراك في النشرة الإخبارية! سيتم إرسال الأخبار إلى: ${email}`);
            this.reset();
        });
    }
});