const API = "http://localhost:5000";

function register(){

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        password: document.getElementById("password").value
    };


    fetch(API + "/register", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)

    })

    .then(function(response){
        return response.json();

    })

    .then(function(result){
        document.getElementById("msg").innerHTML = result.message;

    });

}

function login(){

    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };


    fetch(API + "/login",{

        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(user)

    })


    .then(function(response){
        return response.json();

    })


    .then(function(result){
        if(result.message == "Login Successful"){
            localStorage.setItem("loggedIn", "true");
            window.location="home.html";

        }

        else{
            document.getElementById("msg").innerHTML =
            result.message;
        }

    });

}

function logout(){

    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";

}