import { Application, Window, promoteWindow, registerApplication, getScreenRoot, getProcList } from "./kernel.mjs";
import { notify } from "./shell.mjs";

function draw(p) {
    const w = new Window();
    w.setTitle("Guestbook");
    w.content.innerHTML = `
    <script src="https://iframe.chat/scripts/main.min.js"></script>
    <iframe class="windowContent" src="https://iframe.chat/embed?chat=17048300" id="chattable"></iframe>
    <script>chattable.initialize({ theme: "moderno" });</script>
    `
    
    getScreenRoot().appendChild(w.window);
    promoteWindow(w);

    w.close.addEventListener('click', () => {
        p.detach();
        w.destroy();
    })
}

function main(p) {
    let running = false;
    getProcList().forEach(proc => {
        if (proc.name == 'guestbook' && proc != p) {
            notify("Guestbook", "Guestbook is already running!")
            p.detach();
            running = true;
        }
    })

    if (!running) {
        draw(p);
    }
}

const app = new Application('guestbook', main);
registerApplication(app);