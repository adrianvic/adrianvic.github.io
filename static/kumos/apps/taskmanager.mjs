import { Application, Window, promoteWindow, getScreenRoot, getProcList } from "../kernel.mjs";

const app = new Application('task', (p) => {
    function update() {
        w.content.innerHTML = ``;
        const list = document.createElement("ul");
        getProcList().forEach(proc => {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.innerText = `${proc.pid} -> ${proc.parent.length === 0 ? `` : proc.parent} ${proc.name}`;
            item.appendChild(link);
            list.appendChild(item);
        })
        
        w.content.appendChild(list);
    }
    
    const w = new Window();
    w.setTitle("Task Manager");
    w.content.style.padding = "1rem";
    
    const task = setInterval(update, 100);

    w.close.addEventListener('click', () => {
        clearInterval(task);
        p.detach();
        w.destroy();
    });
    
    getScreenRoot().appendChild(w.window);
    promoteWindow(w);
})

export default app;