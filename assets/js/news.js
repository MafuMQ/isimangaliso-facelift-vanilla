// News page specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // News filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsArticles = document.querySelectorAll('.news-article');
    
    if (filterButtons.length > 0 && newsArticles.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter articles
                newsArticles.forEach(article => {
                    const category = article.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        article.style.display = 'block';
                        article.style.animation = 'fadeInUp 0.6s ease forwards';
                    } else {
                        article.style.display = 'none';
                    }
                });
                
                // Update results count (optional)
                updateResultsCount(filter);
            });
        });
    }
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    let articlesLoaded = 6; // Initial number of articles shown
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, this would load more articles from a server
            // For this demo, we'll show a message
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification('All articles have been loaded!', 'info');
                this.style.display = 'none';
            }, 1000);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // In a real implementation, this would send the email to a server
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Search functionality for articles
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search articles...';
        searchInput.className = 'news-search';
        
        // Add search styles
        Object.assign(searchInput.style, {
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '25px',
            width: '250px',
            margin: '0 1rem'
        });
        
        const filterControls = document.querySelector('.filter-controls');
        if (filterControls) {
            filterControls.appendChild(searchInput);
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                newsArticles.forEach(article => {
                    const title = article.querySelector('.article-title').textContent.toLowerCase();
                    const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
                    const category = article.querySelector('.article-category').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                        article.style.display = 'block';
                    } else {
                        article.style.display = 'none';
                    }
                });
            });
        }
    }
    
    // Initialize search functionality
    addSearchFunctionality();
    
    // Update results count
    function updateResultsCount(filter) {
        let visibleCount = 0;
        newsArticles.forEach(article => {
            if (article.style.display !== 'none') {
                visibleCount++;
            }
        });
        
        // Show count in console for debugging
        console.log(`Showing ${visibleCount} articles for filter: ${filter}`);
    }
    
    // Article sharing functionality
    function addSharingButtons() {
        newsArticles.forEach(article => {
            const title = article.querySelector('.article-title').textContent;
            const url = window.location.href;
            
            const shareContainer = document.createElement('div');
            shareContainer.className = 'article-share';
            shareContainer.style.marginTop = '1rem';
            
            // Twitter share button
            const twitterBtn = document.createElement('a');
            twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            twitterBtn.target = '_blank';
            twitterBtn.innerHTML = '🐦 Tweet';
            twitterBtn.style.marginRight = '10px';
            twitterBtn.style.textDecoration = 'none';
            twitterBtn.style.color = '#1da1f2';
            
            // Facebook share button
            const facebookBtn = document.createElement('a');
            facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            facebookBtn.target = '_blank';
            facebookBtn.innerHTML = '📘 Share';
            facebookBtn.style.textDecoration = 'none';
            facebookBtn.style.color = '#4267b2';
            
            shareContainer.appendChild(twitterBtn);
            shareContainer.appendChild(facebookBtn);
            
            const articleContent = article.querySelector('.article-content');
            if (articleContent) {
                articleContent.appendChild(shareContainer);
            }
        });
    }
    
    // Add sharing buttons to articles
    addSharingButtons();
    
    // Smooth scroll to articles when filter is applied
    function scrollToArticles() {
        const newsSection = document.querySelector('.news-section');
        if (newsSection) {
            newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Add event listener to filter buttons for smooth scrolling
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(scrollToArticles, 100);
        });
    });
    
    // Reading progress indicator for long articles
    function addReadingProgress() {
        const articles = document.querySelectorAll('.featured-post, .news-article');
        
        articles.forEach(article => {
            article.addEventListener('mouseenter', function() {
                // Add a subtle highlight effect
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            article.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Initialize reading progress
    addReadingProgress();
    
    // Auto-refresh news (in a real app, this would check for new articles)
    function checkForUpdates() {
        // In a real implementation, this would make an API call
        console.log('Checking for news updates...');
    }
    
    // Check for updates every 5 minutes
    setInterval(checkForUpdates, 5 * 60 * 1000);
    
    console.log('News page functionality loaded successfully');
});

// Utility function for showing notifications (if not already defined in main.js)
function showNotification(message, type = 'info') {
    // Check if function already exists
    if (window.showNotification) {
        return window.showNotification(message, type);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '6px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    if (type === 'error') {
        notification.style.background = '#e74c3c';
    } else if (type === 'success') {
        notification.style.background = '#27ae60';
    } else {
        notification.style.background = '#3498db';
    }

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}