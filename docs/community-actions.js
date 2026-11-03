'use strict';
(()=>{
 const own=item=>item?.author==='Você';
 function ensureIds(){const records=read('community-comments',{});let changed=false;for(const list of Object.values(records)){for(const item of list){if(own(item)&&!item.id){item.id=crypto.randomUUID();changed=true}}}if(changed)save('community-comments',records)}
 function deletedItems(){return [...read('community-posts',[]).filter(p=>own(p)&&p.deleted).map(p=>({kind:'post',id:p.id,text:p.text})),...Object.entries(read('community-comments',{})).flatMap(([postId,list])=>list.filter(c=>own(c)&&c.deleted).map(c=>({kind:'comment',id:c.id,postId,text:c.text})))];}
 function change(kind,id,postId,deleted){const key=kind==='post'?'community-posts':'community-comments',records=read(key,kind==='post'?[]:{}),list=kind==='post'?records:records[postId]||[],item=list.find(x=>x.id===id);if(!own(item))return false;item.deleted=deleted;return save(key,records)}
 function remove(kind,id,postId){return change(kind,id,postId,true)}
 function restore(kind,id,postId){return change(kind,id,postId,false)}
 function feedback(kind,id,postId){toast(kind==='post'?'Publicação excluída.':'Comentário excluído.');const button=document.createElement('button');button.className='community-undo';button.textContent='Desfazer';button.onclick=()=>{if(restore(kind,id,postId)){renderPortal('community');toast('Item restaurado.')}};$('.toast').append(button)}
 function openTrash(){const items=deletedItems();modal(`<span class="eyebrow">SOMENTE NESTE NAVEGADOR</span><h2 class="modal-title">Itens excluídos</h2><p>Você pode restaurar suas publicações e comentários.</p><div class="community-trash-list">${items.map((item,i)=>`<article><span class="eyebrow">${item.kind==='post'?'PUBLICAÇÃO':'COMENTÁRIO'}</span><p>${escapeHTML(item.text)}</p><button class="text-link" data-restore-community="${i}">Restaurar ↗</button></article>`).join('')||'<p>Nenhum item excluído.</p>'}</div>`);$$('[data-restore-community]').forEach(b=>b.onclick=()=>{const item=items[Number(b.dataset.restoreCommunity)];if(restore(item.kind,item.id,item.postId)){$('#modal').close();renderPortal('community');toast('Item restaurado.')}})}
 function bind(){
  $$('[data-delete-post]').forEach(b=>b.onclick=()=>{const id=b.dataset.deletePost;if(remove('post',id)){renderPortal('community');feedback('post',id)}});
  $$('[data-delete-comment]').forEach(b=>b.onclick=()=>{const id=b.dataset.deleteComment,postId=b.dataset.commentPost;if(remove('comment',id,postId)){renderPortal('community');feedback('comment',id,postId)}});
  const items=deletedItems();if(items.length){const button=document.createElement('button');button.className='community-trash-button';button.textContent=`Itens excluídos (${items.length})`;button.onclick=openTrash;$('.community-filters').after(button)}
 }
 window.EloraCommunity={ensureIds,deletedItems,remove,restore,bind};
})();
