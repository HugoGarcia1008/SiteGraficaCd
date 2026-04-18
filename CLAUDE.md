# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page estática para a **Gráfica CD** — tema laranja (`#F07920`) e preto (`#111111`). Sem framework, sem build step, sem dependências de node.

## Abrir no navegador

Abra `index.html` diretamente no navegador. Não há servidor necessário.

## Estrutura

```
index.html       # Markup e estrutura da página
css/style.css    # Todos os estilos (variáveis CSS, layout, animações)
js/script.js     # Interações: submit do formulário + scroll reveal
```

## Design tokens (css/style.css)

```css
--orange: #F07920
--orange-light: #F5A54A
--orange-dark: #C05C0A
--black: #111111
--gray-dark: #2A2A2A
--white: #F5F5F5
```

Fontes via Google Fonts: **Bebas Neue** (títulos) e **DM Sans** (corpo).

## Sincronização automática com GitHub

O projeto está configurado para **fazer commit e push automaticamente** a cada arquivo salvo via Claude Code.

Isso é feito via hook `PostToolUse` em `.claude/settings.json`:
- Dispara após qualquer `Write` ou `Edit`
- Executa `git add -A && git commit -m "auto: update files" && git push`
- Só faz commit se houver mudanças reais (evita commits vazios)

Repositório: **https://github.com/HugoGarcia1008/SiteGraficaCd**

## Seções da página

`nav` → `hero` → `stats` → `services-grid` → `why` → `contact` → `footer`

## JS (js/script.js)

- `handleSubmit(e)` — feedback visual no botão do formulário (chamado via `onsubmit` no HTML)
- `IntersectionObserver` — scroll reveal em `.service-card`, `.why-item`, `.stat`, `.contact-item`
