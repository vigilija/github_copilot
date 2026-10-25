<!-- l10n-sync: source-file="04-design-vibes.md" -->
# Parte 4: Tematização orientada a design

---

Nesta parte, você vai usar os ciclos de planejamento e implementação do Copilot para transformar o tema de forma abrangente. Este é um fluxo de desenvolvimento orientado a design: comece com uma visão, itere nos elementos visuais e deixe o Copilot cuidar do trabalho de CSS.

## Tarefa 1: Planeje o tema retrô

<!-- track:vscode:start -->
Mude para o modo **Plan** no GitHub Copilot Chat.
<!-- track:vscode:end -->

<!-- track:cli:start -->
Use `/plan` no GitHub Copilot CLI ou pressione **Shift+Tab** até ativar o modo de planejamento.
<!-- track:cli:end -->

Insira este prompt:

> Quero transformar esta página em uma experiência completa de fliperama retrô. Planeje uma reformulação visual abrangente que inclua: efeitos de linhas de varredura CRT no fundo, brilho neon pulsante no título, selo VS animado com mudanças de gradiente, efeito de brilho sobre os cartões de resultado dos usuários, animações de entrada flutuante nos campos de entrada, texto de carregamento alternando entre verde e roxo e efeitos de brilho ao passar o cursor sobre os quadrados de contribuição. Mantenha o fundo escuro (`#0a0a1a`) com cores de destaque verde (`#5fed83`) e roxo (`#8a2be2`). Use um tema escuro e a fonte retrô de videogame Press Start 2P do Google Fonts.

O Copilot vai gerar um plano detalhado que abrange todos os efeitos visuais. **Não aceite imediatamente** — revise o plano e itere:

- Sugira ajustes no ritmo das animações, por exemplo: *“Deixe o pulso neon mais lento, com cerca de 3 segundos.”*
- Pergunte sobre efeitos específicos, por exemplo: *“Como o efeito de brilho nos cartões vai funcionar?”*
- Peça mudanças na abordagem se algo não parecer adequado.

## Tarefa 2: Implemente o tema

Quando estiver satisfeito com o plano, peça ao Copilot para implementá-lo:

> Implemente o plano de tema retrô de fliperama que acabamos de criar.

O Copilot vai adicionar várias animações CSS, pseudoelementos e transições à folha de estilos. Isso pode incluir:

- `@keyframes` para as linhas de varredura, o pulso neon, o brilho e as animações de entrada flutuante.
- Pseudoelementos (`::before`, `::after`) para efeitos de sobreposição.
- Propriedades personalizadas de CSS para as cores do tema.
- Transições e estados de hover para elementos interativos.

<!-- track:cli:start -->
Depois que as alterações forem aplicadas, use `/diff` para revisá-las antes de aprovar.
<!-- track:cli:end -->

## Tarefa 3: Ajuste o visual

> **⚠️ Não está vendo as alterações?** Se o novo tema ou as animações não aparecerem, pare o servidor de desenvolvimento (`Ctrl+C`), reinicie-o com `npm run dev` e atualize a página completamente (`Ctrl+Shift+R`).

Mantenha a prévia do navegador aberta e itere no design. Experimente prompts como:

> O efeito de linhas de varredura está intenso demais; reduza a opacidade para 0.03.

> Adicione uma oscilação elétrica sutil ao texto do título.

> O selo VS deve pulsar com mais intensidade.

Isso é **desenvolvimento orientado a design** — você está iterando no resultado visual em tempo real. Cada prompt refina a experiência até que fique do jeito certo. Não se contente com “bom o suficiente”: ajuste o visual até a página parecer parte de um fliperama.

## Tarefa 4: Atualize as instruções

Suas instruções devem refletir as principais decisões de design para manter os próximos prompts alinhados.

<!-- track:vscode:start -->
Peça ao Copilot Chat:

> Adicione uma seção de guia de design ao `copilot-instructions.md`, descrevendo nosso tema retrô de fliperama: cores, fontes e estilo das animações.
<!-- track:vscode:end -->

<!-- track:cli:start -->
Peça ao Copilot CLI:

> Atualize as instruções do repositório com um guia curto de design para o tema retrô de fliperama: cores, fontes, estilo das animações e a regra de que novas interfaces devem manter a estética neon.
<!-- track:cli:end -->

Quando a página estiver do jeito que você quer, faça commit das instruções atualizadas e das alterações de design.

## ✅ Parte 4 concluída

**O que você aprendeu:**

- Usar fluxos de planejamento para definir um **sistema de design antes de implementá-lo**.
- **Iterar no resultado visual** com prompts de acompanhamento para refinar o design.
- **Atualizar as instruções após decisões importantes** para manter a identidade visual consistente no Copilot.
