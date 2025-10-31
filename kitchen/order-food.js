/* Food Ordering JavaScript */

// Check authentication
const user = checkAuth('customer');
if (user) {
    document.getElementById('userName').textContent = user.name.split(' ')[0];
}

// Food menu items
const foodMenu = [
    { name: 'Waffle', price: 150, icon: 'fa-stroopwafel', description: 'Golden crispy waffles with toppings' },
    { name: 'Burger', price: 200, icon: 'fa-hamburger', description: 'Juicy beef burger with fries' },
    { name: 'Fries', price: 100, icon: 'fa-french-fries', description: 'Crispy golden french fries' },
    { name: 'Pasta', price: 250, icon: 'fa-bowl-rice', description: 'Creamy Italian pasta' },
    { name: 'Steak', price: 500, icon: 'fa-drumstick-bite', description: 'Premium grilled steak' },
    { name: 'Salad', price: 180, icon: 'fa-salad', description: 'Fresh garden salad' },
    { name: 'Pizza', price: 350, icon: 'fa-pizza-slice', description: 'Wood-fired pizza' }
];

// Shopping cart
let cart = [];

// Load menu items
function loadMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    foodMenu.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        
        menuItem.innerHTML = `
            <div class="menu-item-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="menu-item-body">
                <h3>${item.name}</h3>
                <p class="text-muted" style="font-size: 0.9rem; margin-bottom: 10px;">${item.description}</p>
                <div class="menu-item-price">${formatPrice(item.price)}</div>
                
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="decreaseQty(${index})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="qty-display" id="qty-${index}">1</span>
                    <button class="qty-btn" onclick="increaseQty(${index})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>

                <button class="btn btn-primary add-to-cart-btn" onclick="addToCart(${index})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;

        menuGrid.appendChild(menuItem);
    });
}

// Increase quantity
function increaseQty(index) {
    const qtyElement = document.getElementById(`qty-${index}`);
    let qty = parseInt(qtyElement.textContent);
    if (qty < 99) {
        qtyElement.textContent = qty + 1;
    }
}

// Decrease quantity
function decreaseQty(index) {
    const qtyElement = document.getElementById(`qty-${index}`);
    let qty = parseInt(qtyElement.textContent);
    if (qty > 1) {
        qtyElement.textContent = qty - 1;
    }
}

// Add to cart
function addToCart(index) {
    const item = foodMenu[index];
    const qty = parseInt(document.getElementById(`qty-${index}`).textContent);

    // Check if item already in cart
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            name: item.name,
            price: item.price,
            quantity: qty
        });
    }

    // Reset quantity
    document.getElementById(`qty-${index}`).textContent = '1';

    // Update cart display
    updateCart();

    showNotification(`${item.name} added to cart!`, 'success');
}

// Update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-muted text-center">Your cart is empty</p>';
        cartSummary.style.display = 'none';
        return;
    }

    cartSummary.style.display = 'block';

    let cartHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-details">
                        ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(itemTotal)}
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('total').textContent = formatPrice(subtotal);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('Item removed from cart', 'success');
}

// Place order
async function placeOrder() {
    const tableOrRoom = document.getElementById('tableOrRoom').value.trim();

    if (!tableOrRoom) {
        showNotification('Please enter table or room number', 'error');
        return;
    }

    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    const placeOrderBtn = document.querySelector('.place-order-btn');
    showButtonLoading(placeOrderBtn);

    try {
        // Calculate total
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create order
        const order = {
            id: generateId('ORD'),
            category: 'Food',
            items: cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            tableOrRoomNumber: tableOrRoom,
            customerEmail: user.email,
            customerName: user.name,
            totalPrice: totalPrice,
            status: 'Pending',
            timestamp: Date.now()
        };

        // Save to Firestore
        const orders = await getLocalData('orders');
        orders.push(order);
        await setLocalData('orders', orders);

        // Show confirmation modal
        document.getElementById('orderId').textContent = order.id;
        document.getElementById('orderModal').classList.add('show');

        // Clear cart
        cart = [];
        document.getElementById('tableOrRoom').value = '';
        updateCart();

        showNotification('Order placed successfully!', 'success');
    } catch (error) {
        console.error('Order error:', error);
        showNotification('Failed to place order. Please try again.', 'error');
    } finally {
        hideButtonLoading(placeOrderBtn);
    }
}

// Close modal
function closeModal() {
    document.getElementById('orderModal').classList.remove('show');
}

// Initialize
loadMenu();
