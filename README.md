# Trilhas PR

Guia fictício de trilhas do Paraná feito só com HTML, CSS e JavaScript, sem frameworks. Atividade Somativa 1 de Fundamentos de Programação Web (PUCPR).

## Páginas

| Arquivo | O que faz |
|---|---|
| `index.html` | Página inicial com cards de trilhas e modal "Saiba mais" |
| `form.html` | Formulário de inscrição com validação de todos os campos, enviado por GET |
| `formAction.html` | Lê os dados da URL com `URLSearchParams` e mostra a confirmação |
| `about.html` | Apresentação do trabalho e do autor |

Estilos ficam em `css/`, scripts em `script/` e imagens em `img/`. Todos os caminhos são relativos.

## Como abrir

Dê dois cliques em `index.html`. Também dá para servir a pasta localmente:

```bash
python -m http.server 8000
```

e acessar `http://localhost:8000`.
