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
var  registerUser = async function(){

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

    if(name.trim() == '' ){
        alert("O campo nome deve ser preenchido!")
        return
    }

    if(mail.trim() == '' ){
        alert("O campo email deve ser preenchido!")
        return
    }

    if(!mail.includes('@') || !mail.includes('.') ){
        alert("Preencha um email válido!")
        return
    }

    if(phone.trim() == '' ){
        alert("O campo telefone deve ser preenchido!")
        return
    }

    if(birth.trim() == '' ){
        alert("O campo data de nascimento deve ser preenchido!")
        return
    }

    if(parseInt(birth.substring(0,4)) > 2007){
        alert("O ano de nascimento deve ser anterior a 2008")
        return
    }

    if(cpf.trim() == '' ){
        alert("O campo cpf deve ser preenchido!")
        return
    }

    if(address.trim() == '' ){
        alert("O campo endereço deve ser preenchido!")
        return
    }

    if(cep.trim() == '' ){
        alert("O campo cep deve ser preenchido!")
        return
    }

    if(city.trim() == '' ){
        alert("O campo cidade deve ser preenchido!")
        return
    }

    if(state.trim() == '' ){
        alert("O campo estado deve ser preenchido!")
        return
    }

    if(password.length < 6 || password.length > 12 ){
        alert("A deve ter entre 6 e 12 caracteres!")
        return
    }


    if(password != repassword){
        alert("As senhas não estão iguais!")
        return
    }



    

    let is_successful =  await createUser(name,mail,phone,birth,cpf,address,cep,city,state,base,password,repassword)
    if(is_successful.status == 400){
        is_successful = await is_successful.json()
        alert("Esse email já foi cadastrado")
    }
    else if(is_successful.status == 201){
        is_successful = await is_successful.json()
        alert(is_successful.message)
    }


}

export {registerUser}
