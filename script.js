let cart = [];
let total = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        const price = parseFloat(button.getAttribute('data-price'));
        cart.push({ product, price });
        total += price;
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product}: ${item.price} AZN`;
        cartItems.appendChild(li);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

document.getElementById('checkout-button').addEventListener('click', () => {
    document.getElementById('checkout-form').style.display = 'block';
});

document.getElementById('payment-method-cash').addEventListener('change', () => {
    document.getElementById('cash-details').style.display = 'block';
});

document.getElementById('payment-method-bank').addEventListener('change', () => {
    document.getElementById('cash-details').style.display = 'none';
});

document.getElementById('confirm-order').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const className = document.getElementById('class').value;

    const orderData = `FNACKS Order\nName: ${name}\nSurname: ${surname}\nClass: ${className}`;
    
    document.getElementById('qr-code').innerHTML = "";
    
    new QRCode(document.getElementById('qr-code'), {
        text: orderData,
        width: 128,
        height: 128
    });

    document.getElementById('order-confirmation').style.display = 'block';
});


