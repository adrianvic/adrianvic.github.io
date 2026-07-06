import { Application, Window, promoteWindow, registerApplication, getScreenRoot, getApplications } from "./kernel.mjs";

const app = new Application('apps', (p) => {
    const w = new Window();
    w.setTitle("App list");
    w.content.style.padding = "1rem";

    const list = document.createElement("ul");
    getApplications().forEach(app => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.innerText = app.name;
        link.addEventListener('click', () => app.fn());
        item.appendChild(link);
        list.appendChild(item);
    })

    w.content.appendChild(list);

    w.close.addEventListener('click', () => {
        p.detach();
        w.destroy();
    });

    getScreenRoot().appendChild(w.window);
    promoteWindow(w);
})

registerApplication(app);