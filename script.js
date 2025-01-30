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
    const email = document.getElementById('email').value;
    const orderData = `FNACKS Order\nName: ${name}\nSurname: ${surname}\nClass: ${className}`;
    
    document.getElementById('qr-code').innerHTML = "";
    
    new QRCode(document.getElementById('qr-code'), {
        text: orderData,
        width: 128,
        height: 128
    });

    document.getElementById('order-confirmation').style.display = 'block';

    // Send email using Brevo API
    sendOrderEmail(name, surname, className, email);
});

function sendOrderEmail(name, surname, className, email) {
    const apiKey = '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';
    const url = 'https://api.brevo.com/v3/smtp/email';
    
    const emailData = {
        sender: { email: 'fuadfarzaliyev53@gmail.com', name: 'FNACKS' },
        to: [{ email: email, name: `${name} ${surname}` }],
        subject: 'FNACKS Order Confirmation',
        htmlContent: `<p>Dear ${name} ${surname},</p><p>Your FNACKS order is confirmed!</p><p>Class: ${className}</p><p>Please pick up your order from 8J.</p>`
    };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey
        },
        body: JSON.stringify(emailData)
    })
    .then(response => response.json())
    .then(data => console.log('Email sent:', data))
    .catch(error => console.error('Error sending email:', error));
}



