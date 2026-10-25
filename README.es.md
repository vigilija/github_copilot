<!-- l10n-sync: source-file="README.md" -->
🌐 [English](README.md) | Español | [Português (Brasil)](README.pt_BR.md) | [한국어](README.ko.md)

<div align="center">
  <h1>🎮 Mona Mayhem</h1>
  <p><strong>Convierte los gráficos de contribuciones de GitHub en un duelo de arcade.</strong></p>
  <p>Construye una arena de batalla de estilo retro con GitHub Copilot, paso a paso.</p>
  <p>
    <a href="workshop/es/00-overview.md"><strong>Empezar el taller →</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/vigilija/github_copilot/generate">Usar esta plantilla</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/workshop-~1%20hour-7c3aed" alt="Taller de aproximadamente una hora">
    <img src="https://img.shields.io/badge/level-intermediate-f97316" alt="Nivel intermedio">
    <img src="https://img.shields.io/badge/license-MIT-22c55e" alt="Licencia MIT">
  </p>
</div>

![Captura de Mona Mayhem](https://github.com/user-attachments/assets/5eca79e2-cb9f-4e93-aa0d-23666ebde3b7)
*La arena de batalla arcade que construirás durante el taller.*

## La misión

Mona Mayhem es un taller práctico para crear una aplicación web que compara la actividad de contribuciones de dos usuarios de GitHub en un divertido entorno de arcade retro. Empieza con esta plantilla y trabaja con Copilot para planificar, crear, diseñar y pulir la experiencia.

Elige el flujo de trabajo que prefieras: trabaja en **VS Code** o sigue el taller con **GitHub Copilot CLI**.

## Elige tu recorrido

| Recorrido | Dónde trabajas | Qué practicarás |
|-----------|----------------|-----------------|
| **VS Code** | En el editor | Chat, Plan Mode, Agent Mode, agentes en segundo plano y revisión |
| **Copilot CLI** | En el terminal | `copilot`, contexto con `@file`, `/plan`, `/fleet`, `/delegate` y `/review` |

## Hoja de ruta del taller

| Parte | Taller | Qué practicarás |
|------|--------|-----------------|
| [00](workshop/es/00-overview.md) | Visión general | Elegir un recorrido y definir tus objetivos |
| [01](workshop/es/01-setup.md) | Configuración e ingeniería de contexto | Preparar el entorno y dar contexto útil a Copilot |
| [02](workshop/es/02-plan-and-scaffold.md) | Planificación y estructura inicial | Planificar la API y la arquitectura de la página |
| [03](workshop/es/03-agent-mode.md) | Construir el juego | Implementar la experiencia de batalla con Copilot |
| [04](workshop/es/04-design-vibes.md) | Tematización orientada al diseño | Dar a la aplicación un aspecto de arcade retro |
| [05](workshop/es/05-polish.md) | Pulido y trabajo en paralelo | Mejorar la calidad con flujos paralelos y revisión |
| [06](workshop/es/06-bonus.md) | Bonus y extensiones | Explorar funcionalidades y experimentos adicionales |

## Primeros pasos

1. **Crea tu propia copia** con **Usar esta plantilla** o haz un fork de este repositorio.
2. **Elige tu recorrido:**
   - Para **VS Code**, clona tu copia y ábrela en VS Code.
   - Para **Copilot CLI**, clona tu copia e instala la CLI `copilot`.
3. Abre la [introducción al taller](workshop/es/00-overview.md) y sigue el recorrido que elegiste.

### Requisitos

- GitHub Copilot (Pro, Business o Enterprise)
- Git y Node.js
- **Recorrido de VS Code:** VS Code v1.107+ y la extensión GitHub Copilot
- **Recorrido de CLI:** GitHub Copilot CLI (`copilot`); Node.js 22+ si la instalas con npm

## Tecnologías

- [Astro](https://astro.build/) 7
- Node.js y el [adaptador de Astro para Node](https://docs.astro.build/en/guides/integrations-guide/node/)
- Datos del gráfico de contribuciones de GitHub
- Press Start 2P, para darle un aire arcade

<details>
  <summary>Notas sobre el despliegue</summary>

El [flujo de trabajo actual de GitHub Pages](.github/workflows/deploy.yml) publica el taller y la documentación estáticos de `docs/` y `workshop/`. **No** compila ni despliega la aplicación Astro de `src/`.

Antes del primer despliegue, habilita GitHub Pages para el repositorio en **Settings → Pages** y establece **Build and deployment → Source** en **GitHub Actions**. El flujo de trabajo no puede habilitar Pages automáticamente con el `GITHUB_TOKEN` predeterminado.

Para desplegar la aplicación en GitHub Pages, cambia Astro a salida estática, elimina el adaptador de Node y actualiza el flujo de trabajo para compilar y publicar `dist/`. Para las rutas de API de producción, utiliza una plataforma de servidor como Vercel, Netlify o un host de Node.js.
</details>

## Licencia

[MIT](LICENSE)
