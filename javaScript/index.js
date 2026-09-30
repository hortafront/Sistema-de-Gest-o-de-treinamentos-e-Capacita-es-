/* =====================================================
   JAVASCRIPT DA TELA DE LOGIN
   Feito para o seu HTML (sem precisar mudar nada nele).

   Ordem do arquivo:
   1. Dados e configurações     5. Validação e mensagens de erro
   2. Pegar os elementos        6. Login (verificar usuário)
   3. Criar elementos extras    7. Bloqueio após erros
   4. Interações simples        8. Ligar os eventos
   ===================================================== */


/* ---------- 1. DADOS E CONFIGURAÇÕES ---------- */

// Usuários de teste. Como ainda não temos back-end, o "banco de dados" é
// este array. ATENÇÃO: num sistema real a senha NUNCA fica no código!
const USUARIOS = [
    { login: "gusta",    senha: "123", perfil: "funcionario",   nome: "Gusta" },
    { login: "carlos", senha: "123456", perfil: "gestor",        nome: "Carlos" },
    { login: "marina", senha: "123456", perfil: "rh",            nome: "Marina Alves" },
    { login: "paulo",  senha: "123456", perfil: "instrutor",     nome: "Paulo Rocha" },
    { login: "admin",  senha: "123456", perfil: "administrador", nome: "Administrador" }
];

// Mesma ORDEM das <option> do seu <select> no HTML.
// (Se mudar a ordem no HTML, mude aqui também.)
const PERFIS = ["funcionario", "gestor", "rh", "instrutor", "administrador"];

// Nome bonito de cada perfil, usado nas mensagens
const NOMES_PERFIL = {
    funcionario: "Funcionário(a)",
    gestor: "Gestor(a)",
    rh: "RH",
    instrutor: "Instrutor(a)",
    administrador: "Administrador(a)"
};

// Frase que aparece no título conforme o perfil escolhido
const FRASES = {
    funcionario: "Entre para acompanhar seus treinamentos.",
    gestor: "Acompanhe a evolução da sua equipe.",
    rh: "Gerencie as capacitações da empresa.",
    instrutor: "Organize suas turmas e conteúdos.",
    administrador: "Configure e controle todo o sistema."
};

// Para qual página cada perfil vai depois do login.
// Crie estas páginas quando for fazendo o resto do projeto.
const DESTINOS = {
    funcionario: "painel-funcionario.html",
    gestor: "painel-gestor.html",
    rh: "painel-rh.html",
    instrutor: "painel-instrutor.html",
    administrador: "painel-admin.html"
};

// Deixe false enquanto as páginas acima não existem (senão dá erro 404).
// Quando criar as páginas, mude para true.
const REDIRECIONAR = false;

const MAX_TENTATIVAS = 3;      // erros permitidos antes de bloquear
const TEMPO_BLOQUEIO = 15;     // segundos de bloqueio

// Variáveis que mudam durante o uso (por isso "let", não "const")
let tentativas = 0;
let bloqueado = false;


/* ---------- 2. PEGAR OS ELEMENTOS ----------
   querySelector(".classe") acha o primeiro elemento com aquela classe.
   getElementById("id") acha pelo id. */
const cartao      = document.querySelector(".body");
const frase       = document.querySelector(".h1 p");
const campoLogin  = document.querySelector(".login");
const campoSenha  = document.querySelector(".senha");
const inputLogin  = document.getElementById("login");
const inputSenha  = document.getElementById("senha");
const seletor     = document.querySelector("select");
const botao       = document.querySelector(".butao button");


/* ---------- 3. CRIAR ELEMENTOS EXTRAS ----------
   Em vez de mexer no HTML, o JavaScript cria estes dois elementos. */

// Botão "Mostrar/Ocultar" da senha
const botaoVer = document.createElement("button");
botaoVer.type = "button";              // "button" não envia o formulário
botaoVer.className = "ver-senha";
botaoVer.textContent = "Mostrar";
campoSenha.appendChild(botaoVer);      // appendChild coloca dentro da div .senha

// Parágrafo onde aparecem as mensagens (sucesso ou erro)
const mensagem = document.createElement("p");
mensagem.className = "mensagem";
mensagem.setAttribute("role", "status");   // leitores de tela anunciam a mudança
document.querySelector(".butao").appendChild(mensagem);


/* ---------- 4. INTERAÇÕES SIMPLES ---------- */

// Mostrar / ocultar a senha
botaoVer.addEventListener("click", () => {
    const escondida = inputSenha.type === "password";
    inputSenha.type = escondida ? "text" : "password";   // ternário: condição ? sim : não
    botaoVer.textContent = escondida ? "Ocultar" : "Mostrar";
    inputSenha.focus();                                  // devolve o cursor ao campo
});

// Troca a frase do título (com efeito de sumir e aparecer)
frase.style.transition = "opacity .25s";

function atualizarFrase() {
    const perfil = PERFIS[seletor.selectedIndex];   // selectedIndex = posição da opção escolhida
    frase.style.opacity = 0;
    setTimeout(() => {                              // espera o "sumir" terminar
        frase.textContent = FRASES[perfil];
        frase.style.opacity = 0.9;
    }, 250);
}

seletor.addEventListener("change", () => {
    atualizarFrase();
    // localStorage guarda dados no navegador, mesmo depois de fechar a página
    localStorage.setItem("ultimoPerfil", seletor.selectedIndex);
});

// Ao abrir a página, lembra o último perfil usado
const perfilSalvo = localStorage.getItem("ultimoPerfil");
if (perfilSalvo !== null) {
    seletor.selectedIndex = Number(perfilSalvo);
    frase.textContent = FRASES[PERFIS[seletor.selectedIndex]];
}

// Já deixa o cursor pronto no campo de login
inputLogin.focus();


/* ---------- 5. VALIDAÇÃO E MENSAGENS DE ERRO ---------- */

// Mostra o erro embaixo de um campo (a classe "invalido" ativa o CSS vermelho)
function mostrarErro(campo, texto) {
    campo.classList.add("invalido");
    let aviso = campo.querySelector(".erro");
    if (!aviso) {                          // só cria o aviso se ainda não existir
        aviso = document.createElement("span");
        aviso.className = "erro";
        campo.appendChild(aviso);
    }
    aviso.textContent = texto;
}

// Remove o erro de um campo
function limparErro(campo) {
    campo.classList.remove("invalido");
    const aviso = campo.querySelector(".erro");
    if (aviso) aviso.remove();
}

// O erro some assim que a pessoa começa a digitar de novo
inputLogin.addEventListener("input", () => limparErro(campoLogin));
inputSenha.addEventListener("input", () => limparErro(campoSenha));

// Escreve uma mensagem no rodapé do cartão. tipo = "ok" ou "falha"
function dizer(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = "mensagem " + tipo;
}

// Faz o cartão tremer (usado quando o login falha)
function tremerCartao() {
    cartao.classList.add("tremer");
    setTimeout(() => cartao.classList.remove("tremer"), 400);
}

// Volta o botão ao normal
function liberarBotao() {
    botao.disabled = false;
    botao.textContent = "Entrar";
}


/* ---------- 6. LOGIN ---------- */

function entrar() {
    if (bloqueado) return;                 // durante o bloqueio, nada acontece
    dizer("", "");                         // limpa a mensagem anterior

    // trim() tira espaços das pontas; toLowerCase() ignora maiúsculas no login
    const login = inputLogin.value.trim().toLowerCase();
    const senha = inputSenha.value;
    const perfil = PERFIS[seletor.selectedIndex];

    // 1º: campos vazios (mostra os dois erros de uma vez, se for o caso)
    let camposOk = true;
    if (login === "") {
        mostrarErro(campoLogin, "Informe seu login.");
        camposOk = false;
    }
    if (senha === "") {
        mostrarErro(campoSenha, "Informe sua senha.");
        camposOk = false;
    }
    if (!camposOk) return;                 // return interrompe a função aqui

    // 2º: mostra "Entrando..." e simula a espera de um servidor
    botao.disabled = true;
    botao.textContent = "Entrando...";
    setTimeout(() => verificar(login, senha, perfil), 900);
}

function verificar(login, senha, perfil) {
    // find() devolve o primeiro usuário que combina com login E senha
    const usuario = USUARIOS.find((u) => u.login === login && u.senha === senha);

    if (!usuario) {
        falhar("Login ou senha incorretos.");
        return;
    }
    if (usuario.perfil !== perfil) {
        falhar("Este usuário não tem acesso como " + NOMES_PERFIL[perfil] + ".");
        return;
    }

    // Sucesso! sessionStorage guarda quem entrou enquanto a aba estiver aberta.
    // As outras páginas podem ler isso com sessionStorage.getItem("usuario").
    sessionStorage.setItem("usuario", JSON.stringify({ nome: usuario.nome, perfil: usuario.perfil }));

    tentativas = 0;
    dizer("Bem-vindo(a), " + usuario.nome + "! Entrando como " + NOMES_PERFIL[perfil] + "...", "ok");
    botao.textContent = "Pronto!";

    if (REDIRECIONAR) {
        setTimeout(() => { window.location.href = DESTINOS[perfil]; }, 1200);
    } else {
        setTimeout(liberarBotao, 1500);
    }
}

function falhar(texto) {
    tentativas++;
    tremerCartao();
    liberarBotao();

    if (tentativas >= MAX_TENTATIVAS) {
        bloquear();
    } else {
        dizer(texto + " Tentativas restantes: " + (MAX_TENTATIVAS - tentativas) + ".", "falha");
    }
}


/* ---------- 7. BLOQUEIO APÓS ERROS ---------- */
function bloquear() {
    bloqueado = true;
    botao.disabled = true;
    let restante = TEMPO_BLOQUEIO;

    // setInterval repete a função a cada 1000 ms (1 segundo)
    const relogio = setInterval(() => {
        dizer("Muitas tentativas. Tente novamente em " + restante + "s.", "falha");
        restante--;

        if (restante < 0) {
            clearInterval(relogio);        // para de repetir
            bloqueado = false;
            tentativas = 0;
            liberarBotao();
            dizer("", "");
        }
    }, 1000);
}


/* ---------- 8. LIGAR OS EVENTOS ----------
   No seu HTML cada campo está em um <form> separado. Então tanto o clique
   no botão quanto o Enter (que envia o form do campo) precisam ser
   capturados. O preventDefault() impede a página de recarregar. */
document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        entrar();
    });
});