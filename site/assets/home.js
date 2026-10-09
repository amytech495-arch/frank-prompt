
var CATALOG=[];
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
(function(){
  var grid = document.getElementById('grid');
  if(grid) grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--gray)">Loading...</div>';
})();
function loadFromFirestore(){
  return firebase.firestore().collection('prompts').get().then(function(snap){
    var arr = [];
    snap.forEach(function(doc){ arr.push(doc.data()); });
    // Sort by id descending (newest first) by default
    arr.sort(function(a,b){ return b.id - a.id; });
    return arr;
  });
}
function showLoginRequired(){
  var grid = document.getElementById('grid');
  var count = document.getElementById('count');
  if(count) count.style.display = 'none';
  // Also hide pagination
  var pag = document.getElementById('pagination');
  if(pag) pag.style.display = 'none';
  if(grid) grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;">'
    + '<div style="font-size:48px;margin-bottom:16px;">🔒</div>'
    + '<h3>Log in to browse prompts</h3>'
    + '<p style="color:var(--gray);margin:12px 0 24px">Create a free account to unlock all 361 prompts.</p>'
    + '<a href="/login" class="btn-gold" style="display:inline-block;padding:12px 32px;text-decoration:none">Log in</a></div>';
  var count = document.getElementById('count');
  if(count) count.textContent = '';
}
// Wait for Firebase auth, then load from Firestore (requires login per security rules)
if(window.firebase && firebase.apps.length){
  firebase.auth().onAuthStateChanged(function(user){
    if(user){
      loadFromFirestore().then(function(arr){ CATALOG = arr; render(); })
        .catch(function(e){ console.error('Firestore load failed:', e); showLoginRequired(); });
    } else {
      showLoginRequired();
    }
  });
} else {
  // Firebase not ready yet, retry shortly
  setTimeout(function(){
    if(window.firebase && firebase.apps.length){
      firebase.auth().onAuthStateChanged(function(user){
        if(user){ loadFromFirestore().then(function(arr){ CATALOG = arr; render(); }); }
        else showLoginRequired();
      });
    } else showLoginRequired();
  }, 1500);
}
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
  var img=p.thumb?'<img src="'+esc(p.thumb)+'" alt="" loading="lazy">':'<div class="cover-fallback">'+esc(p.title.slice(0,60))+'</div>';
  return '<article class="card"><div class="thumb">'+img+
    '<span class="tag-id">ID '+p.id+'</span><span class="tag-free">Free</span></div>'+
    '<div class="body"><div class="cat">'+esc(p.category)+'</div><h3>'+esc(p.title)+'</h3>'+
    '<div class="row"><button class="btn-sm">Save</button></div>'+
    '<div class="foot"><span class="words">'+(p.words?p.words.toLocaleString():'—')+' <span data-i18n="words">words</span></span>'+
    '<span class="actions"><a class="btn-sm" href="/prompt/'+p.id+'">Preview</a>'+
    '<a class="btn-sm btn-gold" style="border:none" href="/prompt/'+p.id+'">View prompt</a></span>'+
    '</div></div></article>';
}
function render(){
  var list=filtered();var pages=Math.max(1,Math.ceil(list.length/PER));
  if(state.page>pages)state.page=pages;
  var slice=list.slice((state.page-1)*PER,state.page*PER);
  document.getElementById('grid').innerHTML=slice.map(cardHTML).join('');applyI18n();applyI18n()||'<p style="color:var(--gray)">No prompts found.</p>';
  document.getElementById('count').innerHTML='<b>'+list.length+'</b> prompts';
  document.getElementById('showing').textContent=(typeof fpT==='function'?fpT('showing'):'Showing')+' '+((state.page-1)*PER+1)+'–'+Math.min(state.page*PER,list.length)+' '+(typeof fpT==='function'?fpT('of'):'of')+' '+list.length;
  var pg=document.getElementById('pager');var h='';
  function btn(p,label,on){h+='<a href="#" data-p="'+p+'" class="'+(on?'on':'')+'">'+label+'</a>';}
  btn(1,'1',state.page===1);
  if(state.page>3)h+='<span>...</span>';
  for(var p=Math.max(2,state.page-1);p<=Math.min(pages-1,state.page+1);p++)btn(p,String(p),p===state.page);
  if(state.page<pages-2)h+='<span>...</span>';
  if(pages>1)btn(pages,String(pages),state.page===pages);
  if(state.page<pages)btn(state.page+1,'Next',false);
  pg.innerHTML=h;applyI18n();applyI18n();
  pg.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();state.page=+a.dataset.p;render();document.getElementById('grid').scrollIntoView({behavior:'smooth',block:'start'});});});
}
window.addEventListener('DOMContentLoaded',function(){
  var s=document.getElementById('q');
  document.getElementById('searchBtn').addEventListener('click',function(){state.q=s.value;state.page=1;render();});
  s.addEventListener('keydown',function(e){if(e.key==='Enter'){state.q=s.value;state.page=1;render();}});
  s.addEventListener('input',function(){if(!s.value.trim()&&state.q){state.q='';state.page=1;render();}});
  document.getElementById('catSel').addEventListener('change',function(e){state.cat=e.target.value;state.page=1;render();});
  document.getElementById('sortSel').addEventListener('change',function(e){state.sort=e.target.value;state.page=1;render();});
  document.getElementById('surpriseBtn').addEventListener('click',function(){if(!CATALOG.length){location.href='/login';return;}var p=CATALOG[Math.floor(Math.random()*CATALOG.length)];location.href='/prompt/'+p.id;});
  document.getElementById('findBtn').addEventListener('click',function(){
    var fc=document.getElementById('fcat');
    state.cat=fc.value;document.getElementById('catSel').value=fc.value;state.page=1;render();
    document.getElementById('grid').scrollIntoView({behavior:'smooth'});
  });
});
