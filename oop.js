class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem Class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    totalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart Class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.totalPrice(), 0);
    }

    displayCart() {
        const cartDisplay = document.getElementById("cartDisplay");
        cartDisplay.innerHTML = ''; // Clear previous cart display

        if (this.items.length === 0) {
            cartDisplay.innerHTML = "<p>The cart is empty.</p>";
        } else {
            let cartContent = '';
            this.items.forEach(item => {
                cartContent += `<p>${item.product.name} - Quantity: ${item.quantity}, Total: $${item.totalPrice().toFixed(2)}</p>`;
            });
            cartContent += `<p><strong>Total cart value: $${this.getTotal().toFixed(2)}</strong></p>`;
            cartDisplay.innerHTML = cartContent;
        }
    }
}

// Create products
const bag = new Product(1, 'bag', 50, 1);
const socks = new Product(2, 'socks', 10, 1);
const basket = new Product(3, 'basket', 100, 1);

// Create shopping cart
const cart = new ShoppingCart();

// Function to add items to the cart
function addItemToCart(productId, productName, productPrice, quantity) {
    const product = new Product(productId, productName, productPrice);
    cart.addItem(product, quantity);
    cart.displayCart();
}

// Function to remove items from the cart
function removeItemFromCart(productId) {
    cart.removeItem(productId);
    cart.displayCart();
}

// Initial display
cart.displayCart();