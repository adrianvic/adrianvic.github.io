/*
This script plays a sound when user clicks on the page.
*/

const click = new Audio(`${rootPrefix}static/audio/click.ogg`);
const hover = new Audio(`${rootPrefix}static/audio/hover.ogg`);
click.preload = "auto";
hover.preload = "auto";
click.volume = 0.5;
hover.volume = 0.5;


document.body.addEventListener("click", () => {
    if (localStorage.getItem("disablesfx") == 'true') return;
    
    click.currentTime = 0;
    click.play().catch(() => {});
});

document.querySelectorAll('a').forEach(link => {
    link.addEventListener("mouseenter", () => {
        if (localStorage.getItem("disablesfx") == 'true') return;
        hover.currentTime = 0;
        hover.play().catch(() => {});
    })
})
