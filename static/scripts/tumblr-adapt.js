/* 
    By tenkuma ^^
    For those thumblrs that change the blog HTML for an iframe poiting to your personal website!
*/

const isTumblr = new URLSearchParams(location.search).get("tumblr") == "true"; // add ?tumblr=true to the tumblr iframe src attribute

function adaptToTumblrLayout() {
    const header = document.querySelector('header'); // change to anything that would return your header
    header.classList.add("tumblr"); // your CSS must handle the rest

    // will calc the size of the header and save as a CSS variable called --header-height
    const setHeaderOffset = () => {
      const height = header.offsetHeight + "px";
      document.documentElement.style.setProperty('--header-height', height);
    };

    // do this once and when the page resizes
    setHeaderOffset();
    window.addEventListener('resize', setHeaderOffset);
    
    // sanitizing links so they don't open in your tumblr iframe
    // also making sure all links carry the tumblr property!
    document.querySelectorAll("a").forEach(link => {
        if (new URL(link.href).host !== location.host) {
            link.target = "_blank";
        }
        const u = new URL(link.href);
        u.searchParams.set("tumblr", "true");
        link.href = u.toString();
    });
}

if (isTumblr) adaptToTumblrLayout();
