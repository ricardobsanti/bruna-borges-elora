'use strict';
(()=>{
 const script=document.currentScript;
 const base=new URL('./',script.src).pathname;
 const portal=document.querySelector('.portal-layout');
 const style=document.createElement('link');style.rel='stylesheet';style.href=base+'login.css';document.head.append(style);
 const gate=document.createElement('div');gate.id='access-gate';document.body.prepend(gate);
 let mode='login';
 const session=()=>{try{return sessionStorage.getItem('elora-demo-session')==='active'}catch{return false}};
 const setSession=value=>{try{value?sessionStorage.setItem('elora-demo-session','active'):sessionStorage.removeItem('elora-demo-session')}catch{}};
 const showPortal=()=>{gate.hidden=true;portal.hidden=false;document.body.classList.remove('login-body');scrollTo(0,0)};
 function showGate(next='login'){
  mode=next;gate.hidden=false;portal.hidden=true;document.body.classList.add('login-body');
  gate.innerHTML=`<main class="login-layout"><section class="login-art"><a class="login-back" href="${base}">← Voltar para Bruna Borges</a><div class="login-art-inner"><span class="eyebrow">UM NOVO CAPÍTULO, TODOS OS DIAS.</span><h1>O próximo passo<br>é <em>seu.</em></h1><p>Seu espaço para aprender, aplicar e construir um negócio com a sua assinatura.</p></div><div class="login-orbit" aria-hidden="true">∞</div><span class="login-art-footer">ELORA POR BRUNA BORGES</span></section><section class="login-form-side"><img src="${base}assets/elora.svg" alt="Elora" class="login-logo"><span class="eyebrow">ÁREA EXCLUSIVA PARA ALUNAS</span><div id="access-content"></div><small class="login-disclaimer">PROTÓTIPO NAVEGÁVEL · Sem autenticação real. Não use sua senha pessoal. Aulas e dados desta versão são demonstrativos.</small></section></main>`;
  const content=document.getElementById('access-content');
  if(mode==='login'){
   content.innerHTML=`<h2>Bom ter você<br><em>de volta.</em></h2><p class="login-intro">Entre para continuar a sua jornada.</p><form id="demo-login"><label class="form-field">Seu e-mail<input type="email" name="email" required autocomplete="off" value="visitante@elora.demo"></label><label class="form-field">Sua senha<div class="password-wrap"><input type="password" id="demo-password" name="password" required autocomplete="off" value="elora"><button type="button" id="show-password" aria-label="Mostrar senha">Mostrar</button></div></label><button class="login-forgot" type="button" id="forgot">Esqueci minha senha</button><p class="login-error" id="login-error" role="alert"></p><button class="button dark login-submit" type="submit">Entrar na Elora <span>↗</span></button></form><div class="demo-credentials"><span class="eyebrow">ACESSO PARA APRESENTAÇÃO</span><p>E-mail: <strong>visitante@elora.demo</strong><br>Senha: <strong>elora</strong></p></div><button class="text-link" id="request-access">Ainda não tem acesso? Conheça os caminhos <span>↗</span></button>`;
   document.getElementById('demo-login').onsubmit=e=>{e.preventDefault();const form=new FormData(e.target);if(form.get('email').trim().toLowerCase()!=='visitante@elora.demo'||form.get('password')!=='elora'){document.getElementById('login-error').textContent='Para explorar o protótipo, use o e-mail e a senha demonstrativos abaixo.';return}setSession(true);showPortal()};
   document.getElementById('show-password').onclick=e=>{const input=document.getElementById('demo-password');input.type=input.type==='password'?'text':'password';e.target.textContent=input.type==='password'?'Mostrar':'Ocultar';e.target.setAttribute('aria-label',input.type==='password'?'Mostrar senha':'Ocultar senha')};
   document.getElementById('forgot').onclick=()=>showGate('reset');document.getElementById('request-access').onclick=()=>showGate('access');
  }
  if(mode==='reset'){
   content.innerHTML=`<h2>Vamos retomar<br><em>sua jornada.</em></h2><p class="login-intro">Informe seu e-mail para visualizar a recuperação de acesso.</p><form id="reset-form"><label class="form-field">E-mail de cadastro<input type="email" required name="email" value="visitante@elora.demo" autocomplete="off"></label><button class="button dark login-submit" type="submit">Recuperar meu acesso <span>→</span></button></form><button class="text-link" id="back-login">← Voltar ao login</button>`;
   document.getElementById('reset-form').onsubmit=e=>{e.preventDefault();content.innerHTML=`<span class="login-check">✓</span><h2>Seu próximo passo<br>está <em>mais perto.</em></h2><p class="login-intro">Na versão definitiva, você receberá um link para redefinir sua senha.</p><div class="demo-credentials"><p>Esta tela é uma simulação. Nenhum e-mail foi enviado. Para explorar agora, use visitante@elora.demo e a senha elora.</p></div><button class="button dark login-submit" id="back-login">Voltar para entrar <span>→</span></button>`;document.getElementById('back-login').onclick=()=>showGate()};document.getElementById('back-login').onclick=()=>showGate();
  }
  if(mode==='access'){
   content.innerHTML=`<h2>Seu lugar de<br><em>evolução.</em></h2><p class="login-intro">A Elora conecta aprendizado e prática. Conheça os caminhos com a Bruna e descubra o que combina com seu momento.</p><div class="login-access-paths"><a href="${base}diagnostico/"><span>01 · COMECE POR VOCÊ</span><h3>Diagnóstico de negócios ↗</h3></a><a href="${base}#caminhos"><span>02 · ESCOLHA SEU CAMINHO</span><h3>Formação e mentoria ↗</h3></a></div><button class="button dark login-submit" id="try-demo">Explorar a demonstração <span>↗</span></button><button class="text-link" id="back-login">Já sou aluna · entrar →</button>`;document.getElementById('try-demo').onclick=()=>showGate();document.getElementById('back-login').onclick=()=>showGate();
  }
  scrollTo(0,0);
 }
 const logout=document.createElement('button');logout.className='logout-button';logout.textContent='Sair ↗';logout.onclick=()=>{setSession(false);showGate()};document.querySelector('.profile').append(logout);
 if(session())showPortal();else showGate();
})();
