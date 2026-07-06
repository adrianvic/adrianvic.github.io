const language = "en";
const procList = [];

export class Process {
  constructor(app) {
    this.pid = procList.length == 0 ? 0 : procList[procList.length - 1].pid + 1;
    this.name = app.name;
    procList.push(this);
    app.fn(this);
  }

  detach() {
    procList.splice(procList.indexOf(this), 1);
  }
}

export class Application {
  constructor(name, fn) {
    this.fn = fn;
    this.name = name;
  }
}

export class Window {
  constructor() {
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
    
    // Close button
    const close = document.createElement("button");
    close.innerText = "close";
    close.classList.add("windowHeaderButton");
    close.classList.add("windowHeaderButtonClose");
    this.close = close;
    
    // Content
    const c = document.createElement("div");
    c.classList.add("windowContent");
    this.content = c;
    
    // Building
    h.appendChild(title);
    h.appendChild(close);
    w.appendChild(h);
    w.appendChild(c);
  }

  setTitle(title) {
    this.title.innerText = title;
  }

  destroy() {
    this.window.remove();
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
  return document.querySelector('body');
}

const applications = [];

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