// filepath: E-CommerceWebsite/E-CommerceWebsite/paystack/paystack.js
document.addEventListener('DOMContentLoaded', function() {
    const payButton = document.getElementById('payButton');
    const emailInput = document.getElementById('emailInput');
    const amountInput = document.getElementById('amountInput');

    payButton.addEventListener('click', function() {
        const email = emailInput.value;
        const amount = amountInput.value;

        if (email && amount) {
            payWithPaystack(email, amount);
        } else {
            alert('Please enter both email and amount.');
        }
    });

    function payWithPaystack(email, totalAmount) {
        let handler = PaystackPop.setup({
            key: 'pk_test_59195443eee0e11f5ae308953e2a144c489269ed', // Replace with your Paystack public key
            email: email, // Customer's email
            amount: totalAmount * 100, // Paystack expects the amount in kobo (multiply by 100)
            currency: 'NGN', // Nigerian Naira
            ref: 'ref_' + Math.floor((Math.random() * 1000000000) + 1), // Generate a unique reference
            callback: function(response) {
                alert('Payment successful! Reference: ' + response.reference);
                // Redirect to order confirmation page or perform other actions
                window.location.href = '/orderPlaced.html';
            },
            onClose: function() {
                alert('Payment was not completed.');
            }
        });
        handler.openIframe(); // Open the Paystack payment modal
    }
});