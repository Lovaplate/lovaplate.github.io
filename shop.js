let cart = [];

async function loadProducts() {
  const res = await fetch("products.json");
  const products = await res.json();
  window.products = products; // store globally

  const container = document.getElementById("products");
  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-details">
        <h3>${product.name}</h3>
        <p class="price">€${product.price.toFixed(2)}</p>
        <button class="buy" onclick="addToCart('${product.id}')">Ajouter au Panier</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function addToCart(id) {
  const product = window.products.find(p => p.id === id);
  cart.push(product);
  document.getElementById("cart-count").textContent = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cart-count").textContent = cart.length;
  updateCartUI();
}

function updateCartUI() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  list.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - €${item.price.toFixed(2)}
      <button id="remove" onclick="removeFromCart(${index})">X</button>
    `;
    list.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total.toFixed(2);
}

document.getElementById("cart-btn").addEventListener("click", () => {
  updateCartUI();
  document.getElementById("cart-modal").style.display = "flex";
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target.id === "cart-modal") {
    document.getElementById("cart-modal").style.display = "none";
  }
});

window.addEventListener("DOMContentLoaded", loadProducts);
