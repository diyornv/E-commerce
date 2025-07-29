// Cart page functionality
function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cartpage");

  if (!cartContainer) return;

  // Find the header and items
  const header = cartContainer.querySelector(".cartpage__header");
  const existingItems = cartContainer.querySelectorAll(".cartpage__item");

  // Remove existing items (except header)
  existingItems.forEach((item) => item.remove());

  // Add cart items
  cart.forEach((product) => {
    const itemHtml = `
            <div class="cartpage__item">
                <div class="product">
                    <button class="remove-icon" onclick="removeFromCart('${product.name}')">
                        <img src="../assets/svg/remove-cart.svg" alt="" />
                    </button>
                    <div class="cartpage__img">
                        <img src="${product.image}" alt="" />
                    </div>
                    <div class="cartpage__name">${product.name}</div>
                </div>
                <div class="cartpage__price">${product.price}</div>
                <div class="quantity">
                    <input type="number" class="cartpage__input" value="01" />
                </div>
                <div class="subtotal">${product.price}</div>
            </div>
        `;

    // Insert after header
    header.insertAdjacentHTML("afterend", itemHtml);
  });

  // Update total
  updateCartTotal();
}

function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace("$", ""));
    return sum + price;
  }, 0);

  const totalElement = document.querySelector(
    ".cart-total .subtotal-cart:last-child p:last-child"
  );
  if (totalElement) {
    totalElement.textContent = `$${total}`;
  }
}

// Initialize cart page
document.addEventListener("DOMContentLoaded", function () {
  displayCart();
});
