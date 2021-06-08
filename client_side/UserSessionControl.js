
/**
 * This script controls the auth session of the user.
 * 
 *  
 * 
 */


//awaits for the DOM to be loaded

import {checkAuth} from './UserController.js'

document.addEventListener('DOMContentLoaded', checkUser )

if(document.getElementById('btn-submit-login') != null)
    document.getElementById('btn-submit-login').addEventListener('click', login)

if(document.getElementById('logout-link') != null)
    document.getElementById('logout-link').addEventListener('click', logout)


function login(){
    const email = document.getElementById('email-login').value
    const password = document.getElementById('password').value

    
    if(email.includes('@') && email.includes('.')){
        let auth = checkAuth(email, password)
        console.log(auth)
        if(auth == 'user'){
            localStorage.setItem('privilege','1')
            window.location.replace("./index.html")
            
        }
        else if(auth == 'adm'){
            localStorage.setItem('privilege','0')
            window.location.replace("./index.html")
        }
        else{
            alert("Email ou Senha incorreto!")
        }

    }
}


function logout(){
    alert("Obrigado por comprar em nossa loja! ")
    localStorage.removeItem('privilege')
    window.location.replace("./index.html")

}

//controls the links on the header of each page
function checkUser( ){

    


    let user  = localStorage.privilege == undefined ? -1: localStorage.privilege

    let profile_link = document.getElementById("profile-link")
    let cart_link = document.getElementById("cart-link")

    switch(user){

        //admin
        case '0':
            profile_link.innerHTML = "Perfil"
            profile_link.href = "user.html"
            cart_link.innerHTML = "Novo Produto"
            cart_link.href ="new_product.html"
            break;
        //user
        case '1':
            profile_link.innerHTML = "Perfil"
            profile_link.href = "user.html"
            cart_link.innerHTML = "Carrinho"
            cart_link.href ="cart.html"
            break;
        //guest
        default:
            profile_link.innerHTML = "Login"
            profile_link.href = "login.html"
            cart_link.innerHTML = "Carrinho"
            cart_link.href ="cart.html"

    }
}