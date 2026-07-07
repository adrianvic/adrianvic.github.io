import { Application, Window, getScreenRoot, bus, promoteWindow } from "../kernel.mjs";

function draw(p) {
    const w = new Window(p);
    w.setTitle("Shell");
    w.content.style.display = "flex";
    w.content.style.flexDirection = "column";
    
    const textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.height = "100%";
    bus.addEventListener("system-console", (e) => {
        textarea.value += e.detail
            .map(arg => typeof arg === "object" ? JSON.stringify(arg) : String(arg))
            .join(" ")
            + "\n";
    })

    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.display = "flex";
    
    const input = document.createElement("input");
    input.style.width = "100%";
    
    const button = document.createElement("button");
    button.textContent = "go";
    button.addEventListener('click', () => {
        eval(input.value);
    });

    div.appendChild(input);
    div.appendChild(button);
    
    w.content.appendChild(textarea);
    w.content.appendChild(div);
    getScreenRoot().appendChild(w.window);
    w.maximize();

    function title(title) {
        w.setTitle(title);
    }

    function exit() {
        p.detach();
        w.destroy();
    }

    w.close.addEventListener('click', () => {
        exit();
    })

    promoteWindow(w);
}

function main(p) {
    draw(p);
}

const app = new Application('shell', main);
export default app;