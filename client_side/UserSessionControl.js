
/**
 * This script controls the auth session of the user.
 * 
 *  
 * 
 */


//awaits for the DOM to be loaded
document.addEventListener('DOMContentLoaded', checkUser )


//controls the links on the header of each page
function checkUser( ){


    let user = -1

    let profile_link = document.getElementById("profile-link")
    let cart_link = document.getElementById("cart-link")

    switch(user){

        //admin
        case 0:
            profile_link.innerHTML = "Perfil"
            profile_link.href = "user.html"
            cart_link.innerHTML = "Novo Produto"
            cart_link.href ="new_product.html"
            break;
        //user
        case 1:
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