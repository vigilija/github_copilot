<!-- l10n-sync: source-file="README.md" -->
🌐 [English](README.md) | [Español](README.es.md) | Português (Brasil) | [한국어](README.ko.md)

<div align="center">
  <h1>🎮 Mona Mayhem</h1>
  <p><strong>Transforme os gráficos de contribuições do GitHub em um duelo de fliperama.</strong></p>
  <p>Crie uma arena de batalha retrô com o GitHub Copilot, uma etapa do workshop por vez.</p>
  <p>
    <a href="workshop/pt_BR/00-overview.md"><strong>Comece o workshop →</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/vigilija/github_copilot/generate">Use este template</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/workshop-~1%20hour-7c3aed" alt="Workshop de aproximadamente uma hora">
    <img src="https://img.shields.io/badge/level-intermediate-f97316" alt="Nível intermediário">
    <img src="https://img.shields.io/badge/license-MIT-22c55e" alt="Licença MIT">
  </p>
</div>

![Captura de tela do Mona Mayhem](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*A arena de batalha de fliperama que você vai criar durante o workshop.*

## A missão

Mona Mayhem é um workshop prático para criar um aplicativo web que compara a atividade de contribuições de dois usuários do GitHub em um ambiente divertido de fliperama retrô. Comece com este template e trabalhe com o Copilot para planejar, desenvolver, estilizar e aprimorar a experiência.

Escolha o fluxo de trabalho que combina com você: fique no **VS Code** ou faça o workshop usando o **GitHub Copilot CLI**.

## Escolha sua trilha

| Trilha | Onde você trabalha | O que vai praticar |
|--------|--------------------|-------------------|
| **VS Code** | No editor | Chat, Plan Mode, Agent Mode, agentes em segundo plano e revisão |
| **Copilot CLI** | No terminal | `copilot`, contexto com `@file`, `/plan`, `/fleet`, `/delegate` e `/review` |

## Roteiro do workshop

| Parte | Workshop | O que vai praticar |
|-------|----------|--------------------|
| [00](workshop/pt_BR/00-overview.md) | Visão geral | Escolher uma trilha e definir seus objetivos |
| [01](workshop/pt_BR/01-setup.md) | Configuração e engenharia de contexto | Preparar o ambiente e fornecer contexto útil ao Copilot |
| [02](workshop/pt_BR/02-plan-and-scaffold.md) | Planejamento e estrutura inicial | Planejar a API e a arquitetura da página |
| [03](workshop/pt_BR/03-agent-mode.md) | Construir o jogo | Implementar a experiência de batalha com o Copilot |
| [04](workshop/pt_BR/04-design-vibes.md) | Tematização orientada a design | Dar ao app um visual retrô de fliperama |
| [05](workshop/pt_BR/05-polish.md) | Polimento e trabalho em paralelo | Melhorar a qualidade com fluxos paralelos e revisão |
| [06](workshop/pt_BR/06-bonus.md) | Bônus e extensões | Explorar recursos e experimentos adicionais |

## Comece agora

1. **Crie sua própria cópia** usando **Use this template** ou faça um fork deste repositório.
2. **Escolha sua trilha:**
   - Para **VS Code**, clone sua cópia e abra-a no VS Code.
   - Para o **Copilot CLI**, clone sua cópia e instale a CLI `copilot`.
3. Abra a [visão geral do workshop](workshop/pt_BR/00-overview.md) e siga o caminho escolhido.

### O que você precisa

- GitHub Copilot (Pro, Business ou Enterprise)
- Git e Node.js
- **Trilha do VS Code:** VS Code v1.107+ e a extensão GitHub Copilot
- **Trilha da CLI:** GitHub Copilot CLI (`copilot`); Node.js 22+ se a instalação for feita com npm

## Desenvolvido com

- [Astro](https://astro.build/) 7
- Node.js e o [adaptador Node do Astro](https://docs.astro.build/en/guides/integrations-guide/node/)
- Dados do gráfico de contribuições do GitHub
- Press Start 2P, para dar aquele clima de fliperama

<details>
  <summary>Notas sobre implantação</summary>

O [workflow atual do GitHub Pages](.github/workflows/deploy.yml) publica o workshop estático e a documentação de `docs/` e `workshop/`. Ele **não** compila nem implanta o app Astro de `src/`.

Antes da primeira implantação, habilite o GitHub Pages para o repositório em **Settings → Pages** e defina **Build and deployment → Source** como **GitHub Actions**. O workflow não consegue habilitar o Pages automaticamente com o `GITHUB_TOKEN` padrão.

Para implantar o app no GitHub Pages, mude o Astro para saída estática, remova o adaptador Node e atualize o workflow para compilar e publicar `dist/`. Para rotas de API em produção, use uma plataforma de servidor como Vercel, Netlify ou um host Node.js.
</details>

## Licença

[MIT](LICENSE)
