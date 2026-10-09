/* Frank Prompt Firebase Auth */
const firebaseConfig = {
  apiKey: "AIzaSyDGXh6r1gHnVU5xAMJbchm6JhASmmZvXGs",
  authDomain: "frank-prompt.firebaseapp.com",
  projectId: "frank-prompt",
  storageBucket: "frank-prompt.firebasestorage.app",
  messagingSenderId: "290205670412",
  appId: "1:290205670412:web:b438cc174eb128d31b2229"
};
if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const fpAuth = firebase.auth();
function fpEsc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
let fpDb = null;
try { fpDb = firebase.firestore(); } catch(e) { console.warn('Firestore not loaded', e); }
function fpGetDb(){ return fpDb; }

function fpOnAuth(cb){ fpAuth.onAuthStateChanged(cb); }
function fpGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  // Force account selection to avoid stale-session bounce-back issues
  try { provider.setCustomParameters({prompt: 'select_account'}); } catch(e) {}
  // Always add the email/profile scopes explicitly
  try { provider.addScope('email'); provider.addScope('profile'); } catch(e) {}
  var ua = navigator.userAgent || '';
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  // WebViews and in-app browsers can't handle popups reliably — use redirect
  var isWebView = /\bwv\b|WebView|FBAN|FBAV|Instagram|Line\/|MicroMessenger/i.test(ua);
  if(isMobile || isWebView){
    return fpAuth.signInWithRedirect(provider);
  }
  // Desktop: try popup first, fall back to redirect on ANY popup failure
  // (not just blocked/closed — also network errors, cancelled requests, etc.)
  return fpAuth.signInWithPopup(provider).catch(function(err){
    var popupErrors = ['auth/popup-blocked','auth/popup-closed-by-user','auth/argument-error',
      'auth/cancelled-popup-request','auth/network-request-failed','auth/web-storage-unsupported',
      'auth/internal-error'];
    if(popupErrors.indexOf(err.code) !== -1){
      return fpAuth.signInWithRedirect(provider);
    }
    throw err;
  });
}
function fpCheckRedirect(){
  return fpAuth.getRedirectResult().then(function(res){
    if(res && res.user){
      // Successful redirect sign-in: ensure Firestore user profile exists, then go home
      try {
        if(fpDb){
          fpDb.collection('users').doc(res.user.uid).set({
            email: res.user.email || '',
            displayName: res.user.displayName || '',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, {merge: true}).catch(function(){});
        }
      } catch(e) {}
      if(!location.pathname.includes('/login') && !location.pathname.includes('/signup')){
        return res; // already on a non-auth page; auth listener will update UI
      }
      location.href = '/';
    }
    return res;
  }).catch(function(err){
    var el = document.getElementById('err');
    var msg = err && err.message ? err.message : String(err);
    // Make unauthorized-domain errors actionable
    if(err && err.code === 'auth/unauthorized-domain'){
      msg = 'Sign-in blocked: this domain is not authorized in Firebase Authentication settings. ' + msg;
    }
    if(el){ el.textContent = msg; el.style.color = '#f87171'; }
    else { console.warn('Google redirect sign-in failed:', msg); }
  });
}
// Handle Google redirect results on EVERY page (not just auth pages),
// so the sign-in completes no matter where the OAuth flow returns.
document.addEventListener('DOMContentLoaded', function(){
  try { fpCheckRedirect(); } catch(e) { console.warn('fpCheckRedirect failed', e); }
});
function fpSendVerification(){
  var u = fpAuth.currentUser;
  if(!u) return Promise.reject(new Error('Not signed in'));
  return u.sendEmailVerification({url:'https://frank-prompt.vercel.app/login',handleCodeInApp:false});
}
function fpSignUp(email, pw){ return fpAuth.createUserWithEmailAndPassword(email, pw); }
function fpSignIn(email, pw){ return fpAuth.signInWithEmailAndPassword(email, pw); }
function fpSignOut(){ return fpAuth.signOut(); }
function fpResetPassword(email){ return fpAuth.sendPasswordResetEmail(email); }

/* Header auth state: account icon with profile dropdown */
function fpInitHeaderAuth(){
  fpOnAuth(function(user){
    if(document.getElementById('fp-avatar')) return; // already rendered
    var loginBtn = document.querySelector('.btn-login');
    var signupBtn = document.querySelector('.btn-sm-hd');
    if(!loginBtn || !signupBtn || !user) return;

    // Load user profile from Firestore
    var profile = {displayName: user.displayName || '', avatarColor: '#f5c518', avatarEmoji: ''};
    if(fpDb){
      fpDb.collection('users').doc(user.uid).get().then(function(doc){
        if(doc.exists){
          var d = doc.data();
          if(d.displayName) profile.displayName = d.displayName;
          if(d.avatarColor) profile.avatarColor = d.avatarColor;
          if(d.avatarEmoji) profile.avatarEmoji = d.avatarEmoji;
          renderAvatar();
        }
      }).catch(function(){});
    }

    var name = profile.displayName || (user.email||'U').split('@')[0];
    var avatarWrap = document.createElement('div');
    avatarWrap.style.cssText = 'position:relative;display:inline-block;margin-right:10px;';

    var avatar = document.createElement('a');
    avatar.href = '#';
    avatar.id = 'fp-avatar';
    avatar.title = 'Account';
    avatar.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,'+profile.avatarColor+',#b8860b);color:#111;font-weight:700;font-size:16px;text-decoration:none;cursor:pointer;';

    function renderAvatar(){
      var n = profile.displayName || (user.email||'U').split('@')[0];
      avatar.style.background = 'linear-gradient(135deg,'+profile.avatarColor+',#b8860b)';
      avatar.textContent = '';
      if(profile.avatarEmoji){
        avatar.textContent = profile.avatarEmoji;
      } else {
        avatar.textContent = n.charAt(0).toUpperCase();
      }
      avatar.title = user.email || n;
    }
    renderAvatar();

    // Dropdown
    var dd = document.createElement('div');
    dd.id = 'fp-profile-dd';
    dd.style.cssText = 'display:none;position:absolute;top:46px;right:0;width:280px;background:var(--card,#161616);border:1px solid var(--border,#2a2a2a);border-radius:12px;padding:20px;z-index:9999;box-shadow:0 8px 32px rgba(0,0,0,.4);color:var(--text,#fff);';

    function renderDropdown(){
      var n = profile.displayName || (user.email||'U').split('@')[0];
      var provider = (user.providerData[0]||{}).providerId || 'email';
      var providerName = provider === 'google.com' ? 'Google' : provider === 'apple.com' ? 'Apple' : 'Email';
      var created = user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : '';
      dd.innerHTML =
        '<div style="text-align:center;margin-bottom:16px">'
        + '<div id="fp-dd-avatar" style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,'+profile.avatarColor+',#b8860b);display:inline-flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:#111;cursor:pointer" title="Click to change icon">'
        + (profile.avatarEmoji || n.charAt(0).toUpperCase()) + '</div>'
        + '<div style="font-size:11px;color:var(--gray,#888);margin-top:6px">Click icon to change</div></div>'
        + '<label style="font-size:11px;color:var(--gray,#888)">USERNAME</label>'
        + '<input id="fp-dd-name" type="text" value="'+fpEsc(n)+'" style="width:100%;margin:4px 0 12px;padding:8px;border-radius:8px;border:1px solid var(--border,#2a2a2a);background:var(--bg,#0d0d0d);color:var(--text,#fff)">'
        + '<label style="font-size:11px;color:var(--gray,#888)">EMAIL</label>'
        + '<div style="margin:4px 0 12px;font-size:14px;word-break:break-all">'+fpEsc(user.email||'—')+'</div>'
        + '<label style="font-size:11px;color:var(--gray,#888)">SIGNED IN WITH</label>'
        + '<div style="margin:4px 0 12px;font-size:14px">'+fpEsc(providerName)+(created ? ' · since '+fpEsc(created) : '')+'</div>'
        + '<button id="fp-dd-save" class="btn-gold" style="width:100%;padding:10px;border-radius:8px;border:none;cursor:pointer;font-weight:600">Save changes</button>'
        + '<button id="fp-dd-logout" style="width:100%;margin-top:8px;padding:10px;border-radius:8px;border:1px solid var(--border,#2a2a2a);background:transparent;color:var(--text,#fff);cursor:pointer">Log out</button>'
        + '<div id="fp-dd-msg" style="font-size:12px;margin-top:8px;min-height:18px"></div>';

      // Avatar picker
      dd.querySelector('#fp-dd-avatar').onclick = function(){
        var emojis = ['😀','🚀','⭐','🔥','💡','🎨','👑','⚡'];
        var colors = ['#f5c518','#4ade80','#60a5fa','#f472b6','#a78bfa','#fb923c'];
        var cur = emojis.indexOf(profile.avatarEmoji);
        if(cur < emojis.length - 1){
          profile.avatarEmoji = emojis[cur + 1];
        } else {
          profile.avatarEmoji = '';
          var ci = colors.indexOf(profile.avatarColor);
          profile.avatarColor = colors[(ci + 1) % colors.length];
        }
        renderAvatar(); renderDropdown();
      };
      // Save
      dd.querySelector('#fp-dd-save').onclick = function(){
        var newName = dd.querySelector('#fp-dd-name').value.trim();
        var msg = dd.querySelector('#fp-dd-msg');
        if(newName.length > 50){ msg.style.color='#f87171'; msg.textContent='Username must be 50 characters or less.'; return; }
        var updates = {};
        if(newName && newName !== user.displayName) updates.displayName = newName;
        var p1 = newName ? user.updateProfile({displayName: newName}) : Promise.resolve();
        var p2 = fpDb ? fpDb.collection('users').doc(user.uid).set({
          displayName: newName || profile.displayName,
          avatarColor: profile.avatarColor,
          avatarEmoji: profile.avatarEmoji,
          email: user.email || '',
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, {merge: true}) : Promise.resolve();
        Promise.all([p1, p2]).then(function(){
          profile.displayName = newName || profile.displayName;
          renderAvatar();
          msg.style.color = '#4ade80'; msg.textContent = 'Saved!';
          setTimeout(function(){ dd.style.display = 'none'; }, 800);
        }).catch(function(e){ msg.style.color = '#f87171'; msg.textContent = e.message; });
      };
      // Logout
      dd.querySelector('#fp-dd-logout').onclick = function(){
        fpSignOut().then(function(){ location.reload(); });
      };
    }
    renderDropdown();

    avatar.onclick = function(e){
      e.preventDefault(); e.stopPropagation();
      dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
    };
    document.addEventListener('click', function(e){
      if(!avatarWrap.contains(e.target)) dd.style.display = 'none';
    });

    avatarWrap.appendChild(avatar);
    avatarWrap.appendChild(dd);
    loginBtn.replaceWith(avatarWrap);
    signupBtn.style.display = 'none';
  });
}

/* Auth page handlers (moved from inline for reliability) */
(function(){
  if(window._fpAuthPagesInit) return; window._fpAuthPagesInit = true;
  function init(){
    var goBtn = document.getElementById('go');
    var googleBtn = document.getElementById('google');
    var errEl = document.getElementById('err');
    var emailEl = document.getElementById('email');
    var pwEl = document.getElementById('pw');
    var agreeEl = document.getElementById('agree');
    if(!goBtn || !emailEl) return; // not an auth page

    var isSignup = location.pathname.includes('signup');

    function showErr(msg){
      if(errEl){ errEl.textContent = msg; errEl.style.color = '#f87171'; }
    }
    function showOk(msg){
      if(errEl){ errEl.textContent = msg; errEl.style.color = '#4ade80'; }
    }

    if(agreeEl){
      agreeEl.onchange = function(){ goBtn.disabled = !this.checked; };
    }

    goBtn.onclick = function(){
      if(agreeEl && !agreeEl.checked){ showErr('Please agree to the Terms and Privacy Policy.'); return; }
      var e = emailEl.value.trim(), pw = pwEl.value;
      if(!e || !pw){ showErr('Please enter email and password.'); return; }
      if(isSignup){
        fpSignUp(e, pw).then(function(){
          return fpSendVerification().then(function(){
            showOk('Account created! Check your email for a verification link.');
            setTimeout(function(){ location.href = '/login'; }, 2500);
          });
        }).catch(function(err){ showErr(err.message); });
      } else {
        fpSignIn(e, pw).then(function(){ location.href = '/'; })
          .catch(function(err){ showErr('Invalid email or password.'); });
      }
    };

    if(googleBtn){
      googleBtn.onclick = function(){
        if(agreeEl && !agreeEl.checked){ showErr('Please agree to the Terms and Privacy Policy.'); return; }
        // Loading feedback so the tap is visibly acknowledged
        var origHTML = googleBtn.innerHTML;
        googleBtn.disabled = true;
        googleBtn.style.opacity = '0.6';
        googleBtn.style.cursor = 'wait';
        function restoreBtn(){ try{ googleBtn.disabled = false; googleBtn.style.opacity = ''; googleBtn.style.cursor = ''; }catch(e){} }
        try {
          var p = fpGoogle();
          // signInWithRedirect never settles (page navigates away) — that's expected.
          // signInWithPopup resolves on success.
          if(p && typeof p.then === 'function'){
            p.then(function(){ location.href = '/'; })
             .catch(function(err){ restoreBtn(); showErr(err && err.message ? err.message : String(err)); });
          }
        } catch(err){
          restoreBtn();
          showErr(err && err.message ? err.message : String(err));
        }
        // Safety: restore button after 15s in case something hung silently
        setTimeout(restoreBtn, 15000);
      };
    }

    // Redirect result is handled globally on DOMContentLoaded (see fpCheckRedirect above)

    var forgotLink = document.getElementById('forgotPw');
    if(forgotLink && emailEl){
      forgotLink.onclick = function(e){
        e.preventDefault();
        var e2 = emailEl.value.trim();
        if(!e2){ showErr('Enter your email address above first, then click "Forgot password?".'); emailEl.focus(); return; }
        fpResetPassword(e2).then(function(){
          if(errEl){ errEl.style.color = '#4ade80'; }
          showOk('Password reset email sent. Check your inbox.');
        }).catch(function(err){ showErr(err.message); });
      };
    }

    // Redirect if already logged in
    fpOnAuth(function(user){ if(user) location.href = '/'; });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* Robust header auth init */
(function(){
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', fpInitHeaderAuth);
  } else {
    fpInitHeaderAuth();
  }
  setTimeout(fpInitHeaderAuth, 1500);
})();
