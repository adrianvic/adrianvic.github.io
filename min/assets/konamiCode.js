const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let keyIndex = 0;

document.addEventListener('keydown', function(event) {
  if (event.code === konamiCode[keyIndex]) {
    keyIndex++;
    if (keyIndex === konamiCode.length) {
        if(confirm("This will redirect you to an external website, continue?")) {
          window.location.href = 'https://invidious.perennialte.ch/search?q=Just+Fine+Sam+%26+Cat'
        }
        keyIndex = 0;
    }
  } else {
    keyIndex = 0;
  }
});