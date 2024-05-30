// script.js
function generateCaptcha() {
    const canvas = document.getElementById('captcha');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaText = '';
    for (let i = 0; i < 6; i++) {
        captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    context.font = '30px Arial';
    context.fillStyle = '#000';
    context.fillText(captchaText, 50, 35);

    // Save the generated CAPTCHA text to a data attribute
    canvas.setAttribute('data-captcha-text', captchaText);
}

function validateCaptcha() {
    const input = document.getElementById('captcha-input').value;
    const canvas = document.getElementById('captcha');
    const captchaText = canvas.getAttribute('data-captcha-text');
    const status = document.getElementById('captcha-status');

    if (input === captchaText) {
        const urlParams = new URLSearchParams(window.location.search);
        const destination = urlParams.get('destination');
        if (destination) {
            window.location.href = destination;
        } else {
            status.style.color = 'green';
            status.textContent = 'CAPTCHA correct!';
        }
    } else {
        status.style.color = 'red';
        status.textContent = 'CAPTCHA incorrect. Please try again.';
    }
}

// Generate initial CAPTCHA when the page loads
window.onload = generateCaptcha;
