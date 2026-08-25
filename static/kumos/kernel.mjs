const language = "en";
const procList = [];
const applications = [];
const screenRoot = document.querySelector('body');
screenRoot.classList.add("kumosroot");

export const bus = new EventTarget();

class SecurityError extends Error {
  constructor(message) {
    super(message);
    this.name = "SercurityError"
  }
};

export class Process {
  constructor(name, fn, parent = []) {
    this.pid = procList.length == 0 ? 0 : procList[procList.length - 1].pid + 1;
    this.name = name;
    this.parent = parent;
    procList.push(this);
    fn(this);
  }
  
  detach() {
    procList.splice(procList.indexOf(this), 1);
  }
  
  child(name, fn) {
    return new Process(name, fn, [...this.parent, this.pid]);
  }
  
  isPrivileged() {
    return this.parent.indexOf(0) !== -1 || this.pid == 0;
  }
}

export class Application {
  constructor(name, fn) {
    this.fn = fn;
    this.name = name;
    registerApplication(this);
  }
  
  bootstrap() {
    new Process(this.name, this.fn);
  }
}

export class Window {
  constructor(p) {
    this.process = p;
    
    // Window
    const w = document.createElement("div");
    w.classList.add("window");
    this.window = w;
    
    // Header
    const h = document.createElement("div");
    h.classList.add("windowHeader");
    this.header = h;
    
    // Title
    const title = document.createElement("p");
    title.classList.add("windowHeaderTitle");
    this.title = title;

    // Buttons container
    const container = document.createElement("div");
    container.classList.add("buttonContainer");
    
    // Close button
    const close = document.createElement("button");
    close.classList.add("windowHeaderButton");
    close.classList.add("close");
    this.close = close;

    // Maximize button
    const maximize = document.createElement("button");
    maximize.classList.add("windowHeaderButton");
    maximize.classList.add("maximize");
    this.maximizeButton = maximize;
    maximize.addEventListener("click", () => { this.maximize() });
    
    // Content
    const c = document.createElement("div");
    c.classList.add("windowContent");
    this.content = c;
    
    // Building
    container.appendChild(maximize);
    container.appendChild(close);
    h.appendChild(title);
    h.appendChild(container);
    w.appendChild(h);
    w.appendChild(c);

    this.state = "floating";
  }
  
  setTitle(title) {
    this.title.innerText = title;
  }
  
  destroy() {
    this.window.remove();
  }
  
  maximize() {
    this.window.classList.toggle("maximized");
  }
}

export function promoteWindow(window) {
  const header = window.header;
  const elmnt = window.window;
  
  header.style.cursor = 'move';
  
  header.onmousedown = (e) => {
    e.preventDefault();
    
    let pos3 = e.clientX;
    let pos4 = e.clientY;
    
    const startTop = elmnt.offsetTop;
    const startLeft = elmnt.offsetLeft;
    
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    
    function elementDrag(e) {
      e.preventDefault();
      const pos1 = pos3 - e.clientX;
      const pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };
}

export function getScreenRoot() {
  return screenRoot;
}

export function getApplications() {
  return applications;
}

export function registerApplication(application) {
  applications.push(application);
}

export function getLanguage() {
  return language;
}

export function getProcList() {
  return procList;
}

["log","warn", "error", "info"].forEach(method => {
  const original = console[method];
  
  console[method] = (...args) => {
    original(...args);
    bus.dispatchEvent(new CustomEvent("system-console", {
      detail: args
    }));
  };
})