// Coded entirely by ChatGPT
// :(

const express = require("express");
const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

const app = express();
app.use(express.json());

const FILE = "../_data/i18n.js";

function loadAST() {
    const code = fs.readFileSync(FILE, "utf8");
    return parser.parse(code, { sourceType: "module" });
}

function extract(ast) {
    const out = {};
    
    traverse(ast, {
        AssignmentExpression(path) {
            if (
                path.node.left.object?.name === "module" &&
                path.node.left.property?.name === "exports"
            ) {
                path.node.right.properties.forEach(langProp => {
                    const lang = langProp.key.name || langProp.key.value;
                    out[lang] = {};
                    
                    langProp.value.properties.forEach(p => {
                        const key = p.key.name || p.key.value;
                        out[lang][key] = p.value.extra?.raw || generate(p.value).code;
                    });
                });
            }
        }
    });
    
    return out;
}

function write(ast, newData) {
    traverse(ast, {
        AssignmentExpression(path) {
            if (
                path.node.left.object?.name === "module" &&
                path.node.left.property?.name === "exports"
            ) {
                path.node.right.properties.forEach(langProp => {
                    const lang = langProp.key.name || langProp.key.value;
                    
                    const existingKeys = new Set(
                        langProp.value.properties.map(p => p.key.name || p.key.value)
                    );
                    
                    // update existing
                    langProp.value.properties.forEach(p => {
                        const key = p.key.name || p.key.value;
                        
                        if (key in (newData[lang] || {})) {
                            p.value = parser.parseExpression(newData[lang][key]);
                        }
                    });
                    
                    // add new keys
                    Object.keys(newData[lang] || {}).forEach(key => {
                        if (!existingKeys.has(key)) {
                            langProp.value.properties.push(
                                t.objectProperty(
                                    t.identifier(key),
                                    parser.parseExpression(newData[lang][key])
                                )
                            );
                        }
                    });
                });
            }
        }
    });
    
    const output = generate(ast, { retainLines: true }).code;
    fs.writeFileSync(FILE, output);
}

app.get("/data", (req, res) => {
    const ast = loadAST();
    res.json(extract(ast));
});

app.post("/save", (req, res) => {
    const ast = loadAST();
    write(ast, req.body);
    res.send("ok");
});

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<body>
<h2>i18n Editor</h2>
<table id="t"></table>
<button onclick="addRow()">Add</button>
<button onclick="save()">Save</button>
        
<script>
let data;
        
fetch('/data').then(r=>r.json()).then(d=>{
  data=d;
  render();
});
        
function render(){
  const table=document.getElementById('t');
  table.innerHTML='';
        
  const langs=Object.keys(data);
  const keys=[...new Set(langs.flatMap(l=>Object.keys(data[l]||{})))];
        
  // header
  const headRow=document.createElement('tr');
  const thKey=document.createElement('th');
  thKey.textContent='key';
  headRow.appendChild(thKey);
        
  langs.forEach(l=>{
    const th=document.createElement('th');
    th.textContent=l;
    headRow.appendChild(th);
  });
        
  table.appendChild(headRow);
        
  // rows
  keys.forEach(k=>{
    const tr=document.createElement('tr');
        
    const tdKey=document.createElement('td');
    tdKey.textContent=k;
    tr.appendChild(tdKey);
        
    langs.forEach(l=>{
      const td=document.createElement('td');
      const input=document.createElement('input');
        
      input.value = (data[l] && data[l][k]) || '';
        
      input.addEventListener('change', (e)=>{
        upd(l, k, e.target.value);
      });
        
      td.appendChild(input);
      tr.appendChild(td);
    });
        
    table.appendChild(tr);
  });
}
        
function upd(lang,key,val){
  if(!data[lang])data[lang]={};
  data[lang][key]=val;
}
        
function addRow(){
  const k=prompt('key');
  if(!k)return;
  Object.keys(data).forEach(l=>data[l][k]='');
  render();
}
        
function save(){
  fetch('/save',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
  });
}
</script>
</body>
</html>
  `);
    });
    
    app.listen(3000,()=>console.log('http://localhost:3000'));
    