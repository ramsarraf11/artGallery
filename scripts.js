document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <p>${item.title} - ${item.size} - $${item.price.toFixed(2)}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const shopItem = event.target.closest('.shop-item');
            const title = shopItem.querySelector('h3').textContent;
            const price = parseFloat(event.target.dataset.price);
            const size = shopItem.querySelector('.size-select') ? shopItem.querySelector('.size-select').value : 'One Size';
            cart.push({ title, price, size });
            updateCart();
        });
    });

    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = parseInt(event.target.dataset.index, 10);
            cart.splice(index, 1);
            updateCart();
        }
    });
});
