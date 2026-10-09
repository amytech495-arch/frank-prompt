
(function(){
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  var m=location.pathname.match(/\/prompt\/(\d+)/);var id=m?+m[1]:null;
  if(!id){document.getElementById('promptBody').textContent='Prompt not found.';return;}
  Promise.all([fetch('/assets/catalog.json').then(function(r){return r.json()}),fetch('/assets/texts.json').then(function(r){return r.json()})]).then(function(res){var cat=res[0];var TEXTS=res[1];
    var p=null;for(var i=0;i<cat.length;i++)if(cat[i].id===id){p=cat[i];break;}
    if(!p){document.getElementById('promptBody').textContent='Prompt not found.';return;}
    document.title=p.title+' · Manjan Prompts';
    document.getElementById('dTitle').textContent=p.title;
    document.getElementById('dCat').textContent=p.category;
    document.getElementById('dId').textContent='Prompt #'+p.id;
    document.getElementById('dMeta').textContent=(p.words?p.words.toLocaleString():'—')+' words · Updated '+(p.updated||'—')+' · '+p.refs.length+' Reference image(s)';
    var cov=document.getElementById('dCover');
    cov.innerHTML=p.thumb?'<img src="'+esc(p.thumb)+'" alt="">':'<div style="padding:40px;color:var(--gold);font-weight:800">'+esc(p.title.slice(0,40))+'</div>';
    var fullText=TEXTS[String(id)]||'';document.getElementById('promptBody').textContent=fullText||'No text available.';
    document.getElementById('dWords').textContent=p.words?p.words.toLocaleString():'—';
    if(p.refs.length){
      document.getElementById('refSect').style.display='block';
      document.getElementById('refCount').textContent=p.refs.length;
      document.getElementById('refGrid').innerHTML=p.refs.map(function(u,i){return '<img src="'+esc(u)+'" alt="Reference '+(i+1)+'" loading="lazy">'}).join('');
    }
    var rel=cat.filter(function(x){return x.category===p.category&&x.id!==p.id}).slice(0,4);
    document.getElementById('relGrid').innerHTML=rel.map(function(x){
      var im=x.thumb?'<img src="'+x.thumb+'" alt="" loading="lazy">':'<div class="cover-fallback">MP</div>';
      return '<a class="card" href="/prompt/'+x.id+'"><div class="thumb">'+im+'<span class="tag-id">ID '+x.id+'</span></div><div class="body"><div class="cat">'+x.category+'</div><h3 style="font-size:14px">'+x.title.slice(0,70)+'</h3></div></a>';
    }).join('');
    function dl(){var b=new Blob([fullText],{type:'text/plain'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='manjan-prompts-'+p.id+'.txt';a.click();}
    function cp(){navigator.clipboard.writeText(fullText).then(function(){var f=document.getElementById('flash');f.textContent='Copied!';f.style.display='block';setTimeout(function(){f.style.display='none'},1600);});}
    document.getElementById('dlBtn').onclick=dl;
    document.getElementById('copyBtn').onclick=cp;
    document.getElementById('copyBtn2').onclick=cp;
  }).catch(function(){document.getElementById('promptBody').textContent='Could not load the prompt.';});
})();
