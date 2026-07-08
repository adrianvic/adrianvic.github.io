const isTumblr = new URLSearchParams(location.search).get("tumblr") == "true";
console.log(isTumblr);

function adaptToTumblrLayout() {
    const header = document.querySelector('header');
    header.classList.add("tumblr");

    const setHeaderOffset = () => {
      const height = header.offsetHeight + "px";
      document.documentElement.style.setProperty('--header-height', height);
    };

    setHeaderOffset();
    window.addEventListener('resize', setHeaderOffset);
  
    document.querySelectorAll("a").forEach(link => {
        const u = new URL(link.href);
        u.searchParams.set("tumblr", "true");
        link.href = u.toString();
    });
}

if (isTumblr) adaptToTumblrLayout();
