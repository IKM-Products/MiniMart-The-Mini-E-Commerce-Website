const products = [
    // Tech
    { id: 1, name: "Smart Watch", price: 6999, category: "Tech", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
    { id: 2, name: "Wireless Headphones", price: 3499, category: "Tech", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
    { id: 3, name: "Mechanical Keyboard", price: 1999, category: "Tech", img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80" },
    
    // Lifestyle
    { id: 4, name: "Slim Leather Wallet", price: 1049, category: "Lifestyle", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80" },
    { id: 5, name: "Polarized Sunglasses", price: 1499, category: "Lifestyle", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80" },
    { id: 6, name: "Canvas Backpack", price: 1799, category: "Lifestyle", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" },
    
    // Home
    { id: 7, name: "Modern Desk Lamp", price: 1699, category: "Home", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80" },
    { id: 8, name: "Ceramic Coffee Set", price: 1399, category: "Home", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80" },
    { id: 9, name: "Succulent Plant Trio", price: 1199, category: "Home", img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80" },
    
    // Beauty
    { id: 10, name: "Restorative Hair Mask", price: 1999, category: "Beauty", img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80" },
    { id: 11, name: "Clinique Lipstick", price: 949, category: "Beauty", img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80" },
    { id: 12, name: "Moisturizing Facial Gel", price: 799, category: "Beauty", img: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=500&q=80" }
];

let cart = [];

function init() {
    renderCategories();
    displayProducts();
}

function renderCategories() {
    const grid = document.getElementById('category-icons-grid');
    const cats = [
        { name: "All", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&q=80" },
        { name: "Tech", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&q=80" },
        { name: "Lifestyle", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&q=80" },
        { name: "Home", img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200&q=80" },
        { name: "Beauty", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80" }
    ];
    
    grid.innerHTML = cats.map(c => `
        <div class="category-box" onclick="${c.name === 'All' ? 'displayProducts()' : `filterByCategory('${c.name}')`}">
            <img src="${c.img}" alt="${c.name}">
            <p>${c.name}</p>
        </div>
    `).join('');
}

function displayProducts(list = products) {
    const grid = document.getElementById('just-for-you-grid');
    grid.innerHTML = list.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">Rs. ${p.price}</p>
            </div>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function filterByCategory(name) {
    const filtered = products.filter(p => p.category === name);
    displayProducts(filtered);
}

function filterProducts() {
    const val = document.getElementById('search-bar').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(val));
    displayProducts(filtered);
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('overlay');
    
    drawer.classList.toggle('open');
    overlay.style.display = drawer.classList.contains('open') ? 'block' : 'none';
}

function addToCart(id) {
    const p = products.find(i => i.id === id);
    if (p) {
        cart.push(p);
        document.getElementById('cart-count').innerText = cart.length;
        updateCartUI();
    }
}

function updateCartUI() {
    const list = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align:center; padding:20px; color:#999;">Your cart is empty</p>';
    } else {
        list.innerHTML = cart.map((item, index) => `
            <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #eee;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${item.img}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;">
                    <span>${item.name}</span>
                </div>
                <strong>Rs. ${item.price}</strong>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById('cart-total').innerText = total;
}

function processCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some items before checking out.");
        return;
    }

    const total = cart.reduce((s, i) => s + i.price, 0);
    alert(`Thank you for your purchase! \nTotal Amount: Rs. ${total} \nYour order has been placed successfully.`);

    cart = [];
    document.getElementById('cart-count').innerText = '0';
    updateCartUI();
    toggleCart();
}

document.addEventListener('DOMContentLoaded', init);