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
