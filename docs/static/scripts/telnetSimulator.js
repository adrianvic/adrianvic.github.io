const screen = document.getElementById('telnetSimulationClientScreen');
const input = document.getElementById('telnetSimulationInputBox');
const btn = document.getElementById('telnetSimulationClientSend')
const sbtn = document.getElementById('telnetSimulationServerClean');
const sscreen = document.getElementById('telnetSimulationServerScreen');
const loading = document.getElementById("telnetSimulationLoadingHolder")
const loadingText = document.getElementById("telnetSimulationLoadingText")
let loadingms = 2500;

btn.addEventListener('click', () => {
  send_command();
})

sbtn.addEventListener('click', () => {
  screen.innerHTML = '';
  sscreen.innerHTML = '';
})

async function send_command() {
  if (!input.value) return;
  const command = input.value;
  input.value = '';
  screen.value += `telnet> ${command}\n`;
  await wait(loadingms, "<b>Camada OSI #7 - Aplicação:</b> Usuário digitou o texto na aplicação.");
  await wait(loadingms, "<b>Camada OSI #6 - Apresentação:</b> Tradução do comando para um pacote legível para o servidor.");
  await wait(loadingms, "<b>Camada OSI #5 - Sessão:</b> Sistema do cliente abre uma conexão com o servidor.");
  await wait(loadingms, "<b>Camada OSI #4 - Transporte:</b> Sistema do cliente troca informações com o servidor.");
  await wait(loadingms, "<b>Camada OSI #3 - Rede:</b> O sistema do cliente resolve o endereço do servidor.");
  await wait(loadingms, "<b>Camada OSI #2 - Enlace de dados:</b> Os frames são entregues ao dispositivo com o endereço MAC correto.");
  await wait(loadingms, "<b>Camada OSI #1 - Física:</b> Os dados são transmitidos por cabo, ou via <i>wireless</i>, para o dispositivo de destino.");
  process_command(command);
}

async function process_command(command) {
  sscreen.value += `Comando recebido: ${command}\n`;
  args = command.split(" ");
  command = args[0]
  args.shift();
  await wait(loadingms, "<b>O servidor empacota uma resposta, que também será passada por todas camadas até chegar no cliente.");
  switch (command) {
    case 'help':
        screen.value += `Comandos disponíveis:\nhelp - mostra essa mensagem de ajuda\nping - responde 'pong'\necho [texto] - retorna o texto especificado no comando\ntimeout [milissegundos] - muda o tempo que as mensagens de carregamento da simulação duram`
      break;
    case 'echo':
        screen.value += `Resposta do servidor: ${args.join(' ')}\n`
      break;
    case 'ping':
        screen.value += `Pong!\n`
      break;
    case 'timeout':
        loadingms = args[0]
        screen.value += `O tempo das mensagens de carregamento foi mudado para ${args[0]}ms!`
      break;
    default:
        screen.value += `Comando desconhecido! Envie help para ver a lista de comandos.\n`
      break;
  }
}

async function wait(ms, txt = '') {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  loadingText.innerHTML = txt;
  loading.style.display = "flex"
  await delay(ms)
  loading.style.display = "none"
}