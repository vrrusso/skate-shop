import  {createUser} from './UserController.js'



document.getElementById("btn-submit-register").addEventListener("click",registerUser)



async function registerUser(event){

    //fazer consistências

    event.preventDefault()
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
    const password = document.getElementById('password').value

    

    let is_successful =  createUser(name,mail,phone,birth,cpf,address,cep,city,state,base,password)

    if(is_successful){
        alert("Conta Criada com Sucesso!")
        window.location.replace("./index.html")
    }
    else{
        alert("Falha ao criar conta! Tente novamente!")
    }


}