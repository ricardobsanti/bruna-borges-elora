'use strict';
(()=>{
 const E=window.ELORA;
 E.version='diagnostico-1.0';
 E.scoreKeys=['posicionamento','conteudo','diferencial','vendas','expansao'];
 E.focusNames={posicionamento:'Posicionamento',conteudo:'Comunicação e conteúdo',diferencial:'Diferencial e experiência',vendas:'Comercial e vendas',expansao:'Estrutura e expansão',gestao:'Gestão e indicadores'};
 E.rules={maxComplements:2,tieBreak:'Pontos de dificuldades atuais; depois, ordem fixa: Posicionamento, Comunicação e conteúdo, Diferencial e experiência, Comercial e vendas, Estrutura e expansão.',status:'Desempate e limite de complementares: proposta do documento, configurável para validação da Bruna.'};
 E.questions[11].o[0]='Uma oferta definida';
 const validMulti=(a,i)=>[...new Set(Array.isArray(a[i])?a[i]:[])].filter(n=>Number.isInteger(n)&&n>=0&&n<E.questions[i].o.length);
 const validSingle=(a,i)=>Number.isInteger(a[i])&&a[i]>=0&&a[i]<E.questions[i].o.length;
 E.isComplete=a=>E.questions.every((q,i)=>q.multi?validMulti(a,i).length>0:validSingle(a,i));
 E.capacity=a=>{
  const index=validSingle(a,10)?a[10]:2;
  const core=[1,2,3,3,3][index],minutes=[10,20,30,40,50][index];
  return{core,minutes,label:E.questions[10].o[index],description:core===1?'1 exercício essencial por semana; outros 2 ficam como opcionais.':core===2?'2 exercícios essenciais por semana; o terceiro fica como opcional.':'3 exercícios essenciais por semana, com complexidade progressiva.',note:'Carga sugerida para a demonstração. O tempo e a complexidade finais serão definidos pela metodologia da Bruna.'};
 };
 E.evaluate=a=>{
  const weights=Object.fromEntries(E.scoreKeys.map(k=>[k,0])),difficultyWeights={...weights},goalWeights={...weights},reasons=Object.fromEntries(E.scoreKeys.map(k=>[k,[]]));
  const add=(q,answer,keys,kind)=>keys.forEach(key=>{weights[key]+=2;(kind==='objetivo'?goalWeights:difficultyWeights)[key]+=2;reasons[key].push({question:q,answer,text:E.questions[q].o[answer],points:2,kind})});
  const goals=[['conteudo'],['posicionamento'],['posicionamento'],['vendas'],['diferencial'],['expansao']];
  validMulti(a,0).forEach(i=>add(0,i,goals[i],'objetivo'));
  const difficulties=[['conteudo'],['vendas'],['posicionamento','diferencial'],['conteudo'],['diferencial','vendas']];
  validMulti(a,6).forEach(i=>add(6,i,difficulties[i],'dificuldade'));
  const mappings={7:[[],['posicionamento','diferencial'],['posicionamento','diferencial'],['posicionamento']],8:[[],['conteudo'],['conteudo'],['conteudo'],['conteudo']],9:[[],['vendas'],['vendas','diferencial'],['vendas'],['vendas']]};
  for(const [question,answers] of Object.entries(mappings)){const q=Number(question);if(validSingle(a,q))add(q,a[q],answers[a[q]],'dificuldade')}
  const ordered=E.scoreKeys.map(k=>[k,weights[k]]).sort((a,b)=>b[1]-a[1]||difficultyWeights[b[0]]-difficultyWeights[a[0]]||E.scoreKeys.indexOf(a[0])-E.scoreKeys.indexOf(b[0]));
  const positive=ordered.filter(([,points])=>points>0),priority=positive[0]?.[0]||null,complements=positive.slice(1,1+E.rules.maxComplements).map(([key])=>key),capacity=E.capacity(a);
  return{weights,difficultyWeights,goalWeights,reasons,ordered,priority,complements,selected:priority?[priority,...complements]:[],secondary:complements[0]||null,capacity,rhythm:capacity.description,tieRule:E.rules.tieBreak};
 };
 E.phases={
  posicionamento:[['O lugar da sua marca','Definir como quer ser reconhecida.'],['Público e escolhas','Reconhecer a cliente prioritária e suas necessidades.'],['Sua proposta de valor','Comunicar o valor e o diferencial da marca.'],['Presença coerente','Alinhar mensagem, perfil e apresentação da oferta.'],['Autoridade em prática','Tornar seus critérios e conhecimento visíveis.'],['Percepção e continuidade','Revisar a percepção construída e os próximos passos.']],
  conteudo:[['Comunicação com direção','Definir o objetivo da comunicação e as dúvidas do público.'],['Mensagem e temas','Escolher pilares conectados ao posicionamento.'],['Repertório de conteúdo','Transformar dúvidas reais em pautas úteis.'],['Rotina de criação','Organizar uma frequência possível de produção.'],['Conteúdo e conversa','Conectar a presença à oferta e ao relacionamento.'],['Sinais e consistência','Revisar os aprendizados e planejar a continuidade.']],
  diferencial:[['O valor da entrega','Reconhecer as particularidades da sua oferta.'],['Escopo e benefícios','Conectar entregas a necessidades relevantes.'],['Uma experiência própria','Mapear os pontos de contato com a cliente.'],['Diferencial em prática','Aplicar uma melhoria concreta na experiência.'],['Feedback e ajustes','Ouvir a cliente e revisar a entrega.'],['Valor que permanece','Consolidar os diferenciais e a continuidade.']],
  vendas:[['Seu processo comercial','Entender como o interesse se transforma em conversa.'],['Oferta com clareza','Organizar como você apresenta sua solução.'],['Conversa de venda','Estruturar perguntas e próximos passos.'],['Rotina de acompanhamento','Organizar contatos e manter a continuidade das conversas.'],['Entrega e relacionamento','Conectar a experiência à confiança e à recompra.'],['Revisão comercial','Observar o processo e planejar o próximo ciclo.']],
  expansao:[['Estrutura do negócio','Mapear processos, recursos e prioridades.'],['Rotina e responsabilidades','Organizar a execução e os papéis necessários.'],['Capacidade de entrega','Entender limites e oportunidades dos processos.'],['Processos consistentes','Documentar e melhorar uma rotina importante.'],['Preparação para crescer','Avaliar recursos e condições para a expansão.'],['Expansão com direção','Definir critérios para o próximo ciclo de crescimento.']],
  gestao:[['Olhar para os indicadores','Escolher um sinal útil para acompanhar.'],['Rotina de gestão','Reservar tempo para analisar e decidir.']]
 };
 E.buildMonths=a=>{const ev=E.evaluate(a),key=ev.priority||'posicionamento';return E.phases[key].map(([title,objective],i)=>({id:E.version+'-'+key+'-'+i,title,short:title,objective,focus:objective,focusKey:key,cycle:i,start:i*30+1,end:(i+1)*30,tasks:['Observar meu ponto de partida','Aplicar uma ação no negócio','Revisar uma escolha','Registrar o que aprendi'],prompt:objective,exercise:title}))};
 E.exerciseModel=(key,cycle,week,slot)=>{
  const phase=(E.phases[key]||E.phases.posicionamento)[cycle%6],kind=week%3===0?'escrita':'pratica',titles=['Observar e escolher','Aplicar no seu negócio','Revisar um ponto de contato','Consolidar a aplicação'];
  const example={posicionamento:'Revise a descrição do seu perfil: público, entrega e diferencial precisam estar claros.',conteudo:'Escolha uma dúvida real de uma cliente e transforme em uma pauta para o seu canal.',diferencial:'Revise uma etapa do atendimento e acrescente uma orientação que evite dúvidas.',vendas:'Prepare três perguntas para entender a necessidade antes de apresentar sua oferta.',expansao:'Documente uma rotina importante: entrada, etapas, responsável e resultado esperado.',gestao:'Escolha um indicador ligado ao objetivo e registre como vai observá-lo semanalmente.'}[key];
  return{title:titles[(week+slot)%4]+' · '+phase[0],kind,prompt:kind==='escrita'?`O que você observa hoje em ${E.focusNames[key].toLowerCase()}? ${phase[1]} Registre uma escolha e explique por que ela merece sua atenção.`:`${phase[1]} Aplique uma mudança pequena no seu negócio e observe o que ela muda na experiência ou na clareza da comunicação.`,example,steps:kind==='pratica'?['Escolha um ponto concreto do negócio para trabalhar.','Aplique a ação descrita e observe o que aconteceu.','Marque a aplicação como concluída; o registro escrito é opcional.']:['Observe a situação atual sem tentar resolver tudo de uma vez.','Escreva sua escolha e o próximo passo possível.','Salve a resposta para revisitar durante a semana.'],provisional:true};
 };
 E.buildWeeks=a=>{
  const ev=E.evaluate(a);if(!E.isComplete(a)||!ev.priority)return[];
  const signature=ev.selected.join('-');
  return Array.from({length:24},(_,index)=>{const cycle=Math.floor(index/4),within=index%4,phase=E.buildMonths(a)[cycle];return{index,cycle,within,title:`Semana ${index+1}`,phase:phase.title,objective:phase.objective,start:cycle*30+within*7+1,end:cycle*30+within*7+7,exercises:Array.from({length:3},(_,slot)=>{const key=ev.selected[slot]||ev.priority;return{id:`${E.version}-${signature}-w${index+1}-s${slot+1}-${key}`,track:key,slot,required:slot<ev.capacity.core,minutes:ev.capacity.minutes,...E.exerciseModel(key,cycle,within,slot)}})}});
 };
 E.supportExercises=()=>[{id:E.version+'-support-gestao',track:'gestao',title:'Um indicador para acompanhar',kind:'pratica',prompt:'Escolha um indicador conectado ao seu objetivo, defina como observá-lo e reserve um momento de revisão semanal.',example:'Se seu objetivo é melhorar a conversa comercial, observe quantos contatos têm um próximo passo combinado.',steps:['Defina uma pergunta que o indicador precisa responder.','Escolha um registro simples e uma frequência de revisão.','Use a observação para decidir um próximo ajuste.']},{id:E.version+'-support-expansao',track:'expansao',title:'Uma rotina pronta para crescer',kind:'escrita',prompt:'Descreva uma rotina que precisa ganhar clareza antes de expandir: o que entra, quais etapas existem, quem participa e o que precisa estar pronto.',example:'Mapeie como uma nova cliente é recebida e quais orientações ela precisa receber.',steps:['Escolha um processo importante.','Descreva etapas, limites e responsabilidades.','Registre uma melhoria possível.']}];
 E.summarize=a=>{const selected=i=>(E.questions[i].multi?validMulti(a,i):validSingle(a,i)?[a[i]]:[]).map(n=>E.questions[i].o[n]),evaluation=E.evaluate(a);return{completed:E.isComplete(a),goals:selected(0),results:selected(1),time:selected(10)[0]||'A definir',difficulties:selected(6),context:{stage:selected(2)[0]||'A definir',business:selected(3)[0]||'A definir',revenue:selected(4)[0]||'A definir',acquisition:selected(5)[0]||'A definir',resources:selected(11)},evaluation,recommendations:evaluation.selected.map(key=>({title:E.focusNames[key],text:evaluation.reasons[key].map(r=>r.text).join(' · ')}))}};
})();
