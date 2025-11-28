
    function animateCounter(element) {
        if (element.classList.contains('animated')) return;
        element.classList.add('animated');

        const target = +element.getAttribute('data-target');
        const duration = 2000;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
           
            const current = Math.min(target, Math.floor((progress / duration) * target));
            
            element.textContent = current.toLocaleString();

            if (progress < duration) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        requestAnimationFrame(step);
    }

   
    document.addEventListener('DOMContentLoaded', () => {
        const section = document.getElementById('placementSection');
        const counters = document.querySelectorAll('#placementSection .counter-value');
        let animationTriggered = false;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animationTriggered) {
                    animationTriggered = true;
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1
        });

        if (section) {
            observer.observe(section);
        }
    });
