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
if (!document.getElementById("productModal")) {
  const modalHtml = `
    <div id="productModal" class="modal-overlay" style="display:none;">
      <div class="modal-content">
        <span class="close-modal" style="cursor:pointer;">&times;</span>
        <img id="modalImg" src="" alt="" style="max-width:200px;"/>
        <h2 id="modalTitle"></h2>
        <p id="modalPrice"></p>
        <div id="modalRating"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHtml);
}

function openProductModal(parent) {
  const image = parent.querySelector('img:not([src*="Heart"], [src*="Eye"])');
  const title = parent.querySelector(
    ".product__name, .our__name, .card__description h4"
  );
  const price = parent.querySelector(".current__price, .our__price-count");
  const rating = parent.querySelector(".product__rating");
  document.getElementById("modalImg").src = image ? image.src : "";
  document.getElementById("modalTitle").textContent = title
    ? title.textContent
    : "";
  document.getElementById("modalPrice").textContent = price
    ? price.textContent
    : "";
  document.getElementById("modalRating").innerHTML = rating
    ? rating.innerHTML
    : "";
  document.getElementById("productModal").style.display = "flex";
}

function setupProductModalEvents() {
  document
    .querySelectorAll(
      '.wishlist__btn img, .best__view, .card__image img[src$="Eye.svg"], .our__image img[src$="Eye.svg"]'
    )
    .forEach(function (img) {
      if (img.src.includes("Eye")) {
        img.style.cursor = "pointer";
        img.addEventListener("click", function (e) {
          let parent =
            img.closest(".product__item") ||
            img.closest(".our__item") ||
            img.closest(".card__item");
          if (parent) openProductModal(parent);
        });
      }
    });
}

setupProductModalEvents();

if (document.querySelector(".close-modal")) {
  document.querySelector(".close-modal").onclick = function () {
    document.getElementById("productModal").style.display = "none";
  };
}
if (document.getElementById("productModal")) {
  document.getElementById("productModal").onclick = function (e) {
    if (e.target === this) this.style.display = "none";
  };
}
//  Modal end

// --- Flash Sales Wishlist (Minimal) ---
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
}
function setWishlist(wishlist) {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}
function isInWishlist(productName) {
  return getWishlist().some((item) => item.name === productName);
}
function toggleWishlist(product) {
  let wishlist = getWishlist();
  const idx = wishlist.findIndex((item) => item.name === product.name);
  if (idx === -1) wishlist.push(product);
  else wishlist.splice(idx, 1);
  setWishlist(wishlist);
}
function updateFlashSalesHearts() {
  document
    .querySelectorAll(
      '.products .product__item .wishlist__btn img[src$="Heart.svg"]'
    )
    .forEach(function (heart) {
      let parent = heart.closest(".product__item");
      if (!parent) return;
      let name = parent.querySelector(".product__name");
      if (!name) return;
      if (isInWishlist(name.textContent.trim())) {
        heart.classList.add("active-heart");
      } else {
        heart.classList.remove("active-heart");
      }
    });
}
function setupFlashSalesWishlistEvents() {
  document
    .querySelectorAll(
      '.products .product__item .wishlist__btn img[src$="Heart.svg"]'
    )
    .forEach(function (heart) {
      heart.style.cursor = "pointer";
      heart.onclick = function () {
        let parent = heart.closest(".product__item");
        if (!parent) return;
        let name = parent.querySelector(".product__name");
        let img = parent.querySelector('img:not([src*="Heart"], [src*="Eye"])');
        let price = parent.querySelector(".current__price");
        let original = parent.querySelector(".original__price");
        let discount = parent.querySelector(".product__discount");
        let product = {
          name: name ? name.textContent.trim() : "",
          img: img ? img.src : "",
          price: price ? price.textContent.trim() : "",
          original: original ? original.textContent.trim() : "",
          discount: discount ? discount.textContent.trim() : "",
        };
        toggleWishlist(product);
        updateFlashSalesHearts();
      };
    });
}
window.addEventListener("DOMContentLoaded", function () {
  updateFlashSalesHearts();
  setupFlashSalesWishlistEvents();
});
// --- End Flash Sales Wishlist ---
