const toggle = document.querySelector('#soundDiv')
toggle.innerHTML = `<img src="/static/images/sound-on.png" id="sound" onclick="toggleAudio()"><p>${toggle.getAttribute("data-title")}</p>`

const audio = new Audio(`/static/${toggle.getAttribute("data-source")}`);
const toggleIMG = document.querySelector('#sound');

const savedTime = localStorage.getItem("audioTime");
const wasPlaying = localStorage.getItem("audioPlaying") === 'true'

if (savedTime) audio.currentTime = parseFloat(savedTime);
if (wasPlaying) {
    play();
} else {
    stop();
}

function play() {
    audio.play();
    localStorage.setItem("audioPlaying", "true")
    toggleIMG.src = "/static/images/sound-on.png"
}

function stop() {
    audio.pause();
    localStorage.setItem("audioPlaying", "false")
    toggleIMG.src = "/static/images/sound-off.png"
}

function toggleAudio() {
    if (!audio.paused) {
        stop();
    } else {
        play();
    }
}

window.addEventListener("beforeunload", () => {
  localStorage.setItem("audioTime", audio.currentTime);
  localStorage.setItem("audioPlaying", !audio.paused);
});