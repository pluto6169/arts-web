// News Single Page Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Share functionality
    const shareLinks = document.querySelectorAll('.share-link');

    shareLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const platform = this.classList[1]; // facebook, twitter, etc.
            const url = window.location.href;
            const title = document.title;

            let shareUrl = '';

            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                    break;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });

    // Print functionality
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> طباعة الخبر';
    printBtn.className = 'btn btn-secondary';
    printBtn.style.marginRight = '10px';

    printBtn.addEventListener('click', function () {
        window.print();
    });

    // Add print button to CTA section
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaSection.appendChild(printBtn);
    }

    // Reading time estimation
    function calculateReadingTime() {
        const article = document.querySelector('.news-content');
        if (!article) return;

        const text = article.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

        const readingTimeElement = document.createElement('div');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> وقت القراءة: ${readingTime} دقيقة`;
        readingTimeElement.style.cssText = `
            background: var(--bg-light);
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 14px;
            color: var(--text-light);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 20px;
        `;

        const newsMeta = document.querySelector('.news-meta');
        if (newsMeta) {
            newsMeta.appendChild(readingTimeElement);
        }
    }

    calculateReadingTime();

    // Table of contents for long articles
    function generateTableOfContents() {
        const headings = document.querySelectorAll('.news-content h2');
        if (headings.length < 3) return; // Only generate for articles with 3+ headings

        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.innerHTML = `
            <h3>محتويات المقال</h3>
            <ul>
                ${Array.from(headings).map((heading, index) => `
                    <li>
                        <a href="#section-${index}">${heading.textContent}</a>
                    </li>
                `).join('')}
            </ul>
        `;

        toc.style.cssText = `
            background: var(--bg-light);
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-right: 4px solid var(--secondary-color);
        `;

        // Add IDs to headings
        headings.forEach((heading, index) => {
            heading.id = `section-${index}`;
        });

        const newsContent = document.querySelector('.news-content');
        if (newsContent) {
            newsContent.insertBefore(toc, newsContent.firstChild);
        }
    }

    generateTableOfContents();
});