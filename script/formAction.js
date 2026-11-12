// Página de confirmação: lê os dados enviados pelo formulário com método GET

// Tudo o que vem depois do "?" na URL, ex.: ?nome=Ana+Souza&email=...
const dados = new URLSearchParams(window.location.search);

const nomesTrilha = { pico: "Pico Paraná", anhangava: "Morro do Anhangava", itupava: "Caminho do Itupava" };
const nomesNivel = { iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Avançado" };

// Converte 2026-12-05 em 05/12/2026
function formatarData(valor) {
  const partes = valor.split("-");
  return partes.length === 3 ? partes[2] + "/" + partes[1] + "/" + partes[0] : valor;
}

if (!dados.has("nome")) {
  // Página aberta direto, sem enviar o formulário
  document.getElementById("semDados").classList.remove("oculto");
} else {
  const linhas = [
    ["Nome", dados.get("nome")],
    ["E-mail", dados.get("email")],
    ["Celular", dados.get("celular")],
    ["Data da trilha", formatarData(dados.get("data") || "")],
    ["Trilha", nomesTrilha[dados.get("trilha")] || dados.get("trilha")],
    ["Nível", nomesNivel[dados.get("nivel")] || dados.get("nivel")],
    ["Observações", dados.get("obs") || "—"],
    ["Regras de segurança", dados.get("termos") === "sim" ? "Aceitas" : "Não aceitas"]
  ];

  // textContent (e não innerHTML): o que vem da URL é exibido como texto, nunca como código
  const tabela = document.getElementById("tabelaDados");
  linhas.forEach(function (linha) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.textContent = linha[0];
    td.textContent = linha[1] || "—";
    tr.appendChild(th);
    tr.appendChild(td);
    tabela.appendChild(tr);
  });

  const primeiroNome = (dados.get("nome") || "").trim().split(" ")[0];
  document.getElementById("saudacao").textContent = "Inscrição recebida, " + primeiroNome + "!";
  document.getElementById("queryString").textContent = window.location.search;
  document.getElementById("resultado").classList.remove("oculto");
}
