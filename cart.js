import { products } from "./products.js";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

window.onload = function () {
  loadCartCount();
  totalPrice();
};

displayCartProducts();

function displayCartProducts() {
  let CartProductsHTML = "";
  cart.forEach((item1) => {
    const match = products.find((item2) => item2.id === item1.id);
    console.log(cart);
    document.querySelector(".cart-count").innerHTML = cart.length;
    CartProductsHTML += `
    <div class="cart-containerr">
    <div class="cart-list">
        <div class="delete">
          <img class="delete-icon"
            src="./images/icons/delete_62dp_7A2917_FILL0_wght400_GRAD0_opsz48.png" alt="delete" 
            data-id="${match.id}">
        </div>
        <div class="cart-product">
          <div class="product-image">
            <img class="product-imagee" src="${match.image}"
              alt="" />
          </div>
          <div class="product-info">
            <p class="prd-name">${match.name}</p>
            <p class="prd-price">price per one: $${(match.priceCents/10).toFixed(2)}</p>
            <p class="prd-quantity">Quantity: ${item1.quantity}</p>
          </div>
        </div>
        
        <div>
          <p class="total">total of ${item1.quantity}: $${(match.priceCents/10).toFixed(2) * item1.quantity}</p>
        </div>
      </div>
    </div>
    `;
  });  
  document.querySelector(".cart-containerr").innerHTML = CartProductsHTML;

  const deleteIcons = document.querySelectorAll(".delete-icon");
  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const productId = parseInt(e.target.getAttribute("data-id"));
      removeProductFromCart(productId);
    });
  });

  totalPrice();

};

addEventListener("click", (e) => {
  console.log(e.target.getAttribute("data-id"));
  console.log("clicked");
  removeProductFromCart(e.target.getAttribute("data-id"));
})

function removeProductFromCart(productId) {
  cart = cart.filter((match) => match.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartProducts();
  totalPrice();
}

function totalPrice() {
  let total = 0;
  cart.forEach((item) => {
    const match = products.find((product) => product.id === item.id);
    total += +`${(match.priceCents / 10).toFixed(2) * item.quantity}`;
    console.log(total);
  });
  document.querySelector(".total-price").innerHTML = total;
  return total;
}