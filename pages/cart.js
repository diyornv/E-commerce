function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cartpage");

  if (!cartContainer) return;

  const header = cartContainer.querySelector(".cartpage__header");
  const existingItems = cartContainer.querySelectorAll(".cartpage__item");

  existingItems.forEach((item) => item.remove());

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
                    <input type="number" class="cartpage__input" value="01" min="1" />
                </div>
                <div class="subtotal">${product.price}</div>
            </div>
        `;

    header.insertAdjacentHTML("afterend", itemHtml);
  });

  updateCartTotal();
  addQuantityListeners(); // YANGI: quantity listenerlarni har safar yangilash
}

function removeFromCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function updateCartTotal() {
  const items = document.querySelectorAll(".cartpage__item");
  let total = 0;
  items.forEach((item) => {
    const subtotalText = item
      .querySelector(".subtotal")
      .textContent.replace("$", "");
    total += parseFloat(subtotalText) || 0;
  });

  // Subtotal va Total joylarini aniq tanlab, har ikkalasini ham yangilaymiz
  const subtotalElement = document.querySelector(
    ".cart-total .subtotal-cart:nth-child(2) p:last-child"
  ); // Subtotal
  const totalElement = document.querySelector(
    ".cart-total .subtotal-cart:nth-child(4) p:last-child"
  ); // Total

  if (subtotalElement) {
    subtotalElement.textContent = `$${total}`;
  }
  if (totalElement) {
    totalElement.textContent = `$${total}`;
  }
}

function addQuantityListeners() {
  const quantityInputs = document.querySelectorAll(".cartpage__input");
  quantityInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const item = input.closest(".cartpage__item");
      const priceText = item
        .querySelector(".cartpage__price")
        .textContent.replace("$", "");
      const price = parseFloat(priceText);
      const quantity = parseInt(input.value) || 1;
      const subtotal = price * quantity;
      item.querySelector(".subtotal").textContent = subtotal + "$";
      updateCartTotal();
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  displayCart();
});
