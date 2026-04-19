const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let keyIndex = 0;

document.addEventListener('keydown', function(event) {
  if (event.code === konamiCode[keyIndex]) {
    keyIndex++;
    if (keyIndex === konamiCode.length) {
        window.location.href = './toyourdreams.txt'
        keyIndex = 0;
    }
  } else {
    keyIndex = 0;
  }
});