function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = {
    name: name,
    email: email,
    password: password,
    saldo: 0
  };

  localStorage.setItem(email, JSON.stringify(user));

  alert("Register berhasil!");
  window.location.href = "login.html";
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    localStorage.setItem("login", email);
    window.location.href = "index.html";
  } else {
    alert("Login gagal!");
  }
}

function loadUser() {
  let email = localStorage.getItem("login");
  let user = JSON.parse(localStorage.getItem(email));

  if (!user) return;

  document.getElementById("user").innerText = "Halo, " + user.name;
  document.getElementById("saldo").innerText = user.saldo;
}

function logout() {
  localStorage.removeItem("login");
  window.location.href = "login.html";
}

window.onload = loadUser;
