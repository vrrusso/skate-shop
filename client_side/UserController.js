/**
 * This script is responsible for the communications with the User table in the DB
 * 
 * For now, we got no BD, so it justs simulates interaction with the BD
 */




var createUser = function(name,mail,phone,birth,cpf,address,cep,city,state,base,password){



    return true
}




const user_mail = 'victor@russo.com'
const user_pswd = 'senha123'

const admin_mail = 'admin@skate.com'
const admin_pswd = 'admin'


var checkAuth = function(email,password){
    if(email == user_mail){
        if(password == user_pswd)
            return 'user'
    }

    if(email == admin_mail){
        if(password == admin_pswd)
            return 'adm'
    }

    return 'guest'
}

export { createUser,checkAuth}