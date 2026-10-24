# Bruna Borges + Elora

Proposta navegável para apresentação à cliente. HTML, CSS e JavaScript, sem etapa de build.

## Jornada Elora — atualização de 24/10/2026

A Elora agora tem cinco áreas: **Visão geral**, **Meu diagnóstico e plano**, **Meu espaço de trabalho**, **Aulas e ferramentas** e **Comunidade**.

O diagnóstico da vitrine e o questionário de objetivos do portal são formulários diferentes. Dentro da Elora estão as 12 perguntas do documento fornecido pela cliente, em quatro blocos e com as opções de múltipla escolha originais. O plano de seis meses muda conforme o foco sugerido pelas respostas. Consulte [os critérios propostos](CRITERIOS.md).

Cada mês reúne quatro tarefas, três exercícios, documentos locais, insights e anotações. O progresso do plano considera 42 etapas. As aulas mantêm progresso separado. A biblioteca inclui ideias de conteúdo que podem ser salvas e levadas aos insights do mês. A comunidade permite experimentar publicações, comentários, curtidas e categorias; tudo fica apenas neste dispositivo.

Arquivos são guardados no IndexedDB; respostas e notas, no localStorage. O login demonstrativo usa sessionStorage. Não são enviados a um servidor de alunas. As gravações oficiais ainda serão definidas pela Bruna; as aulas em texto continuam identificadas como exemplos.

Verificação dos critérios: `node tests/plan.test.mjs`. Confere roteiros diferentes para vendas e conteúdo, seis meses, respostas obrigatórias, neutralidade do faturamento, capacidade de execução e separação dos registros de cada foco.

## Abrir localmente

Na pasta deste arquivo, execute `node preview.mjs` e abra `http://127.0.0.1:4175/bruna-borges-elora/`.

- `/`: vitrine Bruna Borges.
- `/diagnostico/`: nove perguntas, resultado por eixo, plano inicial e relatório PDF.
- `/portal/`: portal Elora, três trilhas e nove aulas editoriais demonstrativas, exercícios, caderno, biblioteca PDF e preparação para mentoria.

## O que funciona

Navegação, diagnóstico, PDF local, filtros e busca das trilhas, leitura das aulas, conclusão das aulas, progresso, exercícios, anotações, exportação do caderno e rascunho de intenção de mentoria. Os dados ficam no localStorage do navegador, separados pelo prefixo `elora-`. Em Privacidade, na vitrine, é possível apagá-los.

## Escopo da demonstração

Não há autenticação, cadastro, servidor de dados, cobrança, envio de leads ou agendamento real. Formulários identificam o armazenamento local. Conteúdo educacional e critérios de pontuação são exemplos para validação com a cliente. Não foram criados depoimentos, números de resultados ou credenciais profissionais.

Para operação comercial: aprovar textos e diagnóstico, adicionar foto e biografia autorizadas da Bruna, aulas oficiais, preços, políticas, autenticação, banco de dados, armazenamento de mídia, pagamentos, agenda e canal de contato.

## Direção visual

Marfim, café, dourado e argila; títulos serifados, respiro editorial e composição abstrata baseada no gesto dos logotipos. SVGs de interface reinterpretam as referências para leitura em tamanho pequeno; imagens originais preservadas em `docs/assets`. Parallax leve, faixas em movimento, revelação de seções e microinterações, com respeito a `prefers-reduced-motion`.

## Análise do site existente

Fonte observada: https://desafiosejareferencia.netlify.app/ em 23/10/2026.

A página existente apresenta o Desafio Seja Referência, com proposta clara, programação de cinco dias, chamada à inscrição e checkout Hotmart. A linguagem visual já utiliza serifas, tons claros e marrons. Serve à conversão de um produto específico, mas não organiza um ecossistema entre marca pessoal, diagnóstico, formação contínua e mentoria.

A proposta amplia a arquitetura: vitrine -> diagnóstico -> resultado e plano de ação -> Elora ou preparação para mentoria. O desafio permanece acessível pela página original, onde datas, disponibilidade e condições comerciais devem ser confirmadas. O site novo não reproduz preços promocionais sujeitos a disponibilidade.

## Verificação

JavaScript validado com `node --check docs/app.js`. Fluxo de nove perguntas e resultado de 67/100 com respostas intermediárias conferidos no navegador. Aula, salvamento de reflexão e conclusão com progresso de 33% na trilha conferidos. Layout contém regras para desktop e celular; efeitos são reduzidos conforme preferência de acessibilidade.

## Publicação no GitHub Pages

Fonte de publicação: branch main, pasta docs. Atualizações nessa pasta são publicadas automaticamente pelo GitHub Pages. O prefixo /bruna-borges-elora/ está aplicado aos links e recursos para funcionar como site de projeto.

Vitrine: https://ricardobsanti.github.io/bruna-borges-elora/

Portal: https://ricardobsanti.github.io/bruna-borges-elora/portal/

Diagnóstico: https://ricardobsanti.github.io/bruna-borges-elora/diagnostico/

## Login demonstrativo

O portal é acessado pela vitrine, com telas de entrada, recuperação de senha, acesso inicial e saída. E-mail: visitante@elora.demo. Senha: elora. O login é apenas uma simulação autorizada para apresentação. Não protege conteúdo nem autentica alunas. Não use senhas pessoais. A recuperação não envia e-mails. A versão de produção exige autenticação e autorização no servidor.
