const socialPosts = document.querySelector('#socialPosts');
const socialAlert = document.querySelector('#socialAlert');

socialPosts.classList.add('blurred');

const continueButton = document.createElement('button');
continueButton.innerText = clickHereToContinueLocalized;
continueButton.addEventListener('click', () => {
    socialPosts.classList.remove('blurred');
    socialAlert.remove();
})

socialAlert.appendChild(continueButton);