🌐 English | [Español](README.es.md) | [Português (Brasil)](README.pt_BR.md) | [한국어](README.ko.md)

<div align="center">
  <h1>🎮 Mona Mayhem</h1>
  <p><strong>Turn GitHub contribution graphs into an arcade showdown.</strong></p>
  <p>Build a retro-inspired battle arena with GitHub Copilot, one workshop step at a time.</p>
  <p>
    <a href="workshop/00-overview.md"><strong>Start the workshop →</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/vigilija/github_copilot/generate">Use this template</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/workshop-~1%20hour-7c3aed" alt="About one-hour workshop">
    <img src="https://img.shields.io/badge/level-intermediate-f97316" alt="Intermediate level">
    <img src="https://img.shields.io/badge/license-MIT-22c55e" alt="MIT license">
  </p>
</div>

![Mona Mayhem Screenshot](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*The arcade battle arena you'll build during the workshop.*

## The mission

Mona Mayhem is a hands-on workshop for building a web app that compares two GitHub users' contribution activity in a playful, retro arcade setting. Start with this project template, then work with Copilot to plan, build, style, and polish the experience.

Choose the workflow that suits you: stay in **VS Code**, or take the workshop to the **GitHub Copilot CLI**.

## Choose your track

| Track | Where you work | What you'll practice |
|-------|----------------|----------------------|
| **VS Code** | In the editor | Chat, Plan Mode, Agent Mode, background agents, and review |
| **Copilot CLI** | In the terminal | `copilot`, `@file` context, `/plan`, `/fleet`, `/delegate`, and `/review` |

## Your workshop roadmap

| Part | Workshop | You'll practice |
|------|----------|-----------------|
| [00](workshop/00-overview.md) | Overview | Pick a track and set your goals |
| [01](workshop/01-setup.md) | Setup & Context Engineering | Prepare your environment and give Copilot useful context |
| [02](workshop/02-plan-and-scaffold.md) | Plan & Scaffold | Plan the API and page architecture |
| [03](workshop/03-agent-mode.md) | Build the Game | Implement the battle experience with Copilot |
| [04](workshop/04-design-vibes.md) | Design-First Theming | Give the app its retro arcade look |
| [05](workshop/05-polish.md) | Polish & Parallel Work | Improve quality with parallel workflows and review |
| [06](workshop/06-bonus.md) | Bonus & Extensions | Explore extra features and experiments |

## Get started

1. **Create your own copy** with **Use this template** above, or fork this repository.
2. **Choose your track:**
   - For **VS Code**, clone your copy and open it in VS Code.
   - For the **Copilot CLI**, clone your copy and install the `copilot` CLI.
3. Open the [workshop overview](workshop/00-overview.md) and follow your chosen path.

### What you'll need

- GitHub Copilot (Pro, Business, or Enterprise)
- Git and Node.js
- **VS Code track:** VS Code v1.107+ and the GitHub Copilot extension
- **CLI track:** GitHub Copilot CLI (`copilot`); Node.js 22+ if installing it with npm

## Built with

- [Astro](https://astro.build/) 7
- Node.js and the [Astro Node adapter](https://docs.astro.build/en/guides/integrations-guide/node/)
- GitHub contribution graph data
- Press Start 2P, for that arcade feel

<details>
  <summary>Deployment notes</summary>

The current [GitHub Pages workflow](.github/workflows/deploy.yml) publishes the static workshop and documentation from `docs/` and `workshop/`. It does **not** build or deploy the Astro app in `src/`.

Before the first deployment, enable GitHub Pages for the repository under **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**. The workflow cannot enable Pages automatically with the default `GITHUB_TOKEN`.

To deploy the app on GitHub Pages, switch Astro to static output, remove the Node adapter, and update the workflow to build and publish `dist/`. For production API routes, use a server platform such as Vercel, Netlify, or a Node.js host.
</details>

## License

[MIT](LICENSE)
