document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('sliderTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let index = 0;

    function getCardsPerView() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    function updateSliderPosition() {
        const cardsPerView = getCardsPerView();
        const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 20; // width + gap
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const totalCards = track.children.length;
        const maxIndex = totalCards - getCardsPerView();
        if (index < maxIndex) {
            index++;
        } else {
            index = 0; // Loop back
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
        } else {
            const totalCards = track.children.length;
            index = totalCards - getCardsPerView(); // Loop to end
        }
        updateSliderPosition();
    });

    // Handle viewport resize adaptations gracefully
    window.addEventListener('resize', () => {
        index = 0; 
        updateSliderPosition();
    });
});