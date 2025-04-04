const toggle = document.querySelector('#soundDiv')
toggle.innerHTML = `<img src="images/sound-on.png" id="sound" onclick="toggleAudio()"><p>${toggle.getAttribute("data-title")}</p>`
const audio = new Audio(toggle.getAttribute("data-source"));
const toggleIMG = document.querySelector('#sound')

function play() {
    audio.play();
}

function stop() {
    audio.pause();
}

function toggleAudio() {
    if (!audio.paused) {
        stop();
        toggleIMG.src = 'images/sound-off.png'
    } else {
        play();
        toggleIMG.src = 'images/sound-on.png'
    }
}

play();