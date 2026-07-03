const API_URL = "https://respect-digit-divine-native.trycloudflare.com";

// =====================
// REGISTER
// =====================
function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  fetch(API_URL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      alert("Register berhasil!");
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }
  });
}

// =====================
// LOGIN
// =====================
function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  fetch(API_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "index.html";
    } else {
      alert("Login gagal!");
    }
  });
}

// =====================
// LOAD DASHBOARD
// =====================
window.onload = function () {
  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) return;

  document.getElementById("nama").innerText = user.name;
  document.getElementById("saldo").innerText = user.saldo;
}
