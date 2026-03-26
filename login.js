import { createClient } from 'https://esm.sh/@supabase/supabase-js'

let currentUser = null;

const supabase = createClient(
  'https://mngbpkiqpvtflhwfqoxj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZ2Jwa2lxcHZ0Zmxod2Zxb3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTYwOTMsImV4cCI6MjA5MDAzMjA5M30.q6CraKNW5obBpt3c8ZB1fEirVVVrstODFhTbIgKzSO0'
)

// ================= CHECK SESSION ON LOAD =================
async function checkUser() {
  const { data } = await supabase.auth.getSession();
  console.log("SESSION CHECK:", data);

  const login_link = document.getElementById('login-link');
  const signup_link = document.getElementById('signup-link');
  const logout_btn = document.getElementById('logout-btn');

  if(data.session){
    const user = data.session.user;
    const name = user.user_metadata?.display_name || "Profile";

    if(login_link){
      login_link.innerText = name;
      login_link.href = "#";
    }

    if(signup_link){
      signup_link.style.display = "none";
    }

    if(logout_btn){
      logout_btn.style.display = "inline-block";
    }
  }
}

// run on page load
window.addEventListener("DOMContentLoaded", () => {
  checkUser();
});

// ================= AUTH STATE =================
supabase.auth.onAuthStateChange((event, session) => {
  const login_link = document.getElementById('login-link');
  const signup_link = document.getElementById('signup-link');
  const logout_btn = document.getElementById('logout-btn');
  
  if(session){
    currentUser = session.user;

    const name = currentUser.user_metadata?.display_name || "Profile";

    // show username
    if(login_link){
      login_link.innerText = name;
      login_link.href = "#";
    }

    // hide signup
    if(signup_link){
      signup_link.style.display = "none";
    }

    // show logout
    if(logout_btn){
      logout_btn.style.display = "inline-block";
    }

  } else {
    currentUser = null;

    // reset login
    if(login_link){
      login_link.innerText = "Login";
      login_link.href = "login.html";
    }

    // show signup again
    if(signup_link){
      signup_link.style.display = "inline-block";
    }

    // hide logout
    if(logout_btn){
      logout_btn.style.display = "none";
    }
  }
});

// ================= SIGN UP =================
async function signup(event){
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if(password.length < 6){
    alert("Password must be at least 6 characters");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { 
      data : { display_name: username } 
    }
  });

  console.log("SIGNUP:", data, error);

  if(error){
    alert(error.message);
  }
  else {
    localStorage.setItem("username", username);

    alert("Account created! Redirecting...");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }
}

// ================= SIGN IN =================
async function signIn(event) {
  event.preventDefault();

  const email = document.getElementById('signIn-email').value;
  const password = document.getElementById('signIn-password').value;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("LOGIN:", data, error);

  if(error){
    alert(error.message);
  }
  else {
    const name = data.user.user_metadata?.display_name;

    if(name){
      localStorage.setItem("username", name);
    } else {
      localStorage.setItem("username", email.split("@")[0]);
    }

    window.location.href = "index.html"; 
  }
}

// ================= SIGN OUT =================
async function signout(){
  const { error } = await supabase.auth.signOut();

  if(error){
    alert(error.message);
  } else {
    window.location.reload(); 
  }
}

// ================= EVENTS =================
document.getElementById("sign-up")?.addEventListener('submit', signup);
document.getElementById("sign-in")?.addEventListener('submit', signIn);
document.getElementById("logout-btn")?.addEventListener('click', signout);
