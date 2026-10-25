<!-- l10n-sync: source-file="03-agent-mode.md" -->
# Parte 3: Crie o jogo com fluxos de trabalho agênticos

---

Nesta parte, o Copilot passa de planejador a implementador. Em vez de escrever código linha por linha, você descreve o que deseja e deixa o Copilot fazer as alterações necessárias nos arquivos.

## Tarefa 1: Conecte a batalha

<!-- track:vscode:start -->
1. Mude para o modo **Agent** no Copilot Chat.
2. Insira este prompt:
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. Volte ao fluxo de programação padrão do Copilot CLI (ou continue no autopilot se quiser que o Copilot prossiga até você interrompê-lo).
2. Se for útil, mencione o arquivo da página para dar mais contexto: `@src/pages/index.astro`.
3. Insira este prompt:
<!-- track:cli:end -->

   > Adicione JavaScript do lado do cliente à página de batalha para que:
   > 1. Ao clicar no botão Battle, obtenha os dois nomes de usuário dos campos.
   > 2. Valide se ambos foram preenchidos e mostre um erro caso contrário.
   > 3. Busque os dados de contribuição dos dois usuários em paralelo pela nossa API.
   > 4. Renderize os gráficos de contribuição como grades coloridas — cada dia deve ser um quadrado colorido usando a paleta do GitHub.
   > 5. Mostre um selo VS entre os dois usuários.
   > 6. Exiba o nome de usuário, o total de contribuições e o intervalo de datas de cada pessoa.
   > 7. Trate os estados de carregamento e os erros.
   > 8. Acione a ação também quando a tecla Enter for pressionada nos campos.
   > 9. Use uma interface simples, que já está montada.
   >
   > Use interfaces TypeScript para a estrutura dos dados de contribuição.

<!-- track:vscode:start -->
3. Deixe o Agent Mode implementar as alterações em `index.astro`.
4. Revise as alterações propostas na visualização de diff antes de aceitá-las.
<!-- track:vscode:end -->

<!-- track:cli:start -->
4. Deixe o Copilot CLI implementar as alterações em `src/pages/index.astro`.
5. Inspecione as alterações geradas com `/diff` e aprove-as.
<!-- track:cli:end -->

## Tarefa 2: Teste a batalha

> **⚠️ Não está vendo as alterações?** Se a página de batalha não tiver sido atualizada, pare o servidor de desenvolvimento (`Ctrl+C`), reinicie-o com `npm run dev` e atualize o navegador.

1. Digite `octocat` e `torvalds` como os nomes de usuário e clique em **Battle**.
2. Você deverá ver os dois gráficos de contribuição lado a lado, com grades coloridas.
3. Teste os casos de erro:
   - Deixe um ou ambos os campos vazios e clique em Battle — deverá aparecer um erro de validação.
   - Digite um nome de usuário inválido — o app deverá exibir um erro da API.
4. Pressione **Enter** em qualquer campo — a batalha deverá começar como quando você clica no botão.

## Tarefa 3: Itere com o Copilot

Se algo não estiver como deveria, envie comentários de acompanhamento ao Copilot. Por exemplo:

- *“Os quadrados de contribuição estão grandes demais; deixe-os com 12x12 px.”*
- *“Adicione uma dica ao passar o cursor que mostre a data e a quantidade de contribuições.”*
- *“O estado de carregamento precisa de uma animação pulsante.”*

<!-- track:vscode:start -->
O Agent Mode lida naturalmente com alterações em vários arquivos e iterações. Cada prompt de acompanhamento usa a conversa anterior como contexto, permitindo refinar a implementação aos poucos sem começar do zero.
<!-- track:vscode:end -->

<!-- track:cli:start -->
As sessões do Copilot CLI mantêm o histórico, então cada prompt de acompanhamento se baseia no anterior. Use `/session` ou `/context` para inspecionar o contexto preservado e `/review` depois de uma iteração maior para verificar possíveis erros ou melhorias.
<!-- track:cli:end -->

## Dicas para esta parte

- **Especifique o que você quer** — requisitos claros levam a resultados melhores.
- **Divida tarefas grandes em prompts menores** se o Copilot sair do rumo.
- **Revise as alterações antes de aceitá-las** — é mais rápido inspecionar o código gerado do que reescrevê-lo depois.
- **Teste o app após cada etapa de implementação** para detectar os problemas enquanto ainda estão localizados.

## ✅ Parte 3 concluída

Você aprendeu a:

- Usar o Copilot para implementar alterações **em vários arquivos**.
- **Iterar nos resultados** com comentários específicos.
- Concluir o **ciclo completo de um recurso** — implementação, revisão, testes e refinamento.
