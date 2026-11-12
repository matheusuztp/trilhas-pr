// Formulário: validação de TODOS os campos, máscara de celular e contador

const form = document.getElementById("formInscricao");

// Data de hoje no formato AAAA-MM-DD (fuso local), usada como data mínima
const agora = new Date();
agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
const hoje = agora.toISOString().slice(0, 10);
form.data.min = hoje;

// Uma regra por campo: devolve true (ok) ou o texto do erro
const regras = {
  nome: function (valor) {
    // Pelo menos nome e sobrenome, só letras (com acento) e espaços
    return /^[A-Za-zÀ-ÿ]{2,}( [A-Za-zÀ-ÿ]+)+$/.test(valor.trim()) || "Informe nome e sobrenome, apenas letras.";
  },
  email: function (valor) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(valor) || "E-mail inválido. Ex.: nome@dominio.com";
  },
  celular: function (valor) {
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(valor) || "Celular no formato (41) 99999-9999.";
  },
  data: function (valor) {
    if (valor === "") return "Escolha a data da trilha.";
    return valor >= hoje || "A data não pode estar no passado.";
  },
  trilha: function (valor) {
    return valor !== "" || "Escolha uma trilha.";
  },
  nivel: function (valor) {
    return valor !== "" || "Selecione seu nível de experiência.";
  },
  obs: function (valor) {
    return valor.length <= 200 || "Use no máximo 200 caracteres.";
  },
  termos: function () {
    return form.termos.checked || "É preciso aceitar as regras de segurança.";
  }
};

// Valida um campo e mostra/limpa a mensagem embaixo dele
function validarCampo(nome) {
  const resultado = regras[nome](form.elements[nome].value);
  const ok = resultado === true;
  const erro = document.getElementById("erro-" + nome);

  erro.textContent = ok ? "" : resultado;
  erro.closest(".campo").classList.toggle("invalido", !ok);
  return ok;
}

// Ao enviar: valida tudo; se algo falhar, cancela o envio
form.addEventListener("submit", function (evento) {
  let primeiroErro = null;

  Object.keys(regras).forEach(function (nome) {
    if (!validarCampo(nome) && primeiroErro === null) primeiroErro = nome;
  });

  if (primeiroErro !== null) {
    evento.preventDefault();
    const campo = form.elements[primeiroErro];
    (campo.focus ? campo : campo[0]).focus(); // radio é uma lista: foca o primeiro
  }
});

// Revalida ao sair do campo / mudar a opção
form.addEventListener("change", function (evento) {
  if (regras[evento.target.name]) validarCampo(evento.target.name);
});

// Enquanto digita, só revalida se o campo já estava com erro (some a mensagem na hora)
form.addEventListener("input", function (evento) {
  const nome = evento.target.name;
  if (regras[nome] && evento.target.closest(".campo").classList.contains("invalido")) {
    validarCampo(nome);
  }
});

// Máscara do celular: deixa só números e monta (99) 99999-9999
form.celular.addEventListener("input", function (evento) {
  const d = evento.target.value.replace(/\D/g, "").slice(0, 11);
  let valor = d;
  if (d.length > 7) valor = "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  else if (d.length > 2) valor = "(" + d.slice(0, 2) + ") " + d.slice(2);
  else if (d.length > 0) valor = "(" + d;
  evento.target.value = valor;
});

// Contador de caracteres das observações
const contador = document.getElementById("contador");
form.obs.addEventListener("input", function () {
  contador.textContent = form.obs.value.length + "/200";
});

// Botão Limpar: além de apagar os valores, some com as mensagens de erro
form.addEventListener("reset", function () {
  document.querySelectorAll(".campo").forEach(function (campo) {
    campo.classList.remove("invalido");
  });
  document.querySelectorAll(".erro").forEach(function (erro) {
    erro.textContent = "";
  });
  contador.textContent = "0/200";
});

// Se veio do "Saiba mais" (form.html?trilha=pico), já seleciona a trilha
const trilhaEscolhida = new URLSearchParams(window.location.search).get("trilha");
if (trilhaEscolhida) form.trilha.value = trilhaEscolhida;
