const el = document.getElementById("languageTitle");
const texts = [["Pick a language", "English"], ["Escolha um idioma", "Português Brasileiro"]];
let i = 0;
let fadeTime = 1000;
let holdTime = 2000;
const links = document.querySelectorAll("#languageList li a");
let currentLang = 0;

el.style.transition = `opacity ${fadeTime}ms`;
el.style.opacity = 1;

function cycle() {
  el.style.opacity = 0;
  removeOldHighlightedLang();
  setTimeout(() => {
    i = (i + 1) % texts.length;
    currentLang = i;
    el.textContent = texts[i][0];
    el.style.opacity = 1;
    setNewHighlightedLang()
  }, fadeTime);
}

function removeOldHighlightedLang() {
    document.querySelector(".languagesHighlightedLink").classList.remove("languagesHighlightedLink");
}

function setNewHighlightedLang() {
    links.forEach(link => {
        if (link.innerText == texts[currentLang][1]) {
            link.classList.add('languagesHighlightedLink');
        }
    })
}

setNewHighlightedLang()
setInterval(cycle, fadeTime * 2 + holdTime);