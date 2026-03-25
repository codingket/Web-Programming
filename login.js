import { createClient } from 'https://esm.sh/@supabase/supabase-js'

// 🔐 YOUR SUPABASE CONFIG
const supabase = createClient(
  'https://mngbpkjqpvthlwvfqoxj.supabase.co',
  'sb_publishable_LUAMQ3Utexf4O_qfvoOZXg_gsleCbuY'
)

// ================= SIGN UP =================
async function signup(event){
  event.preventDefault();

  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const errorBox = document.getElementById("signup-error");
  const successBox = document.getElementById("signup-success");

  errorBox.innerText = "";
  successBox.innerText = "";

  if(password.length < 8){
    errorBox.innerText = "Password must be at least 8 characters";
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: username }
    }
  });

  if(error){
    errorBox.innerText = error.message;
  } else {
    successBox.innerText = "Account created! Check your email.";
  }
}

// ================= SIGN IN =================
async function signIn(event){
  event.preventDefault();

  const email = document.getElementById('signIn-email').value;
  const password = document.getElementById('signIn-password').value;

  const errorBox = document.getElementById("login-error");
  errorBox.innerText = "";

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if(error){
    errorBox.innerText = error.message;
  } else {
    window.location.href = "index.html";
  }
}

// ================= SIGN OUT =================
async function signOut(){
  await supabase.auth.signOut();
  window.location.reload();
}

// ================= EVENT LISTENERS =================
document.getElementById("sign-up")?.addEventListener("submit", signup);
document.getElementById("sign-in")?.addEventListener("submit", signIn);
