// Página Sobre: acordeão (clicar no título abre/fecha o painel logo abaixo)

document.querySelectorAll(".acordeao-botao").forEach(function (botao) {
  botao.addEventListener("click", function () {
    const aberto = botao.classList.toggle("aberto");
    botao.nextElementSibling.classList.toggle("aberto", aberto);
    botao.setAttribute("aria-expanded", aberto);
  });
});
