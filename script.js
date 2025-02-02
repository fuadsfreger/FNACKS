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
    const pickupTime = document.getElementById('pickup-time').value;
    const email = "the recipient's email"

    if (!name || !surname || !className || !pickupTime) {
        alert("Please fill in all fields.");
        return;
    }

    const orderData = `FNACKS Order\nName: ${name}\nSurname: ${surname}\nClass: ${className}\nPickup Time: ${pickupTime}`;
    
    document.getElementById('qr-code').innerHTML = "";
    new QRCode(document.getElementById('qr-code'), {
        text: orderData,
        width: 128,
        height: 128
    });

    document.getElementById('order-confirmation').style.display = 'block';

    sendEmail(name, surname, className, pickupTime, email);
});

    const emailData = {
        sender: { email: "fuadfarzaliyev53@gmail.com", name: "FNACKS Orders" },
        to: [{ email: recipientEmail }],
        subject: "FNACKS Order Confirmation",
        htmlContent: `<h2>Your ORDER IS CONFIRMED</h2>
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Surname:</strong> ${surname}</p>
                      <p><strong>Class:</strong> ${className}</p>
                      <p><strong>Pickup Time:</strong> ${pickupTime}</p>
                      <p>Please come and take your order from 8J. Say "I came to FNACKS" and show this email.</p>`
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": apiKey
        },
        body: JSON.stringify(emailData)
    })
    .then(response => response.json())
    .then(data => console.log("Email sent:", data))
    .catch(error => console.error("Error sending email:", error));
}


