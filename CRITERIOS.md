# Critérios do diagnóstico Elora — versão 1.0

Implementação da especificação recebida em 26/10/2026. A vitrine mantém um diagnóstico exploratório de nove perguntas; o formulário de objetivos da Elora tem 12 perguntas e abre antes da primeira visita ao plano.

## Seis trilhas na plataforma

Cinco trilhas recebem pontos: Posicionamento, Comunicação e conteúdo, Diferencial e experiência, Comercial e vendas, Estrutura e expansão. Gestão e indicadores acompanha a jornada como apoio fixo, sem pontos. Esta conciliação reúne as trilhas dos dois documentos sem inventar uma sexta regra de pontuação.

## Pontuação

- Cada objetivo selecionado na primeira pergunta soma +2 à trilha associada.
- Dificuldades atuais e perguntas específicas de posicionamento, comunicação e vendas somam +2 a cada trilha associada. Uma resposta pode pontuar duas trilhas.
- Competências desenvolvidas somam zero, sem subtrair pontos.
- Resultado desejado, segmento, faturamento, tempo de negócio, aquisição de clientes, recursos e horas disponíveis não alteram a classificação.
- Todas as seleções válidas somam, sem duplicações.

A trilha principal é a maior pontuação. Até duas outras trilhas com pontuação positiva são complementares. O desempate prioriza o subtotal de dificuldades atuais; persistindo empate, usa Posicionamento, Comunicação e conteúdo, Diferencial e experiência, Comercial e vendas, Estrutura e expansão. Desempate e máximo de complementares seguem a proposta configurável do Word, ainda para validação da Bruna.

## Agenda e carga

São seis ciclos de 30 dias, cada um com quatro semanas de aplicação (dias 1–28). Dias 29–30 ficam para revisão e ajustes do ciclo. Há 24 semanas com três modelos de atividade cada. Os temas seguem planos predefinidos das trilhas; os enunciados oficiais serão fornecidos pela Bruna.

Carga demonstrativa configurável: menos de 2 horas/semana gera um essencial e dois opcionais; de 2 a 4 horas gera dois essenciais e um opcional; a partir de 5 horas gera três essenciais. O tempo sugerido por atividade varia entre 10 e 50 minutos. Estes quantitativos são uma proposta editorial, não uma regra confirmada da metodologia.

O progresso considera somente exercícios essenciais: 24, 48 ou 72 atividades, conforme a capacidade informada. Revisão semanal, aulas, notas, questionário e dois modelos adicionais de apoio não alteram esse percentual. Aplicação prática pode ser concluída sem texto; resposta escrita exige preenchimento. Rascunhos e conclusões ficam associados à versão, trilhas selecionadas, semana e atividade.

## Dados e limites

Documentos e fotos ficam no IndexedDB; respostas, notas e interações no localStorage. Registros antigos são preservados. Login, primeiro acesso, recuperação, compra, cadastro de interesse e comunidade são demonstrativos. Nenhuma senha é armazenada, nenhum pagamento ou envio de contato ocorre. Não existe autenticação real ou acesso entre participantes.

Verificação: `node tests/plan.test.mjs` cobre todos os mapeamentos de pontos, múltipla seleção, neutralidade do contexto, desempate, complementares, semanas, capacidade e isolamento de registros.
