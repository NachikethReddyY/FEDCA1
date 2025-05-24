document.addEventListener('DOMContentLoaded', function() {
//    This ensures the script runs only after the HTML document has been fully loaded. 
    

// Mobile navigation toggle
    const burger = document.querySelector('.burger');
    //burger refers to the element with the class .burger (usually a hamburger icon for mobile menus). 
    const nav = document.querySelector('.nav-links');
    // nav refers to the element with the class .nav-links (the navigation menu).
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });
//         Adds a click event listener:Checks if both elements exist.
// When the burger icon is clicked, it toggles the active class on both the navigation menu and the burger icon.
// This is typically used to show/hide the navigation menu on mobile devices.
    }
    // Principles Gallery Navigation
    const galleryItems = document.querySelectorAll('.gallery-item');
    const principleCards = document.querySelectorAll('.principle-card');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    if (galleryItems.length > 0 && principleCards.length > 0) {
        // Show the card corresponding to the clicked gallery item
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const cardId = item.getAttribute('data-card');
                
                // Remove active class from all cards and gallery items
                principleCards.forEach(card => card.classList.remove('active'));
                galleryItems.forEach(galleryItem => galleryItem.classList.remove('active'));
                
                // Add active class to the selected card and gallery item
                document.getElementById(cardId).classList.add('active');
                item.classList.add('active');
            });
        });
        
        // Handle arrow navigation
        if (leftArrow && rightArrow) {
            leftArrow.addEventListener('click', () => {
                navigateGallery('prev');
            });
            
            rightArrow.addEventListener('click', () => {
                navigateGallery('next');
            });
        }
    }
    
    // Function to navigate through the gallery
    function navigateGallery(direction) {
        const activeItem = document.querySelector('.gallery-item.active');
        if (!activeItem) return;
        
        let nextItem;
        
        if (direction === 'next') {
            nextItem = activeItem.nextElementSibling;
            if (!nextItem) {
                nextItem = document.querySelector('.gallery-item:first-child');
            }
        } else {
            nextItem = activeItem.previousElementSibling;
            if (!nextItem) {
                nextItem = document.querySelector('.gallery-item:last-child');
            }
        }
        
        if (nextItem) {
            const cardId = nextItem.getAttribute('data-card');
            
            // Remove active class from all cards and gallery items
            principleCards.forEach(card => card.classList.remove('active'));
            galleryItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to the selected card and gallery item
            document.getElementById(cardId).classList.add('active');
            nextItem.classList.add('active');
            
            // Scroll the gallery to center the active item
            nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
    
    // Animate Statistics Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Animate counter
        function animateCounter(element) {
            const target = parseFloat(element.getAttribute('data-target'));
            const duration = 2000; // ms
            const step = (target / duration) * 10;
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target || target === 0) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = current.toFixed(1);
            }, 10);
        }
        
        // Start animation when scrolled into view
        function handleScroll() {
            statNumbers.forEach(statNumber => {
                if (isInViewport(statNumber) && !statNumber.classList.contains('animated')) {
                    animateCounter(statNumber);
                    statNumber.classList.add('animated');
                }
            });
        }
        
        // Initial check
        handleScroll();
        
        // Check on scroll
        window.addEventListener('scroll', handleScroll);
    }
    
    // Add animations to elements when they scroll into view
    const animatedElements = document.querySelectorAll('.benefit-card, .timeline-item, .hack-card, .value-card, .goal-card, .challenge-card, .plan-step');
    
    if (animatedElements.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Add visible class when scrolled into view
        function handleAnimationScroll() {
            animatedElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('visible')) {
                    element.classList.add('visible');
                    element.style.opacity = '1';
                }
            });
        }
        
        // Initial check
        handleAnimationScroll();
        
        // Check on scroll
        window.addEventListener('scroll', handleAnimationScroll);
    }
});
