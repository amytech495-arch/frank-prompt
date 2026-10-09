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
function fpSendVerification(){ var u = fpAuth.currentUser; return u ? u.sendEmailVerification() : Promise.reject(new Error('Not signed in')); }
function fpSignUp(email, pw){ return fpAuth.createUserWithEmailAndPassword(email, pw); }
function fpSignIn(email, pw){ return fpAuth.signInWithEmailAndPassword(email, pw); }
function fpSignOut(){ return fpAuth.signOut(); }

/* Header auth state: swap Log in/Sign up for user email + Log out */
document.addEventListener('DOMContentLoaded', function(){
  fpOnAuth(function(user){
    var loginBtn = document.querySelector('.btn-login');
    var signupBtn = document.querySelector('.btn-sm-hd');
    if(!loginBtn || !signupBtn) return;
    if(user){
      loginBtn.textContent = user.email || 'Account';
      loginBtn.href = '#';
      loginBtn.onclick = function(e){ e.preventDefault(); };
      signupBtn.textContent = 'Log out';
      signupBtn.href = '#';
      signupBtn.onclick = function(e){ e.preventDefault(); fpSignOut().then(function(){ location.reload(); }); };
    }
  });
});
