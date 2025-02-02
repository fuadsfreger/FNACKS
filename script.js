document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

    // Add to cart function
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const product = e.target.dataset.product;
            const price = parseFloat(e.target.dataset.price);
            const flavor = e.target.previousElementSibling.value || "No flavor selected";
            
            cart.push({ product, price, flavor });
            updateCart();
        });
    });

    // Update cart display
    function updateCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.product} (${item.flavor}) - ${item.price.toFixed(2)} AZN`;
            cartItemsContainer.appendChild(listItem);
            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    // Checkout button click
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            document.getElementById("cart").style.display = "none";
            document.getElementById("checkout-form").style.display = "block";
        });
    }

    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener("change", (e) => {
            if (e.target.value === "cash") {
                document.getElementById("cash-details").style.display = "block";
            } else {
                document.getElementById("cash-details").style.display = "none";
            }
        });
    });

    // Confirm order
    const confirmOrderButton = document.getElementById("confirm-order");
    if (confirmOrderButton) {
        confirmOrderButton.addEventListener("click", () => {
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
            if (!paymentMethod) {
                alert("Please select a payment method.");
                return;
            }

            if (paymentMethod.value === "cash") {
                const name = document.getElementById("name").value;
                const surname = document.getElementById("surname").value;
                const email = document.getElementById("email").value;
                const className = document.getElementById("class").value;
                const pickupTime = document.getElementById("pickup-time").value;

                if (!name || !surname || !email || !className || !pickupTime) {
                    alert("Please fill in all the details for cash payment.");
                    return;
                }

                generateQRCode(name, surname, className);
            }

            document.getElementById("order-confirmation").style.display = "block";
        });
    }

    // Generate QR code for order confirmation
    function generateQRCode(name, surname, className) {
        const qrCodeContainer = document.getElementById("qr-code");
        const orderInfo = `${name} ${surname} (${className})`;

        const qrCode = new QRCode(qrCodeContainer, {
            text: orderInfo,
            width: 128,
            height: 128
        });
    }
});




