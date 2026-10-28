'use strict';
(()=>{
 const E=window.ELORA;
 E.version='essencial-1';
 E.mainKeys=['posicionamento','conteudo','diferencial','vendas'];
 E.supportKeys=['gestao','expansao'];
 E.scoreKeys=['posicionamento','conteudo','diferencial','vendas','expansao'];
 E.focusNames={posicionamento:'Posicionamento',conteudo:'Comunicação e conteúdo',diferencial:'Diferencial e experiência',vendas:'Comercial e vendas',expansao:'Estrutura e expansão',gestao:'Gestão e indicadores'};
 E.rules={maxComplements:3,tieBreak:'A ordem das quatro trilhas essenciais considera pontos de dificuldades atuais e, depois, Posicionamento, Comunicação e conteúdo, Diferencial e experiência, Comercial e vendas.',status:'Percurso essencial recebido em 28/10/2026: todas as quatro trilhas participam; o diagnóstico define a ordem de apresentação, sem avaliar automaticamente as respostas dos exercícios. O desempate continua configurável.'};
 E.questions[11].o[0]='Uma oferta definida';
 const validMulti=(a,i)=>[...new Set(Array.isArray(a[i])?a[i]:[])].filter(n=>Number.isInteger(n)&&n>=0&&n<E.questions[i].o.length);
 const validSingle=(a,i)=>Number.isInteger(a[i])&&a[i]>=0&&a[i]<E.questions[i].o.length;
 E.isComplete=a=>E.questions.every((q,i)=>q.multi?validMulti(a,i).length>0:validSingle(a,i));
 E.capacity=a=>{const index=validSingle(a,10)?a[10]:2;return{core:4,minutes:15,label:E.questions[10].o[index],description:'4 exercícios essenciais por semana, um de cada trilha, com tempo estimado de 10–15 minutos por atividade.',note:'Adapte a execução à sua disponibilidade. As 96 atividades continuam no percurso; o tempo informado não retira trilhas nem exercícios.'}};
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
  const mainOrder=ordered.filter(([key])=>E.mainKeys.includes(key)),priority=mainOrder.find(([,points])=>points>0)?.[0]||null,selected=mainOrder.map(([key])=>key),complements=selected.filter(key=>key!==priority),capacity=E.capacity(a);
  return{weights,difficultyWeights,goalWeights,reasons,ordered,mainOrder,priority,complements,selected,secondary:complements[0]||null,capacity,rhythm:capacity.description,tieRule:E.rules.tieBreak};
 };
 const curriculum=window.ELORA_CURRICULUM;
 const cycleTitles=['Fundamentos e direção','Público e contexto','Promessa, valor e processos','Aplicação e experiência','Consistência e relacionamento','Consolidação e próximos passos'];
 E.phases=Object.fromEntries(E.mainKeys.map(key=>[key,curriculum.cycles.map((c,i)=>{const ex=curriculum.exercises.find(x=>x.track===key&&x.week===i*4+1);return[ex.title,ex.objective]})]));
 E.phases.gestao=[['Indicadores e decisões','Acompanhar a execução e revisar as prioridades em cada ciclo.']];
 E.phases.expansao=[['Processos e crescimento','Reconhecer a capacidade atual e organizar processos para evoluir.']];
 E.buildMonths=a=>curriculum.cycles.map((c,i)=>({id:E.version+'-c'+i,title:cycleTitles[i],short:cycleTitles[i],objective:c.description,focus:c.description,focusKey:E.evaluate(a).priority||E.mainKeys[0],cycle:i,start:i*30+1,end:(i+1)*30,tasks:['Observar meu ponto de partida','Aplicar no negócio','Revisar as escolhas','Registrar aprendizados'],prompt:c.description,exercise:cycleTitles[i]}));
 E.buildWeeks=a=>{
  if(!E.isComplete(a))return[];const ev=E.evaluate(a),months=E.buildMonths(a);
  return Array.from({length:24},(_,index)=>{const cycle=Math.floor(index/4),within=index%4,m=months[cycle];return{index,cycle,within,title:`Semana ${index+1}`,phase:curriculum.weeks[index].focus,cycleTitle:m.title,objective:m.objective,start:cycle*30+within*7+1,end:cycle*30+within*7+7,exercises:curriculum.exercises.filter(ex=>ex.week===index+1).sort((a,b)=>ev.selected.indexOf(a.track)-ev.selected.indexOf(b.track)).map(ex=>({...ex,kind:ex.format==='Prático'?'pratica':ex.format==='Híbrido'?'hibrida':'escrita',required:true,minutes:15,prompt:ex.objective,provisional:false,source:'Percurso essencial da Elora'}))}});
 };
 E.supportExercises=()=>Array.from({length:6},(_,cycle)=>E.supportKeys.map(track=>({id:`${E.version}-support-c${cycle+1}-${track}`,track,cycle,title:(track==='gestao'?'Leitura dos indicadores':'Processos e capacidade de crescimento')+' · Ciclo '+(cycle+1),kind:'escrita',format:'Modelo de apoio',duration:'No seu ritmo',required:false,provisional:true,objective:track==='gestao'?'Consulte os materiais de Gestão e indicadores para revisar os registros e as decisões deste ciclo.':'Consulte os materiais de Estrutura e expansão para observar os processos e a capacidade atual do negócio.',prompt:'O enunciado específico desta atividade de apoio ainda será fornecido pela Bruna. Use este espaço para registrar sua consulta aos materiais e uma decisão para o ciclo.',task:'Anote um aprendizado e um próximo passo a partir das ferramentas de apoio.',expected:'Registro do ciclo preservado, fora dos 96 exercícios essenciais.',note:'Modelo provisório de apoio. Não integra o percentual do percurso essencial.'}))).flat();
 E.summarize=a=>{const selected=i=>(E.questions[i].multi?validMulti(a,i):validSingle(a,i)?[a[i]]:[]).map(n=>E.questions[i].o[n]),evaluation=E.evaluate(a);return{completed:E.isComplete(a),goals:selected(0),results:selected(1),time:selected(10)[0]||'A definir',difficulties:selected(6),context:{stage:selected(2)[0]||'A definir',business:selected(3)[0]||'A definir',revenue:selected(4)[0]||'A definir',acquisition:selected(5)[0]||'A definir',resources:selected(11)},evaluation,recommendations:evaluation.selected.map(key=>({title:E.focusNames[key],text:evaluation.reasons[key].map(r=>r.text).join(' · ')}))}};
})();
