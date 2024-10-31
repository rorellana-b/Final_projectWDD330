const registrationForm = document.getElementById('registration-form');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const welcomeMessage = document.getElementById('welcome-message');

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Saved user at localstorage
    const userData = {
        username: username,
        email: email,
        password: password,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    welcomeMessage.innerText = `Done! Thanks for join to our community, ${username}`;
    modal.style.display = 'block';
    registrationForm.reset();
});

closeModal.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Show a welcome message
window.onload = () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
        welcomeMessage.innerText = `Hi, ${savedUser.username}! Thanks for join us.`;
        modal.style.display = 'block';
    }
};