let currentSlide = 0;
let slideInterval;
const totalSlides = 5;

const heroSlider = document.querySelector('.hero-slider');
const sliderDots = document.querySelectorAll('.slider-dot');
const sliderContent = document.querySelector('.slider-content');


function showSlide(index){
    currentSlide = index;
    sliderDots.forEach((dot, i) =>{
        dot.classList.remove('active');
        void dot.offsetWidth;
        if (i === index){
            dot.classList.add('active');
        }
    });
    sliderContent.classList.remove('slide-in-right');
    void sliderContent.offsetWidth;
    sliderContent.classList.add('slide-in-right');
}

function nextSlide(){
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 4000);
}

function stopSlider() {
    clearInterval(slideInterval);
}


sliderDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        stopSlider();
        showSlide(i);
        startSlider();
    });
});


showSlide(0);
startSlider();


// Diyorbek nurullayev dom 2.21