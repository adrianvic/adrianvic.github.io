import { Process, Window, getScreenRoot, promoteWindow } from "../kernel.mjs";
import createShell from "./shell.mjs";

export default function init(p) {
    function login(password) {
        if (password == "demo") {
            p.detach();
            new Process("shell", createShell);
            w.destroy();
        } else {
            console.log("Invalid password.")
        }
    }

    console.log("Please log in with login(password)!");
    window.login = login;
    const w = new Window(p);
    w.setTitle("Login");
    w.window.style.height = "fit-content";
    w.window.style.width = "fit-content";
    w.window.style.resize = "none";
    
    const loginForm = document.createElement("div");
    loginForm.style.display = "flex";
    
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password is 'demo'";
    
    const loginButton = document.createElement("button");
    loginButton.innerText = "login";
    loginButton.addEventListener('click', () => {
        login(passwordInput.value);
    })

    loginForm.appendChild(passwordInput);
    loginForm.appendChild(loginButton);
    w.content.appendChild(loginForm);
    
    w.close.remove();
    getScreenRoot().appendChild(w.window);
    promoteWindow(w);
}