import { Application, Window, promoteWindow, registerApplication, getScreenRoot } from "./kernel.mjs";

const app = new Application('browser', (p) => {
    const w = new Window();
    w.setTitle("Web browser");
    const iframe = document.createElement("iframe");
    iframe.src = "https://adrianvic.github.io";
    iframe.style.height = "100%";
    const searchBar = document.createElement("div");
    searchBar.style.display = "flex";
    const search = document.createElement("input");
    search.style.width = "100%";
    const searchButton = document.createElement("button");
    searchBar.appendChild(search);
    searchBar.appendChild(searchButton);
    search.type = "text";
    iframe.addEventListener('load', () => search.value = iframe.src);
    searchButton.innerText = "go";
    searchButton.addEventListener('click', () => iframe.src = search.value);
    w.content.appendChild(searchBar);
    w.content.appendChild(iframe);

    getScreenRoot().appendChild(w.window);
    promoteWindow(w);

    w.close.addEventListener('click', () => {
        p.detach();
        w.destroy();
    })
})

registerApplication(app);