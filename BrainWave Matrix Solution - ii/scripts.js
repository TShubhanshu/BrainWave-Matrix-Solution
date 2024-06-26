document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout');
    
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        cartCount.innerText = cart.length;
    };

    const addToCart = (product) => {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} has been added to your cart.`);
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('h2').innerText;
            const productPrice = productElement.querySelector('p').innerText;

            const product = {
                id: productId,
                name: productName,
                price: productPrice
            };

            addToCart(product);
        });
    });

    if (cartItems) {
        cart.forEach(product => {
            const li = document.createElement('li');
            li.innerText = `${product.name} - ${product.price}`;
            cartItems.appendChild(li);
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty.');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }

    // Update cart count on page load
    updateCartCount();
});

