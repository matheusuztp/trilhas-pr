// Página inicial: janela pop-up (modal) com os detalhes de cada trilha

const trilhas = {
  pico: {
    nome: "Pico Paraná",
    texto: "Com cerca de 1.877 m de altitude, é o ponto mais alto do Sul do Brasil. A subida é longa e exige preparo físico.",
    detalhes: ["Local: Campina Grande do Sul", "Dificuldade: difícil", "Duração: 1 a 2 dias (com pernoite)"]
  },
  anhangava: {
    nome: "Morro do Anhangava",
    texto: "Fica a cerca de 30 km de Curitiba e é muito procurado para ver o nascer do sol e praticar escalada.",
    detalhes: ["Local: Quatro Barras", "Dificuldade: moderada", "Duração: cerca de 1h30 de subida"]
  },
  itupava: {
    nome: "Caminho do Itupava",
    texto: "Caminho histórico calçado em pedra, usado há séculos para ligar o litoral ao planalto pela Mata Atlântica.",
    detalhes: ["Local: Quatro Barras a Morretes", "Dificuldade: fácil a moderada", "Duração: 6 a 8 horas"]
  }
};

const modal = document.getElementById("modal");

function abrirModal(id) {
  const trilha = trilhas[id];
  document.getElementById("modalTitulo").textContent = trilha.nome;
  document.getElementById("modalTexto").textContent = trilha.texto;

  const lista = document.getElementById("modalLista");
  lista.innerHTML = "";
  trilha.detalhes.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });

  // O link leva ao formulário já com a trilha escolhida (?trilha=...)
  document.getElementById("modalLink").href = "form.html?trilha=" + id;
  modal.classList.add("aberto");
  document.getElementById("btnFechar").focus();
}

function fecharModal() {
  modal.classList.remove("aberto");
}

// Cada botão "Saiba mais" guarda o id da trilha no atributo data-trilha
document.querySelectorAll("[data-trilha]").forEach(function (botao) {
  botao.addEventListener("click", function () {
    abrirModal(botao.dataset.trilha);
  });
});

document.getElementById("btnFechar").addEventListener("click", fecharModal);

// Fecha clicando fora da caixa ou apertando Esc
modal.addEventListener("click", function (evento) {
  if (evento.target === modal) fecharModal();
});
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") fecharModal();
});
