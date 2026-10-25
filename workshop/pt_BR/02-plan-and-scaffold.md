<!-- l10n-sync: source-file="02-plan-and-scaffold.md" -->
# Parte 2: Planejamento e estrutura inicial

---

Antes de escrever qualquer código, vamos usar os fluxos de planejamento do Copilot para pensar na arquitetura. Planejar primeiro ajuda a projetar sistemas melhores e dá ao Copilot o contexto necessário para gerar código de maior qualidade.

## Tarefa 1: Planeje a arquitetura da API

<!-- track:vscode:start -->
1. Mude para o modo **Plan** no Copilot Chat (clique no seletor de modo na parte inferior do painel de chat).
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. Ative o **modo de planejamento** no Copilot CLI pressionando **Shift+Tab** até o modo mudar ou usando `/plan`.
<!-- track:cli:end -->

2. Insira este prompt:

   ```
   I need to build a server-side API proxy that fetches GitHub contribution data
   for any username. The endpoint is https://github.com/{username}.contribs which
   returns JSON. The browser should call our API same-origin only. Plan the
   implementation including the route structure, error handling, and a shared
   Redis cache with a five-minute TTL. If Redis is unavailable, fetch upstream
   without caching.
   ```

3. **Revise o plano** — é aqui que o planejamento faz a diferença. Não aceite a primeira resposta sem pensar:
   - Peça esclarecimentos sobre o que não estiver claro.
   - Sugira alterações se algo não parecer adequado.
   - Itere até estar satisfeito com a abordagem.

<!-- track:vscode:start -->
4. Quando estiver satisfeito com o plano, peça ao Copilot para implementá-lo: mude para o modo **Agent** e peça para prosseguir.
<!-- track:vscode:end -->

<!-- track:cli:start -->
4. Quando estiver satisfeito com o plano, peça ao Copilot CLI para prosseguir com a implementação.
5. Revise os arquivos alterados com `/diff` antes de aprová-los.
<!-- track:cli:end -->

6. **Resultado:** Você deverá ter uma rota de API em:

   ```
   src/pages/api/contributions/[username].ts
   ```

## Tarefa 2: Teste a API

> **⚠️ Não está vendo as alterações?** Se o servidor de desenvolvimento não detectar a nova rota, pare-o (`Ctrl+C`) e reinicie com `npm run dev`.

1. Certifique-se de que o servidor de desenvolvimento está rodando e teste o endpoint:

   ```bash
   curl http://localhost:4321/api/contributions/octocat
   ```

2. Você deverá receber dados de contribuições em JSON.
3. Teste também o caso de erro: use um nome de usuário inválido e confirme que a resposta de erro é adequada.

A rota da API é `GET /api/contributions/:username`. Ela valida nomes de usuário no formato do GitHub e, em caso de sucesso, retorna o JSON do serviço upstream. Os erros são retornados em um objeto JSON com um campo `error` que contém um código e uma mensagem (`400` nome de usuário inválido, `403` origem não permitida, `404` usuário não encontrado, `502` falha no upstream ou `504` tempo limite). As solicitações do navegador só podem ser feitas pela mesma origem; solicitações de linha de comando sem um cabeçalho `Origin` são permitidas.

O cache compartilhado usa Redis quando `REDIS_URL` está configurada e mantém respostas bem-sucedidas por cinco minutos. Se o Redis não estiver configurado ou não puder ser acessado, a rota registra o problema no cache e busca dados atualizados sem armazená-los em cache. O CORS controla o acesso do navegador, não o acesso direto por clientes de linha de comando ou servidores.

## Tarefa 3: Planeje a página de batalha

<!-- track:vscode:start -->
1. Continue no modo **Plan** e insira este prompt:
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. Continue no modo de planejamento (ou execute `/plan`) e insira este prompt:
<!-- track:cli:end -->

   ```
   Now I need the main page. Plan a battle page for "Mona Mayhem - GitHub
   Contribution Battle Arena" with: two username inputs (Player 1 and Player 2),
   a battle button, and a results area. Keep the UI simple — don't over-engineer
   the layout or styling at this stage. Plan the HTML structure, basic styling,
   and how the battle interaction will work.
   ```

2. **Revise e itere** no plano — faça perguntas, sugira alterações e refine a abordagem.

<!-- track:vscode:start -->
3. Quando estiver satisfeito, mude para o modo **Agent** e deixe o Copilot construir a página.
<!-- track:vscode:end -->

<!-- track:cli:start -->
3. Quando estiver satisfeito, peça ao Copilot CLI para implementar o plano aprovado.
4. Use `/diff` para revisar o esqueleto de HTML e CSS antes de aprová-lo.
<!-- track:cli:end -->

## Tarefa 4: Verifique o scaffold

> **⚠️ Não está vendo as alterações?** Se a página não estiver correta ou não tiver sido atualizada, pare o servidor de desenvolvimento (`Ctrl+C`), reinicie com `npm run dev` e atualize o navegador.

1. Abra http://localhost:4321 no navegador.
2. Você deverá ver:
   - O título do jogo.
   - Dois campos de nome de usuário (Player 1 e Player 2).
   - Um botão de batalha.
3. O botão ainda não vai funcionar — isso é esperado! Ainda não conectamos a lógica de interação. Isso vem a seguir.

---

## ✅ Parte 2 concluída!

Você aprendeu a:

- **Planejar antes de programar**, em vez de começar direto pela implementação.
- **Iterar nos planos** até a arquitetura ficar adequada.
- **Passar do planejamento à implementação** com um fluxo de trabalho mais claro e seguro.
