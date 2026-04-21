/* This script provides functionality similar to FL Studio's hint panel. */

const elements = document.querySelectorAll('[data-tip]');
const hint = document.querySelector("#headerSubtitle");
const hintPanelDefaultText = hint.innerHTML;

elements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      hint.innerHTML = `${this.dataset.tip}`;
    });
    
    el.addEventListener('mouseleave', function() {
      hint.innerHTML = hintPanelDefaultText;
    });
})
