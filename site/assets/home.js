
var CATALOG=[];
fetch('/assets/catalog.json').then(function(r){return r.json()}).then(function(j){CATALOG=j;render();});
var state={q:'',cat:'all',sort:'new',page:1};var PER=12;
function filtered(){
  var q=state.q.trim().toLowerCase();
  var list=CATALOG.filter(function(p){
    if(state.cat!=='all'&&p.category!==state.cat)return false;
    if(q&&!(p.title.toLowerCase().includes(q)||String(p.id)===q))return false;
    return true;
  });
  if(state.sort==='new')list.sort(function(a,b){return b.id-a.id});
  else if(state.sort==='old')list.sort(function(a,b){return a.id-b.id});
  else if(state.sort==='az')list.sort(function(a,b){return a.title.localeCompare(b.title)});
  return list;
}
function cardHTML(p){
  var img=p.thumb?'<img src="'+p.thumb+'" alt="" loading="lazy">':'<div class="cover-fallback">'+p.title.slice(0,60)+'</div>';
  return '<article class="card"><div class="thumb">'+img+
    '<span class="tag-id">ID '+p.id+'</span><span class="tag-free">Free</span></div>'+
    '<div class="body"><div class="cat">'+p.category+'</div><h3>'+p.title+'</h3>'+
    '<div class="row"><button class="btn-sm">Save</button></div>'+
    '<div class="foot"><span class="words">'+(p.words?p.words.toLocaleString()+' words':'—')+'</span>'+
    '<span class="actions"><a class="btn-sm" href="/prompt/'+p.id+'">Preview</a>'+
    '<a class="btn-sm btn-gold" style="border:none" href="/prompt/'+p.id+'">View prompt</a></span>'+
    '</div></div></article>';
}
function render(){
  var list=filtered();var pages=Math.max(1,Math.ceil(list.length/PER));
  if(state.page>pages)state.page=pages;
  var slice=list.slice((state.page-1)*PER,state.page*PER);
  document.getElementById('grid').innerHTML=slice.map(cardHTML).join('')||'<p style="color:var(--gray)">No prompts found.</p>';
  document.getElementById('count').innerHTML='<b>'+list.length+'</b> prompts';
  document.getElementById('showing').textContent='Showing '+((state.page-1)*PER+1)+'–'+Math.min(state.page*PER,list.length)+' of '+list.length;
  var pg=document.getElementById('pager');var h='';
  function btn(p,label,on){h+='<a href="#" data-p="'+p+'" class="'+(on?'on':'')+'">'+label+'</a>';}
  btn(1,'1',state.page===1);
  if(state.page>3)h+='<span>...</span>';
  for(var p=Math.max(2,state.page-1);p<=Math.min(pages-1,state.page+1);p++)btn(p,String(p),p===state.page);
  if(state.page<pages-2)h+='<span>...</span>';
  if(pages>1)btn(pages,String(pages),state.page===pages);
  if(state.page<pages)btn(state.page+1,'Next',false);
  pg.innerHTML=h;
  pg.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();state.page=+a.dataset.p;render();document.getElementById('grid').scrollIntoView({behavior:'smooth',block:'start'});});});
}
window.addEventListener('DOMContentLoaded',function(){
  var s=document.getElementById('q');
  document.getElementById('searchBtn').addEventListener('click',function(){state.q=s.value;state.page=1;render();});
  s.addEventListener('keydown',function(e){if(e.key==='Enter'){state.q=s.value;state.page=1;render();}});
  document.getElementById('catSel').addEventListener('change',function(e){state.cat=e.target.value;state.page=1;render();});
  document.getElementById('sortSel').addEventListener('change',function(e){state.sort=e.target.value;state.page=1;render();});
  document.getElementById('surpriseBtn').addEventListener('click',function(){if(!CATALOG.length)return;var p=CATALOG[Math.floor(Math.random()*CATALOG.length)];location.href='/prompt/'+p.id;});
  document.getElementById('findBtn').addEventListener('click',function(){
    var fc=document.getElementById('fcat');
    state.cat=fc.value;document.getElementById('catSel').value=fc.value;state.page=1;render();
    document.getElementById('grid').scrollIntoView({behavior:'smooth'});
  });
});
