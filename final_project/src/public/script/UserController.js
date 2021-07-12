/**
 * This script is responsible for the communications with the User table in the DB
 * 
 * For now, we got no BD, so it justs simulates interaction with the BD
 */



/**
 *  mockup function that returns true if the user is created
 */
var createUser = async function(name,mail,phone,birth,cpf,address,cep,city,state,base,password, repassword){
    if(name == "" || mail == "" || phone == "" || birth == "" || cpf == "" || address == "" || 
	    cep == "" || city == "" || state == "" || base == "" || password == "" || repassword == ""){
         return -1;
    }
    let resp = await fetch("http://localhost:3000/user/",{
                method:'POST',
                mode: 'cors',
                cache:'no-cache',
                credentials:'same-origin',
                headers:{
                  'Content-Type':'application/json'
                },
                redirect:'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                  name:name,
                  mail:mail,
                  phone:phone,
                  birth:birth,
                  cpf:cpf,
                  address: address,
                  cep:cep,
                  city:city,
                  state:state,
                  base:base,
                  password:password,
                  img_path: './img/russo.jpg'

                })
              })
    resp = await resp.json()
    return resp
}


/**
 * the class that represents the user 
 */
class User {
    constructor(email, password,name,id,tel,birthday,cpf,adress,cep,city,state,base,img_path) {
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
        this.img_path = img_path
    }
}



/**
 * a mockup common user, and admin user
 */
const regular_user = new User('victor@russo.com','senha123','Victor Russo','2','(99)9999-99999','2000-12-21','666.666.666-66','Rua da USP,19-19','99999-9','São Carlos','SP','Goofy','./img/russo.jpg')

const admin_user = new User('admin@skate.com','admin','Fabricio Hiromoto Chaves','1','(88)8888-88888','1976-04-22','333.333.333-33','Rua Ari Totti','99999-9','Canitar','SP','Regular','./img/hiro.jpg')



/**
 * 
 * check if the user exists and if so,if it is a common user or admin user
 */
var checkAuth = function(email,password){
    if(email == regular_user.email && password == regular_user.password){
       return 'user'
    }

    if(email == admin_user.email && password == admin_user.password){
            return 'adm'
    }

    return 'guest'
}

/**
 * checks if the logged in user is admin or common
 * 
 */
var getUserFromCurrentSession = function(){
    if(localStorage.userId == '2')
        return regular_user
    if(localStorage.userId == '1')
        return admin_user
}

export { createUser, checkAuth, User,getUserFromCurrentSession}
