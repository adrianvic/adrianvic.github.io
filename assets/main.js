class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <aside>
      <nav class="box profile">
          <img class="decorativeImage" src="./assets/logo.jpg" alt="logo - Shuu Maiko from Niskeoi">
          <h1>Adrian Victor</h1>
          <p>@tenkuma</p>
          <p>Studying computing at <a href="http://ifc.edu.br/">IFC</a>, interessed in programming, hacking and security.</p>
      </nav> 

      <div id="links" class="centerText box">
        <blockquote id="random-quote">
          The quote man is not working...
        </blockquote>
        <p id="random-quote-author">- Quote man</p>
      </div>

      <div id="links" class="centerText box">
          <p>Links</p>
          <p><a href="index.html">Home</a> - <a href="http://gallery.adrian.rf.gd/">Gallery</a> - <a href="http://vicc.rf.gd/gh">GitHub</a> - <a href="http://vicc.rf.gd/twitter">Twitter</a></p>
      </div>
      
      <div id="footer" class="box">
          <footer>
              <p>2024 - Adrian Victor, under <a href="https://unlicense.org/">Unlicense</a>, on <a href="https://github.com/adrianvic/website/">GitHub</a>.</p> 
          </footer>
      </div>
  </aside>
      `;
    }
  }

  customElements.define('header-component', Header);
  