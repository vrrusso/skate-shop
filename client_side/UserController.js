/**
 * This script is responsible for the communications with the User table in the DB
 * 
 * For now, we got no BD, so it justs simulates interaction with the BD
 */




var createUser = function(name,mail,phone,birth,cpf,address,cep,city,state,base,password){



    return true
}


class User {
    constructor(email, password,name,id,tel,birthday,cpf,adress,cep,city,state,base) {
        this.email = email
        this.password = password 
        this.name = name
        this.id = id 
        this.tel = tel
        this.birthday = birthday
        this.cpf = cpf
        this.address = adress
        this.cep = cep
        this.city = city
        this.state = state
        this.base = base
    }
}



const regular_user = new User('victor@russo.com','senha123','Victor Russo','2','(99)9999-99999','2000-12-21','666.666.666-66','Rua da USP,19-19','99999-9','São Carlos','SP','Goofy')

const admin_user = new User('admin@skate.com','admin','Fabricio Hiromoto Chaves','1','(88)8888-88888','1976-04-22','333.333.333-33','Rua Ari Totti','99999-9','Canitar','SP','Regular')



var checkAuth = function(email,password){
    if(email == regular_user.email && password == regular_user.password){
        return 'user'
    }

    if(email == admin_user.email && password == admin_user.password){
            return 'adm'
    }

    return 'guest'
}

var getUserFromCurrentSession = function(){
    if(localStorage.userId == '2')
        return regular_user
    if(localStorage.userId == '1')
        return admin_user
}

export { createUser, checkAuth, User,getUserFromCurrentSession}