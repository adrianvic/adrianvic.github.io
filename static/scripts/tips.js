const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const body = document.querySelector('body');
const elements = document.querySelectorAll('[data-tip]');
const hint = document.querySelector("#headerSubtitle");
const hintPanelDefaultText = hint.innerHTML;
let fixedHint;
let currentObserver;

if (!isMobile) {
  elements.forEach(el => {
    registerElementHint(el);
  })  
}

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

export function registerElementHint(el) {
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
}