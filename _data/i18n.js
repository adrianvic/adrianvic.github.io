const globalValues = {
  mastodon: { url: "https://mstdn.social/@tenkuma", username: "@tenkuma@mstdn.social" },
  github: { url: "https://github.com/adrianvic", username: "adrianvic" },
  disrootGit: { url: "https://git.disroot.org/adrianvictor", username: "adrianvictor" },
  discord: { url: "https://discord.com/users/681643259764015116", username: "@adrianvic" },
  youtube: { url: "https://www.youtube.com/@adrianvictor8", username: "@adrianvictor8" },
  bitview: { url: "https://www.bitview.net/user/tenkuma", username: "tenkuma" },
  modrinth: { url: "https://modrinth.com/user/tenkumabear", username: "tenkumabear" },
  xmpp: { url: "xmpp:adrianvictor@disroot.org", username: "adrianvictor@disroot.org" },
  email: "adrianvictor@disroot.org",
  margarinaRecordsWebsite: "https://margarina-records.rf.gd",
  genius: { url: "https://genius.com/tenkuma", username: "tenkuma" }
};

module.exports = {
  // global: globalValues,
  en: {
    home: "home",
    welcome: "welcome",
    homeWelcomeParagraph: "It seems that you have found my website! Hi, I am <b>Adrian Victor</b> (or <b>tenkuma</b>), a Brazilian guy who likes to mess around with computers, computer programs and <i>enimatpyrtlyhtemids</i>.",
    socialsAndContact: "socials and contact",
    myMusic: "my music",
    myVideos: "my videos",
    mySoftware: "my software",
    homeSocialsAndContactParagraph: `
      I'm publicly available at Mastodon <a href='${globalValues.mastodon.url}'>(${globalValues.mastodon.username})</a>,
      GitHub <a href='${globalValues.github.url}'>(${globalValues.github.username})</a>,
      Disroot Git <a href='${globalValues.disrootGit.url}'>(${globalValues.disrootGit.username})</a>,
      Discord <a href='${globalValues.discord.url}'>(${globalValues.discord.username})</a>,
      YouTube <a href='${globalValues.youtube.url}'>(${globalValues.youtube.username})</a>,
      BitView <a href='${globalValues.bitview.url}'>(${globalValues.bitview.username})</a>,
      Modrinth <a href='${globalValues.modrinth.url}'>(${globalValues.modrinth.username})</a>
      and XMPP <a href='${globalValues.xmpp.url}'>(${globalValues.xmpp.username})</a>.
    `,
    homeSocialsAndContactParagraphTwo: `You can message me on my E-mail <a href="mailto:${globalValues.email}">(${globalValues.email})</a> or feel free to get in touch through any of the other places mentioned above. For project-specific subjects, check for the project's contact field or if there's no such field add <i>+projectname</i> to my E-mail address (example: adrianvictor+coolproject@disroot.org).</p>
        <p><i><b>Please, avoid reaching me through ways not mentioned above :)</b></i>`,
    homeMyMusicParagraph: `Me and my friends have an amateur record label called <span class="margarinaColor">Margarina Records</span>, things usually move slowly with my musical works, usually because of college and the lack of proper music production knowledge, but I'm working my way through it.`,
    homeMyMusicParagraphTwo: `You can follow my latest songs at the <a href="${globalValues.margarinaRecordsWebsite}">label website</a> and on <a href="${globalValues.genius.url}">Genius</a>. You'd probably also like the other member's works as well, so take a look at all songs from MGR.`,
    homeMyVideoParagraph: "I have a YouTube channel where I post mostly Minecraft videos, but I want to have other types of content in the future. There's no scedule for my videos because it takes a lot of editing time to put a video together, and I have little time to work on my own projects, you should subscribe if you want to know when I post something!",
    homeMyVideoRandomVideoParagraph: "Here's a random video I'm proud of:",
    homeVideoTitle: "How to use MCA Selector to merge worlds in Minecraft Java!",
    homeMySoftwareParagraph: `I am studying computing at IFC (SC, Brazil) but in my free time I have some projects like computer applications, Minecraft plugins, Minecraft servers, etc... Anything that is public should be in my <a href="${globalValues.github.url}">GitHub profile</a>.`,
    pestoWikiLogoAlt: "A digital drawing of the top of a fork with a black outline, in the right a text in white says 'Pesto Wiki'",
    homeMySoftwareNotableProjects: "These are my most notable projects:",
    blogTitle: "Listing blog posts:",
    eyeofnemesisProjectDesctiption: "Eye of Nemesis is a plugin that allows server admins to write policies that will deny or allow (black/whitelist) players to do specific things based on the value of nodes.",
    jamfishProjectDesctiption: "Native music player for Android devices that connects to Jellyfin media servers. The code is based on Gelli's archived repository, which is based on an old version of Phonograph.",
    pestoProjectDesctiption: "Multi-platform customizable client for wikis written in Python using PySide6 (QT).",
    itemeconomyProjectDesctiption: "This PaperMC plugin integrates with VaultUnlocked to provide a unique, item-based economy system for your Minecraft server. Instead of relying solely on virtual balances, players use in-game items as physical currency, adding a layer of immersion and realism to your economy.",
    by: "by",
    back: "back",
    hideBackground: "Hide background",
    options: "Options"
  },
  pt: {
    home: "início",
    welcome: "bem-vindo",
    homeWelcomeParagraph: "Parece que você encontrou meu website! Olá, sou <b>Adrian Victor</b> (ou <b>tenkuma</b>), um cara brasileiro que gosta de mexer com computadores, programas de computadores e <i>enimatpirtlitemídios</i>.",
    socialsAndContact: "redes sociais e contato",
    myMusic: "música",
    myVideos: "vídeos",
    mySoftware: "software",
    homeSocialsAndContactParagraph: `
      Estou publicamente disponível no Mastodon <a href='${globalValues.mastodon.url}'>(${globalValues.mastodon.username})</a>,
      GitHub <a href='${globalValues.github.url}'>(${globalValues.github.username})</a>,
      Disroot Git <a href='${globalValues.disrootGit.url}'>(${globalValues.disrootGit.username})</a>,
      Discord <a href='${globalValues.discord.url}'>(${globalValues.discord.username})</a>,
      YouTube <a href='${globalValues.youtube.url}'>(${globalValues.youtube.username})</a>,
      BitView <a href='${globalValues.bitview.url}'>(${globalValues.bitview.username})</a>,
      Modrinth <a href='${globalValues.modrinth.url}'>(${globalValues.modrinth.username})</a>
      e XMPP <a href='${globalValues.xmpp.url}'>(${globalValues.xmpp.username})</a>.
    `,
    homeSocialsAndContactParagraphTwo: `Você pode me enviar um correio eletrônico para <a href="mailto:${globalValues.email}">(${globalValues.email})</a> ou me contactar por qualquer outro meio citado acima. Para assuntos relativos a projetos específicos, verifique o campo de contato do projeto, caso não haja um adicione <i>+nomedoprojeto</i> ao meu endereço de E-mail (exemplo: adrianvictor+projetolegal@disroot.org).</p>
        <p><i><b>Por favor, evite me contactar por meios não citados acima :)</b></i>`,
    homeMyMusicParagraph: `Eu e meus amigos temos uma gravadora de música amadora chamada <span class="margarinaColor">Margarina Records</span>, as coisas andam devagar com meus projetos musicais, geralmente por causa da escola ou falta de conhecimento no campo, mas eu estou dando um jeito.`,
    homeMyMusicParagraphTwo: `Você pode conferir minhas músicas mais recentes no <a href="${globalValues.margarinaRecordsWebsite}">site da gravadora</a> e no <a href="${globalValues.genius.url}">Genius</a>. Você provavelmente vai gostar do trabalho dos outros membros, então dê uma olhada nas outras tracks da MGR.`,
    homeMyVideoParagraph: "Eu tenho um canal no YouTube em que na maioria das vezes eu posto vídeos de Minecraft, mas pretendo expandir a variedade de conteúdos no futuro. Não tenho nenhuma previsão de publicação no meu canal, pois editar os vídeos leva tempo e eu tenho pouco tempo para trabalhar nos meus projetos, você deveria se inscrever se quiser saber quando eu posto meus vídeos!",
    homeMyVideoRandomVideoParagraph: "Aqui está um vídeo aleatório que eu me orgulho de ter postado:",
    homeVideoTitle: "Como usar o MCA Selector para juntar mundos do Minecraft Java!",
    homeMySoftwareParagraph: `Estou estudando informática no IFC (SC, Brazil) mas no meu tempo livre tenho projetos como programas de computador, plugins para Minecraft, servidores Minecraft, etc... Todos meus projetos públicos estão disponíveis no meu <a href="${globalValues.github.url}">perfil do GitHub</a>.`,
    pestoWikiLogoAlt: "Um desenho digital do topo de um garfo com uma borda preta, à direita um texto branco diz 'Pesto Wiki'",
    homeMySoftwareNotableProjects: "Esses são meus projetos mais notáveis:",
    blogTitle: "Listando postagens do blog:",
    eyeofnemesisProjectDesctiption: "Eye of Nemesis é um plugin que permite aos administradores de servidores escrever políticas que negarão ou permitirão (lista negra/branca) que os jogadores façam coisas específicas com base no valor dos nós.",
    jamfishProjectDesctiption: "Reprodutor de música nativo para dispositivos Android que se conecta a servidores de mídia Jellyfin. O código é baseado no repositório arquivado do Gelli, que por sua vez se baseia em uma versão antiga do Phonograph.",
    pestoProjectDesctiption: "Cliente personalizável multiplataforma para wikis escrito em Python usando PySide6 (QT).",
    itemeconomyProjectDesctiption: "Este plugin PaperMC integra-se ao VaultUnlocked para fornecer um sistema de economia único baseado em itens para o seu servidor Minecraft. Em vez de depender apenas de saldos virtuais, os jogadores usam itens do jogo como moeda física, adicionando uma camada de imersão e realismo à sua economia.",
    by: "por",
    back: "voltar",
    hideBackground: "Esconder imagem de fundo",
    options: "Options"
  }
};
