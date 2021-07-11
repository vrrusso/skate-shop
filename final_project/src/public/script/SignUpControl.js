/**
 * This script controls the sign up action by the user
 * 
 *  
 * 
 */



import  {createUser} from './UserController.js'






/**
 * 
 *gets the user input, make consistencies checks and request the api to create the User on the DB
 */
var  registerUser = function(){

    //fazer consistências
    const name = document.getElementById('name').value
    const mail = document.getElementById('mail').value
    const phone = document.getElementById('phone').value
    const birth = document.getElementById('birth').value
    const cpf = document.getElementById('cpf').value
    const address = document.getElementById('address').value
    const cep = document.getElementById('cep').value
    const city = document.getElementById('city').value
    const state = document.getElementById('state').value
    const base = document.getElementById('base').value
    const password = document.getElementById('pass').value
    const repassword = document.getElementById('repass').value

    

    let is_successful =  createUser(name,mail,phone,birth,cpf,address,cep,city,state,base,password,repassword)

    if(is_successful == 0){
        alert("Conta Criada com Sucesso!")
        window.location.replace("./index.html")
    }
    else if(is_successful == -1){
        alert("Preencha todos os campos!")
    }
    else{
        alert("Falha ao criar conta! Tente novamente!")
    }


}

export {registerUser}
