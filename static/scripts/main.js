// This script handles the playback of music in the header's miniplayer ;)
const body = document.querySelector("body");

document.getElementById("music").innerHTML = `
<img src="/static/images/gears.svg" class="optionsToggle invertedc">
<img src="/static/images/sound-on.png" id="sound">
<select name="song" id="songSelection"></select>
`

const songs = [
    { file: "Velkommen.mp3", name: 'Velkommen', artwork: "velkommen.jpg" },
    { file: "PG2.mp3", name: 'Frugal APE', artwork: "pg.jpg" },
    { file: "dreamscape.mp3", name: 'Dreamscape', artwork: "winds.png" },
    { file: "skychat.mp3", name: 'Skychat', artwork: "winds.png" }
];

// Options page
const optionsAside = document.createElement("aside");
optionsAside.classList.add("closed");
optionsAside.classList.add("metromenu");
{
    const back = document.createElement("p");
    back.textContent = headeri18n.back;
    back.classList.add("optionsToggle");
    
    const title = document.createElement("h2");
    title.textContent = headeri18n.options;
    optionsAside.appendChild(title);
    optionsAside.appendChild(back);
    
    const content = document.createElement("div");
    content.innerHTML = `
    <div id="content">
    <div id="songDrawer"></div>
    <div>
        <p class="playingSong"></p>
        <p>${headeri18n.by} tenkuma</p>
    </div>
    <div id="playlist"></div>
    <div>
        <p>Volume</p>
        <input id="volume" oninput="setVolume(this.value / 100)" type="range" min="0" max="100"></input>
    </div>
        <div class="checkbox">
            <p>${headeri18n.hideBackground}</p>
            <input id="background" type="checkbox"></input>
        </div>
    </div>
    `
    optionsAside.appendChild(content);
}
body.appendChild(optionsAside);


const toggleIMG = document.querySelector('#sound');
toggleIMG.addEventListener('click', () => {
    toggleAudio();
})

const hideBG = document.querySelector("input#background");
if (localStorage.getItem("bgHidden") === "true") hideBG.checked = true, toggleBG();
hideBG.addEventListener("click", () => {
    toggleBG();
})

function toggleBG() {
    const bg = document.querySelector(".bg");
    bg.classList.toggle("invisible");
    localStorage.setItem("bgHidden", bg.classList.contains("invisible"))
}

const songsDrawer = document.querySelector("#songDrawer");
const drawerSongs = [];
const playlist = document.querySelector("#playlist");
const expandButton = document.createElement('p');
expandButton.textContent = "Playlist";
expandButton.classList.add("playlistTitle");
playlist.appendChild(expandButton);

songs.forEach(song => {
    const songElement = document.createElement("div");
    songElement.classList.add("drawerSong");
    songElement.dataset.song = song.file;
    const songImage = document.createElement("img");
    songImage.src = `/static/images/songs/${song.artwork}`;
    songElement.appendChild(songImage);
    songElement.addEventListener('click', () => {
        changeSong(song.file);
    });
    drawerSongs.push(songElement);
    songsDrawer.appendChild(songElement);
    
    // Playlist
    const playlistEntry = document.createElement("p");
    playlistEntry.textContent = song.name;
    playlistEntry.addEventListener('click', () => {
        changeSong(song.file);
    })
    playlist.appendChild(playlistEntry);
})

const audioSelect = document.getElementById("songSelection");
songs.forEach(song => {
    const songOption = document.createElement("option");
    songOption.value = song.file;
    songOption.textContent = song.name;
    audioSelect.appendChild(songOption);
});

const playingSongLabel = document.querySelector(".playingSong");

function updatePlayingLabel(label) {
    drawerSongs.forEach(sng => {
        sng.classList.remove("selected");
        if (sng.dataset.song == label) {
            sng.classList.add("selected");
        }
    });
    
    const songString = songs.find(item => item.file === label).name;
    playingSongLabel.textContent = songString;
}

const savedSong = localStorage.getItem("song");

if (savedSong) {
    audioSelect.value = savedSong;
    updatePlayingLabel(savedSong);
} else {
    audioSelect.value = songs[0].file;
    updatePlayingLabel(songs[0].file);
}

const optionsButton = document.querySelectorAll(".optionsToggle");
optionsButton.forEach(button => {
    button.addEventListener('click', () => {
        optionsAside.classList.toggle('closed');
    });
});

// Create the audio object using the current select value
let audio = new Audio(`/static/music/${audioSelect.value}`);

const savedTime = localStorage.getItem("audioTime");
const savedVolume = localStorage.getItem("volume");
const wasPlaying = localStorage.getItem("audioPlaying") === 'true';

function play() {
    audio.volume = localStorage.getItem("volume");
    audio.play();
    localStorage.setItem("audioPlaying", "true")
    toggleIMG.src = "/static/images/sound-on.png"
    console.log(`[Music Player] playing ${audioSelect.value}`)
}

function stop() {
    audio.pause();
    localStorage.setItem("audioPlaying", "false")
    toggleIMG.src = "/static/images/sound-off.png"
}

function setVolume(volume) {
    audio.volume = volume;
    localStorage.setItem("volume", volume);
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

function changeSong(song) {
    const wasPlaying = !audio.paused;
    stop();
    localStorage.removeItem("audioTime");
    audio = new Audio(`/static/music/${song}`);
    if (savedVolume) setVolume(savedVolume);
    console.log(`[Music Player] changing song to ${song}`)
    localStorage.setItem("song", song);
    updatePlayingLabel(song);
    if (wasPlaying) play();
}

// hooking into the options menu 'change' event to update the song
audioSelect.addEventListener('change', () => {
    changeSong(audioSelect.value);
})

// Set initial playback state and volume based on saved preferences
if (savedTime) audio.currentTime = parseFloat(savedTime);

if (savedVolume) document.getElementById("volume").value = savedVolume * 100;

if (wasPlaying) {
    play();
} else {
    stop();
}