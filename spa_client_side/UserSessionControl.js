
/**
 * This script controls the auth session of the user.
 * 
 *  
 * 
 */


//awaits for the DOM to be loaded

import {checkAuth,User,getUserFromCurrentSession} from './UserController.js'

document.addEventListener('DOMContentLoaded', checkUser )













/**
 * if a guest wants to end a purchase, the guest will be redirected to the sign in/up screen
 */
if(document.getElementById('conclude-purchase-link') != null){
    let user  = localStorage.privilege == undefined ? -1: localStorage.privilege
    switch(user){
        //admin
        case '0':
            break;
        //user
        case '1':
            document.getElementById('conclude-purchase-link').href = "./payment.html"
            break;
        //guest
        default:
            document.getElementById('conclude-purchase-link').href = "./login.html"
    }
}

if(document.getElementById('purchase-info-form')!=null){
    document.addEventListener('DOMContentLoaded', displayUserAdress)
}


/**
 * based on the current user, displays the data on the form
 */
var displayUserDataForm = function(){
    let user = getUserFromCurrentSession()
    document.getElementById('user-name-input').value = user.name
    document.getElementById('user-email-input').value = user.email
    document.getElementById('user-tel-input').value = user.tel
    document.getElementById('user-birthday-input').value = user.birthday
    document.getElementById('user-cpf-input').value = user.cpf
    document.getElementById('user-address-input').value = user.address
    document.getElementById('user-cep-input').value = user.cep
    document.getElementById('user-city-input').value = user.city
    document.getElementById('user-state-input').value = user.state
    if(user.base == "Regular")
        document.getElementById("user-base-select").selectedIndex = "0"
    else
        document.getElementById("user-base-select").selectedIndex = "1"  
}

/**
 * based on the current user display the data in static fields
 */
function displayUserData(){


    let user = getUserFromCurrentSession()
    document.getElementById('user-name-span').innerHTML = user.name
    document.getElementById('user-email-span').innerHTML = user.email
    document.getElementById('user-tel-span').innerHTML = user.tel
    document.getElementById('user-birthday-span').innerHTML = user.birthday
    document.getElementById('user-cpf-span').innerHTML = user.cpf
    document.getElementById('user-address-span').innerHTML = user.address
    document.getElementById('user-cep-span').innerHTML = user.cep
    document.getElementById('user-city-span').innerHTML = user.city
    document.getElementById('user-state-span').innerHTML = user.state
    document.getElementById('user-base-span').innerHTML = user.base
    document.getElementById('profile-img-user').src = user.img_path
    
}

/**
 * controls the login 
 */
var login = function(){
    const email = document.getElementById('email-login').value
    const password = document.getElementById('password').value

    
    if(email.includes('@') && email.includes('.')){
        let auth = checkAuth(email, password)
        console.log(auth)
        if(auth == 'user'){
            localStorage.setItem('privilege','1')
            localStorage.setItem('userId','2')
            window.location.replace("./index.html")
            
        }
        else if(auth == 'adm'){
            localStorage.setItem('privilege','0')
            localStorage.setItem('userId','1')
            window.location.replace("./index.html")
        }
        else{
            alert("Email ou Senha incorreto!")
        }

    }
}

/**
 * make a logout
 */
var logout = function(){
    alert("Obrigado por comprar em nossa loja! ")
    localStorage.removeItem('privilege')
    localStorage.removeItem('userId')
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
            profile_link.href = "#"
            cart_link.innerHTML = "Novo Produto"
            cart_link.href ="#"
            break;
        //user
        case '1':
            profile_link.innerHTML = "Perfil"
            profile_link.href = "#"
            cart_link.innerHTML = "Carrinho"
            cart_link.href ="#"
            break;
        //guest
        default:
            profile_link.innerHTML = "Login"
            profile_link.href = "#"
            cart_link.innerHTML = "Carrinho"
            cart_link.href ="#"

    }
}

/**
 * displayUserAdress
 */
var displayUserAdress = function(){
    let user = getUserFromCurrentSession()
    document.getElementById('adress-input').innerHTML = '<input type="radio" name="address" id="adress-radio-option" value="'+user.address+','+user.city+','+user.cep+'" checked><label for="1">'+user.address+','+user.city+','+user.cep+'</label><br>'
}


export {logout,login,displayUserData,displayUserAdress,displayUserDataForm}