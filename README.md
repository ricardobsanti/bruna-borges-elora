# Bruna Borges + Elora

Proposta navegável para apresentação à cliente. HTML, CSS e JavaScript, sem etapa de build.

## Jornada Elora — atualização de 28/10/2026

Cinco áreas de navegação: Visão geral, Meu diagnóstico e plano, Meu espaço de trabalho, Aulas e ferramentas e Comunidade. O formulário inicial tem 12 perguntas. O novo percurso essencial tem 96 exercícios em quatro trilhas: Posicionamento, Comunicação e conteúdo, Diferencial e experiência, Comercial e vendas. O diagnóstico define sua ordem, sem retirar exercícios. Gestão e indicadores e Estrutura e expansão são apoios por ciclo. Consulte [os critérios](CRITERIOS.md).

São 24 semanas em seis ciclos de 30 dias, com quatro essenciais por semana e revisões nos dias 29–30. Reflexões, aplicações práticas e híbridas seguem o DOCX da Bruna. Doze apoios ficam fora do progresso; os enunciados desses apoios ainda são modelos provisórios. Respostas anteriores são preservadas e a nova ordem do diagnóstico não muda os IDs dos exercícios oficiais.

A biblioteca reúne os 13 PDFs fornecidos, com busca, filtros, favoritos, download e consulta das páginas. Os PDFs originais permanecem intactos. Documentos, insights e notas continuam separados por semana; fotos e comunidade são locais. Gravações oficiais das aulas ainda serão fornecidas pela Bruna.

As apresentações da mentoria e da Elora mantêm cadastro de interesse e compra/primeiro acesso demonstrativos. Sem cobrança, envio de contato ou autenticação real; não use senha pessoal.

## Abrir localmente

Execute `node preview.mjs` e abra `http://127.0.0.1:4175/bruna-borges-elora/`. A variável PORT permite escolher outra porta.

- `/`: vitrine Bruna Borges.
- `/diagnostico/`: diagnóstico exploratório, três atividades e relatório PDF.
- `/mentoria/`: apresentação e cadastro de interesse demonstrativo.
- `/elora/`: apresentação da plataforma e compra demonstrativa.
- `/portal/`: login e jornada da aluna.

Login: `visitante@elora.demo` / `elora`. Dados locais no navegador (localStorage/IndexedDB); login em sessionStorage. Não existe servidor de alunas, pagamento, mensagens ou agenda real.

Verificação automatizada: `node tests/plan.test.mjs`. Verificação manual no navegador cobre formulário, plano, semana, notas e navegação comercial. Antes da operação comercial, integrar autenticação, autorização, armazenamento seguro, pagamentos, atendimento e conteúdo aprovado.

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
