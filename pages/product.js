// Kichik rasm bosilganda asosiy rasmni o'zgartirish va active klass boshqaruvi
const thumbs = document.querySelectorAll(".thumb img");
const mainImg = document.getElementById("main-image");
const thumbDivs = document.querySelectorAll(".thumb");

thumbs.forEach((thumb, idx) => {
  thumb.addEventListener("click", function () {
    const src = this.getAttribute("src");
    const match = src.match(/product(\d+)\.png$/);
    mainImg.src = match ? `../assets/imgs/product${match[1]}.png` : src;
    thumbDivs.forEach((t) => t.classList.remove("active"));
    thumbDivs[idx].classList.add("active");
  });
});

// Rang tanlash funksiyasi
const colorBtns = document.querySelectorAll(".color");
let selectedColor = null;
colorBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    colorBtns.forEach((b) => b.classList.remove("selected"));
    this.classList.add("selected");
    selectedColor = this.classList.contains("color-black") ? "black" : "red";
    // Faqat bitta log chiqsin
    console.log(`Tanlangan rang: ${selectedColor}`);
  });
});

// Miqdor o'zgartirish funksiyasi
const qtySpan = document.getElementById("qty");
const plusBtn = document.getElementById("increase");
const minusBtn = document.getElementById("decrease");
let qty = parseInt(qtySpan.textContent) || 1;

plusBtn.addEventListener("click", () => {
  qty++;
  qtySpan.textContent = qty;
});
minusBtn.addEventListener("click", () => {
  if (qty > 1) qty--;
  qtySpan.textContent = qty;
});

// Buy Now tugmasi funksiyasi
const buyBtn = document.querySelector(".buy-btn");
buyBtn.addEventListener("click", () => {
  const productName = document.querySelector(".product-info h2").textContent;
  const color = selectedColor ? selectedColor : "tanlanmagan";
  const amount = qty;
  // Faqat bitta buyurtma log chiqsin
  console.log(`Buyurtma: ${productName}, Rang: ${color}, Miqdor: ${amount}`);
});

console.log("JS ishlayapti!");
