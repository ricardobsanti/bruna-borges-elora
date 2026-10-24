const fs=require('node:fs');
const path=require('node:path');
// Only needed to regenerate the checked-in JPEGs: install sharp or set ELORA_SHARP_MODULE.
const sharp=require(process.env.ELORA_SHARP_MODULE||'sharp');
const root=path.resolve(__dirname,'../docs');
const base='https://ricardobsanti.github.io/bruna-borges-elora/';
const cards={
 bruna:`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="g"><stop stop-color="#8d6735"/><stop offset=".5" stop-color="#e7cd91"/><stop offset="1" stop-color="#a3824b"/></linearGradient></defs><rect width="1200" height="630" fill="#f7f4ee"/><rect x="32" y="32" width="1136" height="566" fill="none" stroke="#d7c9b1"/><path d="M815 35C1150 10 800 520 1110 610M740 630C600 460 1150 100 1190 430" fill="none" stroke="url(#g)" stroke-width="38" opacity=".45"/><text x="80" y="100" font-family="Georgia" font-size="28" fill="#302923" letter-spacing="2">BRUNA BORGES</text><path d="M77 115C170 80 235 150 350 95" stroke="url(#g)" stroke-width="2" fill="none"/><text x="80" y="248" font-family="Georgia" font-size="75" fill="#302923">Seu negócio.</text><text x="80" y="336" font-family="Georgia" font-size="75" fill="#302923">Sua essência.</text><text x="80" y="424" font-family="Georgia" font-size="75" fill="#9e513b" font-style="italic">Sua referência.</text><text x="82" y="537" font-family="Arial" font-size="16" fill="#797167" letter-spacing="2">ESTRATÉGIA · POSICIONAMENTO · MENTORIA</text></svg>`,
 elora:`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><defs><linearGradient id="g"><stop stop-color="#8d6735"/><stop offset=".5" stop-color="#ead49d"/><stop offset="1" stop-color="#a3824b"/></linearGradient></defs><rect width="1200" height="630" fill="#393329"/><rect x="32" y="32" width="1136" height="566" fill="none" stroke="#b69c6244"/><path d="M760 10C1190 -30 830 550 1140 650M700 630C590 420 1140 95 1220 400" fill="none" stroke="url(#g)" stroke-width="35" opacity=".22"/><text x="80" y="108" font-family="Arial" font-size="15" fill="#cbb48d" letter-spacing="3">POR BRUNA BORGES</text><text x="73" y="282" font-family="Georgia" font-size="156" fill="#f5edde" letter-spacing="-6">ELORA</text><path d="M65 232C235 165 400 335 670 214" stroke="url(#g)" stroke-width="3" fill="none"/><text x="80" y="393" font-family="Georgia" font-size="53" fill="#f5edde">Seu espaço de evolução.</text><text x="82" y="454" font-family="Arial" font-size="22" fill="#c9bda7">Aprendizado, estratégia e mentoria.</text><text x="82" y="541" font-family="Arial" font-size="14" fill="#cbb48d" letter-spacing="2">UM NOVO CAPÍTULO PARA O SEU NEGÓCIO.</text></svg>`
};
(async()=>{
 for(const [name,svg] of Object.entries(cards)){
  fs.writeFileSync(path.join(root,'assets',`compartilhar-${name}.svg`),svg);
  await sharp(Buffer.from(svg)).jpeg({quality:90,mozjpeg:true}).toFile(path.join(root,'assets',`compartilhar-${name}-v1.jpg`));
 }
 const pages=[
  {file:'index.html',url:base,title:'Bruna Borges — Seu negócio. Sua essência. Sua referência.',description:'Estratégia, posicionamento e mentoria para construir um negócio com a sua assinatura.',image:'bruna',alt:'Bruna Borges. Seu negócio. Sua essência. Sua referência.'},
  {file:'portal/index.html',url:base+'portal/',title:'Elora — Seu espaço de evolução',description:'Conheça a Elora por Bruna Borges: aprendizado, plano de seis meses, ferramentas e mentoria para o seu negócio.',image:'elora',alt:'Elora por Bruna Borges. Seu espaço de evolução.'},
  {file:'diagnostico/index.html',url:base+'diagnostico/',title:'Diagnóstico de negócios — Bruna Borges',description:'Descubra seu ponto de partida e os próximos passos para o seu negócio.',image:'bruna',alt:'Bruna Borges. Diagnóstico e próximos passos para o seu negócio.'}
 ];
 const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;');
 for(const p of pages){
  const file=path.join(root,p.file),image=base+`assets/compartilhar-${p.image}-v1.jpg`;
  let html=fs.readFileSync(file,'utf8').replace(/\s*<!-- social-preview:start -->[\s\S]*?<!-- social-preview:end -->/g,'');
  const metadata={'og:type':'website','og:locale':'pt_BR','og:site_name':'Bruna Borges · Elora','og:title':p.title,'og:description':p.description,'og:url':p.url,'og:image':image,'og:image:secure_url':image,'og:image:type':'image/jpeg','og:image:width':'1200','og:image:height':'630','og:image:alt':p.alt};
  const tags='\n<!-- social-preview:start -->\n<link rel="canonical" href="'+p.url+'">\n'+Object.entries(metadata).map(([key,value])=>`<meta property="${key}" content="${esc(value)}">`).join('\n')+'\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="'+esc(p.title)+'">\n<meta name="twitter:description" content="'+esc(p.description)+'">\n<meta name="twitter:image" content="'+image+'">\n<meta name="twitter:image:alt" content="'+esc(p.alt)+'">\n<!-- social-preview:end -->\n';
  fs.writeFileSync(file,html.replace('</head>',tags+'</head>'));
 }
 console.log('Created 1200×630 JPEG sharing covers and static metadata for all three pages.');
})().catch(e=>{console.error(e.message);process.exitCode=1});
