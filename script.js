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
    const email = "fuadfarzaliyev53@gmail.com"; // Replace with user input if needed

    const orderDetails = cart.map(item => `${item.product}: ${item.price} AZN`).join("\n");
    const orderData = `FNACKS Order\nName: ${name}\nSurname: ${surname}\nClass: ${className}\n\nOrder Details:\n${orderDetails}\nTotal: ${total.toFixed(2)} AZN`;
    
    document.getElementById('qr-code').innerHTML = "";
    new QRCode(document.getElementById('qr-code'), {
        text: orderData,
        width: 128,
        height: 128
    });
    document.getElementById('order-confirmation').style.display = 'block';
    
    sendOrderEmail(name, surname, className, orderDetails, total, email);
});

function sendOrderEmail(name, surname, className, orderDetails, total, email) {
    fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "api-key": "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"
        },
        body: JSON.stringify({
            sender: { name: "FNACKS Shop", email: "fuadfarzaliyev53@gmail.com" },
            to: [{ email: email, name: `${name} ${surname}` }],
            subject: "Your FNACKS Order Confirmation",
            htmlContent: `<h2>Your FNACKS Order is Confirmed!</h2>
                          <p><strong>Name:</strong> ${name}</p>
                          <p><strong>Surname:</strong> ${surname}</p>
                          <p><strong>Class:</strong> ${className}</p>
                          <p><strong>Order Details:</strong><br>${orderDetails.replace(/\n/g, "<br>")}</p>
                          <p><strong>Total:</strong> ${total.toFixed(2)} AZN</p>
                          <p>Thank you for your order! Please come and pick it up.</p>`
        })
    })
    .then(response => response.json())
    .then(data => console.log("Email sent:", data))
    .catch(error => console.error("Error sending email:", error));
}




