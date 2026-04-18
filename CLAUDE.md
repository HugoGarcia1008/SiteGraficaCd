# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page estática para a **Gráfica CD** — tema laranja (`#F07920`) e preto (`#111111`). Sem framework, sem build step, sem dependências de node.

## Abrir no navegador

Abra `index.html` diretamente no navegador. Não há servidor necessário.

## Estrutura de arquivos

```
index.html       # Markup e estrutura da página
css/style.css    # Todos os estilos (variáveis CSS, layout, animações, responsivo)
js/script.js     # Formulário (mailto), scroll reveal, nav scroll, máscara de telefone
```

## Design tokens (css/style.css)

```css
--orange: #F07920
--orange-light: #F5A54A
--orange-dark: #C05C0A
--black: #111111
--gray-dark: #1E1E1E
--gray-mid: #444444
--gray-light: #CCCCCC
--white: #F5F5F5
```

Fontes via Google Fonts: **Bebas Neue** (títulos) e **DM Sans** (corpo).

## Seções da página (ordem)

`nav` → `hero` → `stats` → `#servicos` → `#diferenciais` → `#contato` → `footer`

### nav
- Logo texto "Gráfica CD" à esquerda
- Links: Serviços, Diferenciais, Contato
- Botão CTA: `📞 (11) 4127-8053` → `tel:+551141278053`
- Efeito scroll: fundo fica mais opaco ao rolar

### hero
- Layout 2 colunas: conteúdo à esquerda, `.hero-visual` com `.logo-wrap` à direita
- `.logo-wrap` tem anéis giratórios via CSS `::before` / `::after`

### stats
- Faixa com 4 métricas: 10+ anos · 500+ clientes · 4.4 Google · 24h prazo

### #servicos
- Grid 3×3 com 8 cards de serviço + 1 card CTA
- Cada card: número, ícone, nome, descrição, `.service-tags` (pills), link "Solicitar orçamento"
- Card especial `.service-card--cta`: fundo degradê laranja, botão direto para contato

### #diferenciais ("Por que escolher a CD?")
- Cabeçalho + subtítulo centralizados
- Grid 3×2 com `.why-card` (6 diferenciais)
- Barra `.why-trust` com 4 métricas: +500 clientes · +15 anos · 98% satisfação · 24h

### #contato
- 2 colunas: info (endereço, telefone, horário) + formulário
- Formulário envia via `mailto:graficacd@terra.com.br` (abre cliente de e-mail)
- Campos: nome, telefone (com máscara), email, serviço (select), mensagem

### footer
- Logo + copyright + "Desenvolvido com ♥"

### Botão WhatsApp flutuante
- Fixo no canto inferior direito
- Número: `https://wa.me/5511998483958` → (11) 99848-3958

## JS (js/script.js)

- `handleSubmit(e)` — monta `mailto:graficacd@terra.com.br` com os dados do formulário e abre o cliente de e-mail
- `IntersectionObserver` — scroll reveal em `.service-card`, `.why-item`, `.stat`, `.contact-item`
- Scroll listener — escurece nav ao passar de 60px
- Máscara de telefone — formata `input[type="tel"]` em tempo real

## Contatos da empresa

- Telefone: `(11) 4127-8053`
- WhatsApp: `(11) 99848-3958`
- E-mail: `graficacd@terra.com.br`
- Endereço: R. José Herculano Píres, 115 – Nova Petrópolis, SBC – SP
- Horário: Seg–Sex · 08:00 às 17:30

## Sincronização automática com GitHub

Hook `PostToolUse` em `.claude/settings.json` faz commit + push automático após cada `Write` ou `Edit`.

Repositório: **https://github.com/HugoGarcia1008/SiteGraficaCd**
