import { registerElementHint } from "./tips.js";

const notificationBox = document.createElement('div');
notificationBox.classList.add('notificationBox');

export async function showNotification(title, subtitle, time, hint) {
    if (!hint) {
        hint = headeri18n.notificationDefaultHint;
    }
    const notificationBox = document.createElement('div');
    notificationBox.classList.add('notificationBox');
    notificationBox.dataset.tip = hint;
    
    const notificationTitle = document.createElement('h1');
    notificationTitle.innerHTML = title;
    
    const notificationSubtitle = document.createElement('p');
    notificationSubtitle.innerHTML = subtitle;
    
    notificationBox.appendChild(notificationTitle);
    notificationBox.appendChild(notificationSubtitle);
    document.querySelector('body').appendChild(notificationBox);
    
    registerElementHint(notificationBox);

    let clicked = false;

    notificationBox.addEventListener('click', () => {
        hideNotification(notificationBox);
    })
    
    requestAnimationFrame(() => {
        notificationBox.classList.add('shown');
    });
    await new Promise(r => setTimeout(r, time));
    if (!clicked) {
        hideNotification(notificationBox);
    }
}

async function hideNotification(notificationBox) {
    notificationBox.classList.remove('shown');
    await new Promise(r => setTimeout(r, 1000));
    notificationBox.remove();
}