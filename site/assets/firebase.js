/* Frank Prompt Firebase Auth */
const firebaseConfig = {
  apiKey: "AIzaSyDGXh6r1gHnVU5xAMJbchm6JhASmmZvXGs",
  authDomain: "frank-prompt.firebaseapp.com",
  projectId: "frank-prompt",
  storageBucket: "frank-prompt.firebasestorage.app",
  messagingSenderId: "290205670412",
  appId: "1:290205670412:web:b438cc174eb128d31b2229"
};
firebase.initializeApp(firebaseConfig);
const fpAuth = firebase.auth();

function fpOnAuth(cb){ fpAuth.onAuthStateChanged(cb); }
function fpGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
  // Try popup first, fall back to redirect if it fails
  return fpAuth.signInWithPopup(provider).catch(function(err){
    if(err.code==='auth/popup-blocked'||err.code==='auth/popup-closed-by-user'||err.code==='auth/argument-error'){
      return fpAuth.signInWithRedirect(provider);
    }
    throw err;
  });
}
function fpCheckRedirect(){
  return fpAuth.getRedirectResult().catch(function(err){
    var el = document.getElementById('err');
    if(el) el.textContent = err.message;
  });
}
function fpSendVerification(){
  var u = fpAuth.currentUser;
  if(!u) return Promise.reject(new Error('Not signed in'));
  return u.sendEmailVerification({url:'https://frank-prompt.vercel.app/login',handleCodeInApp:false});
}
function fpSignUp(email, pw){ return fpAuth.createUserWithEmailAndPassword(email, pw); }
function fpSignIn(email, pw){ return fpAuth.signInWithEmailAndPassword(email, pw); }
function fpSignOut(){ return fpAuth.signOut(); }

/* Header auth state: show account icon when logged in */
document.addEventListener('DOMContentLoaded', function(){
  fpOnAuth(function(user){
    var loginBtn = document.querySelector('.btn-login');
    var signupBtn = document.querySelector('.btn-sm-hd');
    if(!loginBtn || !signupBtn || !user) return;
    var name = user.displayName || (user.email||'U').split('@')[0];
    var initial = name.charAt(0).toUpperCase();
    var avatar = document.createElement('a');
    avatar.href = '#';
    avatar.title = user.email || name;
    avatar.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#f5c518,#b8860b);color:#111;font-weight:700;font-size:16px;text-decoration:none;margin-right:10px;';
    avatar.textContent = initial;
    avatar.onclick = function(e){ e.preventDefault(); if(confirm('Log out of Frank Prompt?')) fpSignOut().then(function(){location.reload();}); };
    loginBtn.replaceWith(avatar);
    signupBtn.style.display = 'none';
  });
});
