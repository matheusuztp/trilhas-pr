// Menu e tema: carregado em TODAS as páginas

// 1. Menu "hambúrguer": no celular o botão ☰ mostra/esconde os links
const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {
  const aberto = menu.classList.toggle("aberto");
  btnMenu.setAttribute("aria-expanded", aberto);
});

// 2. Tema claro/escuro: troca a classe do body e o CSS muda as cores
const btnTema = document.getElementById("btnTema");

// try/catch: o navegador pode bloquear o localStorage (ex.: janela anônima)
try {
  if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("escuro");
  }
} catch (e) {}

btnTema.addEventListener("click", function () {
  const escuro = document.body.classList.toggle("escuro");
  try {
    localStorage.setItem("tema", escuro ? "escuro" : "claro");
  } catch (e) {}
});
