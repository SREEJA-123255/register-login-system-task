const API = "http://localhost:5000";

function register(){

    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        password: document.getElementById("password").value
    };

    if(!user.name || !user.email || !user.mobile || !user.password){
        
    document.getElementById("msg").innerHTML = "Please fill all fields!";
    return;
    }


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

        if(result.message == "Registration Successful Please Login"){
            localStorage.setItem("registered", "true");
            window.location = "login.html";
        }

    })

    .catch(function(error){
        document.getElementById("msg").innerHTML = "Server error, try again!";

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

    })

    .catch(function(error){
        document.getElementById("msg").innerHTML = "Server error, try again!";

    });

}

function logout(){

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("registered");
    window.location.href = "login.html";

}