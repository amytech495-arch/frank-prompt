/** Frank Prompt i18n — UI chrome translations. */
const FP_LANGS = {
  en: {name:'English', dir:'ltr'},
  es: {name:'Español', dir:'ltr'},
  fr: {name:'Français', dir:'ltr'},
  de: {name:'Deutsch', dir:'ltr'},
  pt: {name:'Português', dir:'ltr'},
  ar: {name:'العربية', dir:'rtl'},
  hi: {name:'हिन्दी', dir:'ltr'},
  ur: {name:'اردو', dir:'rtl'},
};
const FP_STR = {
en:{home:'Home',library:'My library',how:'How to use',pricing:'Pricing',login:'Log in',signup:'Sign up',goPro:'Go Pro',
searchPh:'Search by title, topic or ID...',search:'Search',surprise:'Surprise me',category:'Category',sortBy:'Sort by',
newest:'Newest first',oldest:'Oldest first',az:'A–Z',findPrompt:'FIND YOUR PROMPT',tellUs:'Tell us what you want to make',
answerThree:'Answer three quick questions and get ideas made for you.',wantToMake:'I want to make',aVideo:'A video',
style:'Style',anyStyle:'Any style',findMy:'Find my prompts',promptsUpTo:'Prompts up to ID 400',categories:'13 categories',
allFree:'Free & Pro plans',viewPrompt:'View prompt',preview:'Preview',save:'Save',copyPrompt:'Copy prompt',download:'Download',
free:'Free',new:'New',words:'words',perfectFor:'Perfect for',whatsInside:"What's inside this prompt",related:'Related prompts',
whyUse:'Why use Frank Prompt',proTitle:'Frank Prompt Pro',proSub:'Unlock the full library. Coming soon.',
freePlan:'Free',proPlan:'Pro',perMonth:'/month',comingSoon:'Coming soon',getStarted:'Get started',
f1t:'Expertly crafted',f1d:'Every prompt is engineered for viral short-form video.',
f2t:'Always free',f2d:'All 361 prompts free, forever.',f3t:'Copy & create',f3d:'One click to copy, paste into your AI tool.',
tagline:'Unlock your creative potential with expertly crafted AI prompts.',rights:'All rights reserved.',
fullPreview:'Full prompt preview',masterPrompt:'Master prompt',refImages:'Reference images'},
es:{home:'Inicio',library:'Mi biblioteca',how:'Cómo usar',pricing:'Precios',login:'Iniciar sesión',signup:'Registrarse',goPro:'Hazte Pro',
searchPh:'Buscar por título, tema o ID...',search:'Buscar',surprise:'Sorpréndeme',category:'Categoría',sortBy:'Ordenar por',
newest:'Más recientes',oldest:'Más antiguos',az:'A–Z',findPrompt:'ENCUENTRA TU PROMPT',tellUs:'Dinos qué quieres crear',
answerThree:'Responde tres preguntas rápidas y recibe ideas para ti.',wantToMake:'Quiero crear',aVideo:'Un video',
style:'Estilo',anyStyle:'Cualquier estilo',findMy:'Buscar mis prompts',promptsUpTo:'Prompts hasta el ID 400',categories:'13 categorías',
allFree:'Planes gratis y Pro',viewPrompt:'Ver prompt',preview:'Vista previa',save:'Guardar',copyPrompt:'Copiar prompt',download:'Descargar',
free:'Gratis',new:'Nuevo',words:'palabras',perfectFor:'Perfecto para',whatsInside:'Qué incluye este prompt',related:'Prompts relacionados',
whyUse:'Por qué usar Frank Prompt',proTitle:'Frank Prompt Pro',proSub:'Desbloquea toda la biblioteca. Próximamente.',
freePlan:'Gratis',proPlan:'Pro',perMonth:'/mes',comingSoon:'Próximamente',getStarted:'Comenzar',
f1t:'Creado por expertos',f1d:'Cada prompt está diseñado para video viral de formato corto.',
f2t:'Siempre gratis',f2d:'Los 361 prompts gratis, para siempre.',f3t:'Copia y crea',f3d:'Un clic para copiar y pegar en tu herramienta de IA.',
tagline:'Desbloquea tu potencial creativo con prompts de IA creados por expertos.',rights:'Todos los derechos reservados.',
fullPreview:'Vista previa completa',masterPrompt:'Prompt maestro',refImages:'Imágenes de referencia'},
fr:{home:'Accueil',library:'Ma bibliothèque',how:"Mode d'emploi",pricing:'Tarifs',login:'Se connecter',signup:"S'inscrire",goPro:'Passer Pro',
searchPh:'Rechercher par titre, sujet ou ID...',search:'Rechercher',surprise:'Surprenez-moi',category:'Catégorie',sortBy:'Trier par',
newest:'Plus récents',oldest:'Plus anciens',az:'A–Z',findPrompt:'TROUVEZ VOTRE PROMPT',tellUs:'Dites-nous ce que vous voulez créer',
answerThree:'Répondez à trois questions rapides et recevez des idées.',wantToMake:'Je veux créer',aVideo:'Une vidéo',
style:'Style',anyStyle:'Tous styles',findMy:'Trouver mes prompts',promptsUpTo:"Prompts jusqu'à l'ID 400",categories:'13 catégories',
allFree:'Formules gratuite et Pro',viewPrompt:'Voir le prompt',preview:'Aperçu',save:'Enregistrer',copyPrompt:'Copier le prompt',download:'Télécharger',
free:'Gratuit',new:'Nouveau',words:'mots',perfectFor:'Idéal pour',whatsInside:'Contenu de ce prompt',related:'Prompts associés',
whyUse:'Pourquoi utiliser Frank Prompt',proTitle:'Frank Prompt Pro',proSub:'Débloquez toute la bibliothèque. Bientôt disponible.',
freePlan:'Gratuit',proPlan:'Pro',perMonth:'/mois',comingSoon:'Bientôt',getStarted:'Commencer',
f1t:'Conçu par des experts',f1d:'Chaque prompt est optimisé pour la vidéo virale courte.',
f2t:'Toujours gratuit',f2d:'Les 361 prompts gratuits, pour toujours.',f3t:'Copiez et créez',f3d:'Un clic pour copier dans votre outil IA.',
tagline:"Libérez votre potentiel créatif avec des prompts IA d'experts.",rights:'Tous droits réservés.',
fullPreview:'Aperçu complet',masterPrompt:'Prompt maître',refImages:'Images de référence'},
de:{home:'Start',library:'Meine Bibliothek',how:'Anleitung',pricing:'Preise',login:'Anmelden',signup:'Registrieren',goPro:'Pro werden',
searchPh:'Nach Titel, Thema oder ID suchen...',search:'Suchen',surprise:'Überrasch mich',category:'Kategorie',sortBy:'Sortieren',
newest:'Neueste zuerst',oldest:'Älteste zuerst',az:'A–Z',findPrompt:'FINDE DEINEN PROMPT',tellUs:'Sag uns, was du erstellen willst',
answerThree:'Beantworte drei kurze Fragen und erhalte Ideen.',wantToMake:'Ich möchte erstellen',aVideo:'Ein Video',
style:'Stil',anyStyle:'Jeder Stil',findMy:'Meine Prompts finden',promptsUpTo:'Prompts bis ID 400',categories:'13 Kategorien',
allFree:'Gratis- & Pro-Pläne',viewPrompt:'Prompt ansehen',preview:'Vorschau',save:'Speichern',copyPrompt:'Prompt kopieren',download:'Herunterladen',
free:'Kostenlos',new:'Neu',words:'Wörter',perfectFor:'Perfekt für',whatsInside:'Inhalt dieses Prompts',related:'Ähnliche Prompts',
whyUse:'Warum Frank Prompt',proTitle:'Frank Prompt Pro',proSub:'Schalte die volle Bibliothek frei. Demnächst.',
freePlan:'Kostenlos',proPlan:'Pro',perMonth:'/Monat',comingSoon:'Demnächst',getStarted:'Loslegen',
f1t:'Expertengefertigt',f1d:'Jeder Prompt ist für virale Kurzvideos optimiert.',
f2t:'Immer kostenlos',f2d:'Alle 361 Prompts für immer kostenlos.',f3t:'Kopieren & erstellen',f3d:'Ein Klick zum Kopieren in dein KI-Tool.',
tagline:'Entfalte dein kreatives Potenzial mit Experten-KI-Prompts.',rights:'Alle Rechte vorbehalten.',
fullPreview:'Vollständige Vorschau',masterPrompt:'Master-Prompt',refImages:'Referenzbilder'},
pt:{home:'Início',library:'Minha biblioteca',how:'Como usar',pricing:'Preços',login:'Entrar',signup:'Cadastrar',goPro:'Seja Pro',
searchPh:'Buscar por título, tema ou ID...',search:'Buscar',surprise:'Surpreenda-me',category:'Categoria',sortBy:'Ordenar por',
newest:'Mais recentes',oldest:'Mais antigos',az:'A–Z',findPrompt:'ENCONTRE SEU PROMPT',tellUs:'Diga-nos o que você quer criar',
answerThree:'Responda três perguntas rápidas e receba ideias.',wantToMake:'Quero criar',aVideo:'Um vídeo',
style:'Estilo',anyStyle:'Qualquer estilo',findMy:'Encontrar meus prompts',promptsUpTo:'Prompts até o ID 400',categories:'13 categorias',
allFree:'Planos grátis e Pro',viewPrompt:'Ver prompt',preview:'Prévia',save:'Salvar',copyPrompt:'Copiar prompt',download:'Baixar',
free:'Grátis',new:'Novo',words:'palavras',perfectFor:'Perfeito para',whatsInside:'O que há neste prompt',related:'Prompts relacionados',
whyUse:'Por que usar Frank Prompt',proTitle:'Frank Prompt Pro',proSub:'Desbloqueie toda a biblioteca. Em breve.',
freePlan:'Grátis',proPlan:'Pro',perMonth:'/mês',comingSoon:'Em breve',getStarted:'Começar',
f1t:'Feito por especialistas',f1d:'Cada prompt é otimizado para vídeos virais curtos.',
f2t:'Sempre grátis',f2d:'Todos os 361 prompts grátis, para sempre.',f3t:'Copie e crie',f3d:'Um clique para copiar para sua ferramenta de IA.',
tagline:'Desbloqueie seu potencial criativo com prompts de IA especializados.',rights:'Todos os direitos reservados.',
fullPreview:'Prévia completa',masterPrompt:'Prompt mestre',refImages:'Imagens de referência'},
ar:{home:'الرئيسية',library:'مكتبتي',how:'كيفية الاستخدام',pricing:'الأسعار',login:'تسجيل الدخول',signup:'إنشاء حساب',goPro:'اشترك في Pro',
searchPh:'ابحث بالعنوان أو الموضوع أو الرقم...',search:'بحث',surprise:'فاجئني',category:'الفئة',sortBy:'ترتيب حسب',
newest:'الأحدث أولاً',oldest:'الأقدم أولاً',az:'أ–ي',findPrompt:'اعثر على البرومبت',tellUs:'أخبرنا ماذا تريد أن تصنع',
answerThree:'أجب عن ثلاثة أسئلة سريعة واحصل على أفكار مخصصة.',wantToMake:'أريد أن أصنع',aVideo:'فيديو',
style:'الأسلوب',anyStyle:'أي أسلوب',findMy:'اعثر على البرومبتات',promptsUpTo:'برومبتات حتى الرقم 400',categories:'13 فئة',
allFree:'خطط مجانية واحترافية',viewPrompt:'عرض البرومبت',preview:'معاينة',save:'حفظ',copyPrompt:'نسخ البرومبت',download:'تحميل',
free:'مجاني',new:'جديد',words:'كلمة',perfectFor:'مثالي لـ',whatsInside:'محتويات هذا البرومبت',related:'برومبتات ذات صلة',
whyUse:'لماذا فرانك برومبت',proTitle:'فرانك برومبت برو',proSub:'افتح المكتبة الكاملة. قريباً.',
freePlan:'مجاني',proPlan:'برو',perMonth:'/شهر',comingSoon:'قريباً',getStarted:'ابدأ الآن',
f1t:'مصمم بخبرة',f1d:'كل برومبت مُحسّن للفيديوهات القصيرة.',
f2t:'مجاني دائماً',f2d:'جميع البرومبتات الـ361 مجانية للأبد.',f3t:'انسخ واصنع',f3d:'نقرة واحدة للنسخ إلى أداة الذكاء الاصطناعي.',
tagline:'أطلق إمكاناتك الإبداعية مع برومبتات ذكاء اصطناعي احترافية.',rights:'جميع الحقوق محفوظة.',
fullPreview:'معاينة كاملة',masterPrompt:'البرومبت الرئيسي',refImages:'صور مرجعية'},
hi:{home:'होम',library:'मेरी लाइब्रेरी',how:'कैसे उपयोग करें',pricing:'मूल्य',login:'लॉग इन',signup:'साइन अप',goPro:'प्रो बनें',
searchPh:'शीर्षक, विषय या ID से खोजें...',search:'खोजें',surprise:'मुझे चौंकाएं',category:'श्रेणी',sortBy:'क्रमबद्ध करें',
newest:'नवीनतम पहले',oldest:'पुराने पहले',az:'अ–ज्ञ',findPrompt:'अपना प्रॉम्प्ट खोजें',tellUs:'बताएं आप क्या बनाना चाहते हैं',
answerThree:'तीन त्वरित प्रश्नों का उत्तर दें और विचार पाएं।',wantToMake:'मैं बनाना चाहता हूं',aVideo:'एक वीडियो',
style:'शैली',anyStyle:'कोई भी शैली',findMy:'मेरे प्रॉम्प्ट खोजें',promptsUpTo:'ID 400 तक प्रॉम्प्ट',categories:'13 श्रेणियां',
allFree:'मुफ्त और प्रो प्लान',viewPrompt:'प्रॉम्प्ट देखें',preview:'पूर्वावलोकन',save:'सहेजें',copyPrompt:'प्रॉम्प्ट कॉपी करें',download:'डाउनलोड',
free:'मुफ्त',new:'नया',words:'शब्द',perfectFor:'के लिए उपयुक्त',whatsInside:'इस प्रॉम्प्ट में क्या है',related:'संबंधित प्रॉम्प्ट',
whyUse:'फ्रैंक प्रॉम्प्ट क्यों',proTitle:'फ्रैंक प्रॉम्प्ट प्रो',proSub:'पूरी लाइब्रेरी अनलॉक करें। जल्द आ रहा है।',
freePlan:'मुफ्त',proPlan:'प्रो',perMonth:'/माह',comingSoon:'जल्द आ रहा है',getStarted:'शुरू करें',
f1t:'विशेषज्ञ निर्मित',f1d:'हर प्रॉम्प्ट वायरल शॉर्ट वीडियो के लिए अनुकूलित है।',
f2t:'हमेशा मुफ्त',f2d:'सभी 361 प्रॉम्प्ट हमेशा मुफ्त।',f3t:'कॉपी करें और बनाएं',f3d:'आपके AI टूल में पेस्ट करने के लिए एक क्लिक।',
tagline:'विशेषज्ञ AI प्रॉम्प्ट के साथ अपनी रचनात्मक क्षमता अनलॉक करें।',rights:'सर्वाधिकार सुरक्षित।',
fullPreview:'पूर्ण पूर्वावलोकन',masterPrompt:'मास्टर प्रॉम्प्ट',refImages:'संदर्भ छवियां'},
ur:{home:'ہوم',library:'میری لائبریری',how:'استعمال کا طریقہ',pricing:'قیمتیں',login:'لاگ ان',signup:'سائن اپ',goPro:'پرو بنیں',
searchPh:'عنوان، موضوع یا ID سے تلاش کریں...',search:'تلاش',surprise:'مجھے حیران کریں',category:'زمرہ',sortBy:'ترتیب',
newest:'نئے پہلے',oldest:'پرانے پہلے',az:'ا–ی',findPrompt:'اپنا پرامپٹ تلاش کریں',tellUs:'بتائیں آپ کیا بنانا چاہتے ہیں',
answerThree:'تین فوری سوالات کے جواب دیں اور آئیڈیاز حاصل کریں۔',wantToMake:'میں بنانا چاہتا ہوں',aVideo:'ایک ویڈیو',
style:'انداز',anyStyle:'کوئی بھی انداز',findMy:'میرے پرامپٹس تلاش کریں',promptsUpTo:'ID 400 تک پرامپٹس',categories:'13 زمرے',
allFree:'مفت اور پرو پلانز',viewPrompt:'پرامپٹ دیکھیں',preview:'پیش نظارہ',save:'محفوظ کریں',copyPrompt:'پرامپٹ کاپی کریں',download:'ڈاؤن لوڈ',
free:'مفت',new:'نیا',words:'الفاظ',perfectFor:'کے لیے بہترین',whatsInside:'اس پرامپٹ میں کیا ہے',related:'متعلقہ پرامپٹس',
whyUse:'فرینک پرامپٹ کیوں',proTitle:'فرینک پرامپٹ پرو',proSub:'مکمل لائبریری ان لاک کریں۔ جلد آ رہا ہے۔',
freePlan:'مفت',proPlan:'پرو',perMonth:'/ماہ',comingSoon:'جلد آ رہا ہے',getStarted:'شروع کریں',
f1t:'ماہر ساختہ',f1d:'ہر پرامپٹ وائرل شارٹ ویڈیو کے لیے بہتر بنایا گیا ہے۔',
f2t:'ہمیشہ مفت',f2d:'تمام 361 پرامپٹس ہمیشہ مفت۔',f3t:'کاپی کریں اور بنائیں',f3d:'آپ کے AI ٹول میں پیسٹ کرنے کے لیے ایک کلک۔',
tagline:'ماہر AI پرامپٹس کے ساتھ اپنی تخلیقی صلاحیتوں کو اجاگر کریں۔',rights:'جملہ حقوق محفوظ ہیں۔',
fullPreview:'مکمل پیش نظارہ',masterPrompt:'ماسٹر پرامپٹ',refImages:'حوالہ تصاویر'},
};
function fpLang(){try{return localStorage.getItem('fp-lang')||'en'}catch(e){return 'en'}}
function fpSetLang(l){try{localStorage.setItem('fp-lang',l)}catch(e){}document.documentElement.lang=l;
  var rtl=(FP_LANGS[l]&&FP_LANGS[l].dir==='rtl');document.documentElement.dir=rtl?'rtl':'ltr';applyI18n();}
function fpT(k){var l=fpLang();return (FP_STR[l]&&FP_STR[l][k])||FP_STR.en[k]||k}
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var v=fpT(el.getAttribute('data-i18n'));if(v)el.textContent=v;});
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
    var v=fpT(el.getAttribute('data-i18n-ph'));if(v)el.placeholder=v;});
  var sel=document.getElementById('langSel');if(sel)sel.value=fpLang();
}
document.addEventListener('DOMContentLoaded',function(){fpSetLang(fpLang());
  var sel=document.getElementById('langSel');if(sel)sel.addEventListener('change',function(){fpSetLang(sel.value);});});

/* Auth gating: prompts require login */
(function(){
  if(window._fpGateInit) return; window._fpGateInit = true;
  var CFG = {apiKey:"AIzaSyDGXh6r1gHnVU5xAMJbchm6JhASmmZvXGs",authDomain:"frank-prompt.firebaseapp.com",projectId:"frank-prompt"};
  function load(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}
  function ensureFirebase(){
    if(window.firebase && firebase.apps && firebase.apps.length) return Promise.resolve();
    return load("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js")
      .then(function(){return load("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js");})
      .then(function(){ if(!firebase.apps.length) firebase.initializeApp(CFG); });
  }
  function loginWall(){
    return '<div style="max-width:480px;margin:80px auto;text-align:center;padding:40px 24px;">'
      + '<div style="font-size:48px;margin-bottom:16px;">🔒</div>'
      + '<h2>Log in to view this prompt</h2>'
      + '<p style="color:var(--gray);margin:12px 0 24px">Create a free account to unlock all 361 prompts.</p>'
      + '<a href="/login" class="btn-gold" style="display:inline-block;padding:12px 32px;text-decoration:none">Log in</a>'
      + '<p style="margin-top:16px;font-size:13px;color:var(--gray)">No account? <a href="/signup" style="color:var(--gold)">Sign up free</a></p>'
      + '</div>';
  }
  document.addEventListener('DOMContentLoaded', function(){
    var isPromptPage = /\/prompt\//.test(location.pathname);
    var isAuthPage = /\/(login|signup)/.test(location.pathname);
    if(isAuthPage) return;
    ensureFirebase().then(function(){
      firebase.auth().onAuthStateChanged(function(user){
        if(user) return; // logged in, full access
        if(isPromptPage){
          // Hide prompt content, show login wall
          // Target: hero section, all content sections, prompt text
          ['.hero-tan','.sect','.refgrid','.stat3'].forEach(function(sel){
            document.querySelectorAll(sel).forEach(function(el){ el.style.display='none'; });
          });
          // Hide the main content wrap (the one containing hero-tan)
          var hero = document.querySelector('.hero-tan');
          if(hero){
            var wrap = hero.closest('div.wrap');
            if(wrap){
              // Hide all siblings after subbar within this wrap
              Array.from(wrap.children).forEach(function(ch){ ch.style.display='none'; });
            }
          }
          // Hide any pre/code blocks with prompt text
          document.querySelectorAll('pre, .prompt-text, .code-block').forEach(function(el){ el.style.display='none'; });
          var wall = document.createElement('div');
          wall.innerHTML = loginWall();
          var anchor = document.querySelector('.subbar') || document.body;
          anchor.parentNode.insertBefore(wall, anchor.nextSibling);
        } else {
          // Homepage: intercept prompt clicks
          document.addEventListener('click', function(e){
            var card = e.target.closest('a[href^="/prompt/"]');
            if(card){ e.preventDefault(); location.href='/login'; }
          }, true);
        }
      });
    }).catch(function(){});
  });
})();

/* Redirect Contact links to WhatsApp */
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a[href="/contact"]').forEach(function(a){
    a.href = 'https://wa.me/2347052092356';
    a.target = '_blank';
    a.rel = 'noopener';
  });
});
