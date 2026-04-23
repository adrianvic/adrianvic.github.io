const body = document.querySelector('body');
const elements = document.querySelectorAll('[data-tip]');
const hint = document.querySelector("#headerSubtitle");
const hintPanelDefaultText = hint.innerHTML;
let fixedHint;
let currentObserver;

elements.forEach(el => {
  el.addEventListener('mouseenter', function() {
    cleanup();
    
    if (currentObserver) {
      currentObserver.disconnect();
    }
    
    currentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          fixedHint = document.createElement('p');
          fixedHint.id = "fixedHint";
          fixedHint.innerHTML = el.dataset.tip;
          fixedHint.setAttribute('aria-hidden', 'true');
          body.appendChild(fixedHint);
        } else {
          hint.innerHTML = el.dataset.tip;
        }
      })
    });
    
    hint.innerHTML = el.dataset.tip;
    currentObserver.observe(hint);
  });
  
  el.addEventListener('mouseleave', function() {
    cleanup();
  });
})

function cleanup() {
  hint.innerHTML = hintPanelDefaultText;
  hint.classList.remove('fixed');
  if (fixedHint) {
    fixedHint.remove();
  }
  if (currentObserver) {
    currentObserver.disconnect();
    currentObserver = null;
  }
}
