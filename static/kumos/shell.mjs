import { getScreenRoot, getApplications, Process } from "./kernel.mjs";
import { showNotification } from "../scripts/notification.js";

export function notify(title, text, time) {
    showNotification(title, text, time);
}

function runApp(name) {
    let launched = false;
    getApplications().forEach(app => {
        if (app.name == name) {
            new Process(app);
            launched = true;
        }
    })
    if (!launched) alert("Not found.");
}

function createShell() {
    const bar = document.createElement('div');
    bar.classList.add("kumosBar");

    const run = document.createElement('input');
    const runButton = document.createElement('button');
    run.type = "text";
    runButton.innerText = "Run";
    runButton.id = "kumosBarRunButton"
    runButton.addEventListener('click', () => runApp(run.value));
    bar.appendChild(run);
    bar.appendChild(runButton);

    getScreenRoot().appendChild(bar);
}

createShell();
showNotification("KumOS Shell", "Welcome to KumOS, everything is work-in-progress! Try running apps to see available packages.", 10000);
