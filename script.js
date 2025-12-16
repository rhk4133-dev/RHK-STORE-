const products = [
  { id: 1, name: 'Fresh Tomatoes', price: 30, image: 'https://via.placeholder.com/100?text=Tomatoes' },
  { id: 2, name: 'Bananas', price: 20, image: 'https://via.placeholder.com/100?text=Bananas' },
  { id: 3, name: 'Onions', price: 25, image: 'https://via.placeholder.com/100?text=Onions' },
  { id: 4, name: 'Potatoes', price: 15, image: 'https://via.placeholder.com/100?text=Potatoes' },
  { id: 5, name: 'Apples', price: 50, image: 'https://via.placeholder.com/100?text=Apples' },
  { id: 6, name: 'Carrots', price: 35, image: 'https://via.placeholder.com/100?text=Carrots' },
];

const productsContainer = document.getElementById('products');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');

let cart = 0;

function renderProducts(list) {
  productsContainer.innerHTML = '';
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-name">${product.name}</div>
      <div class="product-price">₹${product.price}</div>
      <button class="add-to-cart" onclick="addToCart()">Add to Cart</button>
    `;

    productsContainer.appendChild(card);
  });
}

function addToCart() {
  cart++;
  cartCount.textContent = cart;
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// Initial render
renderProducts(products);
