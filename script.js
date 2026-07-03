const API_URL = "https://flows-wrote-judge-mileage.trycloudflare.com";

// ======================
// REGISTER
// ======================
function register() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    if(name=="" || email=="" || password==""){
        alert("Semua data wajib diisi!");
        return;
    }

    fetch(API_URL + "/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            email:email,
            password:password
        })
    })
    .then(async response=>{

        let data=await response.json();

        console.log(data);

        if(data.status=="success"){
            alert("Register berhasil");
            window.location.href="login.html";
        }else{
            alert(data.message);
        }

    })
    .catch(error=>{
        console.error(error);
        alert("Tidak bisa terhubung ke server!");
    });

}


// ======================
// LOGIN
// ======================
function login(){

    let email=document.getElementById("email").value.trim();
    let password=document.getElementById("password").value;

    if(email=="" || password==""){
        alert("Email dan Password wajib diisi");
        return;
    }

    fetch(API_URL+"/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email:email,
            password:password

        })

    })

    .then(async response=>{

        let data=await response.json();

        console.log(data);

        if(data.status=="success"){

            localStorage.setItem("user",JSON.stringify(data));

            window.location.href="index.html";

        }else{

            alert("Email atau Password salah");

        }

    })

    .catch(error=>{

        console.error(error);

        alert("Server tidak dapat dihubungi");

    });

}



// ======================
// LOAD DASHBOARD
// ======================
window.onload=function(){

    let nama=document.getElementById("nama");
    let saldo=document.getElementById("saldo");

    if(!nama || !saldo){
        return;
    }

    let user=JSON.parse(localStorage.getItem("user"));

    if(!user){

        window.location.href="login.html";
        return;

    }

    nama.innerHTML=user.name;

    refreshSaldo();

    setInterval(refreshSaldo,5000);

}


// ======================
// LOGOUT
// ======================
function logout(){

    localStorage.removeItem("user");

    window.location.href="login.html";

}
