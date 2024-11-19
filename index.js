import { products } from "./products.js";

window.onload = function () {
  loadCartCount();
  disProducts(products);
};

export function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  document.querySelector(".cart-count").innerHTML = cartQuantity;
}

export function loadCartCount() {
  let cartQuantity = localStorage.getItem("cartCount");
  if (!cartQuantity) {
    cartQuantity = 0;
  }
  document.querySelector(".cart-count").innerHTML = cartQuantity;
}

export function addToCart(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity: quantity });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  let cartCount = cart.reduce((total, product) => total + product.quantity, 0);
  localStorage.setItem("cartCount", cartCount);
}

const filterBtn = document.querySelectorAll(".filter button");
const productsContainer = document.querySelectorAll(
  ".products-container .product"
);

console.log(productsContainer);

filterBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    removeActive(event);
    manageProducts(event);
  });
});

function removeActive(event) {
  filterBtn.forEach((btn) => btn.classList.remove("active"));
  event.currentTarget.classList.add("active");
}

function manageProducts(event) {
  const selectedCategory = event.currentTarget.dataset.cat;
  let filteredProducts = [];
  if (selectedCategory === "all") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
  }

  console.log(filteredProducts);

  disProducts(filteredProducts);
}

function disProducts(filteredProducts) {
  let productsHTML = "";

  filteredProducts.forEach((product) => {
    productsHTML += `
    <div class="product" data-cat="${product.category}">
  <div class="img-container">
    <img class="product-image" src="${product.image}" alt="${product.name}" />
  </div>

  <div class="product-info">
    <h2 class="product-name ">${product.name}</h2>
    <p class="product-price">$${(product.priceCents/10).toFixed(2)}</p>
    <div class="product-quantity-container">
      <select class="product-quantity" data-product-id="${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
  </div>

  <div class="product-actions">
    <button class="add-to-cart-button" data-product-id="${product.id}">
      Add to Cart
    </button>
    <div class="added-to-cart hidden">
      <img
        src="./images/icons/checkmark.png"
        style="width: 20px; height: 20px"
      />
      Added
    </div>
  </div>
</div>

    `;
  });

  document.querySelector(".products-container").innerHTML = productsHTML;

  document.querySelectorAll(".add-to-cart-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      let productContainer = event.target.closest(".product");
      let selectedQuantity =
        productContainer.querySelector(".product-quantity").value;
      let productId = event.target.dataset.productId;
      addToCart(productId, parseInt(selectedQuantity));
      updateCartCount();
      let addedToCart = productContainer.querySelector(".added-to-cart");
      addedToCart.classList.remove("hidden");
      setTimeout(() => {
        addedToCart.classList.add("hidden");
      }, 2000);
    });
  });
}

loadCartCount();
disProducts(products);
