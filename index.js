// Diyorbek Nurullayev 2.21

const slides = document.querySelectorAll(".slider-content");
const dots = document.querySelectorAll(".slider-dot");
let currentSlide = 0;
const slideCount = slides.length;

function showSlide(index) {
  if (index < 0) {
    currentSlide = slideCount - 1;
  } else if (index >= slideCount) {
    currentSlide = 0;
  } else {
    currentSlide = index;
  }

  slides.forEach((slide, idx) => {
    slide.style.display = idx === currentSlide ? "block" : "none";
  });

  dots.forEach((el, idx) => {
    el.classList.toggle("active", idx === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

dots.forEach((el, index) => {
  el.addEventListener("click", () => {
    showSlide(index);
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
  });
});

let slideInterval = setInterval(nextSlide, 4000);

document.querySelector(".hero-slider").addEventListener("mouseenter", () => {
  clearInterval(slideInterval);
});

showSlide(0);

// Timer section

function getDeadline() {
  let deadline = localStorage.getItem("flashSaleDeadline");
  if (!deadline) {
    const now = new Date();
    now.setSeconds(0, 0);
    now.setTime(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    deadline = now.toISOString();
    localStorage.setItem("flashSaleDeadline", deadline);
  }

  return new Date(deadline);
}

function updateTimer() {
  const deadline = getDeadline();
  const now = new Date();
  let diff = deadline - now;

  if (diff <= 0) {
    clearInterval(timerInterval);
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    alert("Aksiya Yakunlandi!");
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );
}

let timerInterval = setInterval(updateTimer, 1000);
updateTimer;

// Diyorbek nurullayev
