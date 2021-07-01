
import {logout,login,displayUserData} from './UserSessionControl.js'
import {registerUser} from './SignUpControl.js'
import {displayProductsByType,displayProductsByName} from './ProductDisplayControl.js'


document.getElementById("profile-link").addEventListener('click', displayProfilePage)
document.getElementById("index-link").addEventListener('click',displayIndexPage)
document.getElementById('about-link').addEventListener('click',displayAboutPage)
document.getElementById('shape-drawer-link').addEventListener('click',displayShapeDrawerPage)

document.getElementById('completo-link').addEventListener('click',()=>{ displayProductsPage("type","completo") })
document.getElementById('shape-link').addEventListener('click',()=>{ displayProductsPage("type","shape") })
document.getElementById('truck-link').addEventListener('click',()=>{ displayProductsPage("type","truck") })
document.getElementById('roda-link').addEventListener('click',()=>{ displayProductsPage("type","roda") })

document.getElementById('completo-body-link').addEventListener('click',()=>{ displayProductsPage("type","completo") })
document.getElementById('shape-body-link').addEventListener('click',()=>{ displayProductsPage("type","shape") })
document.getElementById('truck-body-link').addEventListener('click',()=>{ displayProductsPage("type","truck") })
document.getElementById('roda-body-link').addEventListener('click',()=>{ displayProductsPage("type","roda") })

document.getElementById('btn-search').addEventListener('click', ()=>{displayProductsPage('name',document.getElementById('search-input').value)} )


document.getElementById('cart-link').addEventListener('click', displayCartPage)

var current_state = "index"

const active_color = "#BA0303"
const inactive_color = "#767676"


function displayProfilePage(){
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("profile-link").style.color = active_color
    current_state = "profile"

    let user  = localStorage.privilege == undefined ? "-1": localStorage.privilege


    switch (user){
        //guest
        case '-1':
            document.getElementById('main-container').innerHTML = '<div class="profile-canvas">'+
            '<div class="profile-infos">'+
              '<div class="form-container">'+
                '<form class="form-user" onsubmit="return false;">'+
                  '<div class="form-container-right">Email:</div><div class="form-container-right"><input id="email-login" type="email"></div>'+
                  '<div class="form-container-right">Senha:</div><div class="form-container-right"><input id="password" type="password"></div>'+
                  '<div class="form-container-right"><button class="btn search" id="btn-submit-login">Login</button></div><div class="form-container-right"></div>'+
                  '<div class="form-container-right"><a href="#" class="central-link">Recuperar Senha</a></div>'+
                '</form>'+

              '</div>'+
               
            '</div>'+
            '<div class="profile-img">'+
              '<form class="form-user">'+
              '<div class="form-container" onsubmit="return false;">'+
                '<div class="form-container-right">Nome:</div><div class="form-container-right"><input type="text" id="name"></div>'+
                '<div class="form-container-right">Email:</div><div class="form-container-right"><input type="text" id="mail"></div>'+
                '<div class="form-container-right">Telefone:</div><div class="form-container-right"><input  type="tel" id="phone"></div>'+
                '<div class="form-container-right">Nascimento:</div><div class="form-container-right"><input type="date" id="birth"></div>'+
                '<div class="form-container-right">CPF:</div><div class="form-container-right"><input type="text" id="cpf"></div>'+
                '<div class="form-container-right">Endereço:</div><div class="form-container-right"><input type="text" id="address"></div>'+
                '<div class="form-container-right">CEP:</div><div class="form-container-right"><input type="text" id="cep"></div>'+
                '<div class="form-container-right">Cidade:</div><div class="form-container-right"><input type="text" id="city"></div>'+
                '<div class="form-container-right">Estado:</div><div class="form-container-right"><input type="text" id="state"></div>'+
                '<div class="form-container-right">Base:</div><div class="form-container-right"><select id="base"><option value="regular">Regular</option><option value="goofy" selected="selected">Goofy</option></select></div>'+
                '<div class="form-container-right">Senha:</div><div class="form-container-right"><input type="password" id="password"></div>'+
                '<div class="form-container-right">Repetir Senha:</div><div class="form-container-right"><input type="password"></div>'+
                  '<div class="form-container-right"><button id="btn-submit-register" class="btn search">Registrar</button></div>'+

              '</ul>'+
              '</div>'+
              '</form>'+
            '</div>'+
        '</div>';

        document.getElementById('btn-submit-login').addEventListener('click', login)

        //click event to the submit button
        document.getElementById("btn-submit-register").addEventListener("click",registerUser)
        
            
        break;
        default:
            document.getElementById('main-container').innerHTML = '<div class="profile-canvas">'+
            '<div class="profile-infos">'+
                '<ul>'+
                    '<li>Nome: <span id = "user-name-span"></span></li>'+
                    '<li>Email:  <span id = "user-email-span"></span></li>'+
                    '<li>Telefone: <span id = "user-tel-span"></span></li>'+
                    '<li>Nascimento: <span id = "user-birthday-span"></span></li>'+
                    '<li>CPF: <span id = "user-cpf-span"></span></li>'+
                    '<li>Endereço: <span id = "user-address-span"></span></li>'+
                    '<li>CEP: <span id = "user-cep-span"></span></li>'+
                    '<li>Cidade: <span id = "user-city-span"></span></li>'+
                    '<li>Estado: <span id = "user-state-span"></span></li>'+
                    '<li>Base: <span id = "user-base-span"></span></li>'+
                '</ul>'+
                '<a href="#" class="central-link-white">Alterar Dados</a>'+
                '<a href="#" id="logout-link" class="central-link-white">Logout</a>'+
            '</div>'+
            '<div class="profile-img">'+
                '<img id="profile-img-user" width="400">'+
            '</div>'+
        '</div>';
        document.getElementById('logout-link').addEventListener('click',logout)
        displayUserData()

        break;
    }
}


function displayIndexPage(){
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("index-link").style.color = active_color
    current_state = "index"

    document.getElementById('main-container').innerHTML = `<div class="central">
    <div class="central-title">
        <h3 class="central-text-title">Skates Completos</h3>
    </div>
    <div class="central-container">
        <div class="central-anchor-left">
          <div class="central-container-text">
              <p style="color:#FF7700;">Os melhores skates montados para iniciantes e amadores!</p>

          </div>
          <div class="central-container-footer">
              <a href="#" id="completo-body-link" class="central-link">Veja mais</a>
          
          </div>

        </div>
      
      <div class="central-container-img">
          <img src="img/sk8.png" width="180px">
      </div>
      
    </div>
    

</div>
<div class="central">
  <div class="central-title">
      <h3 class="central-text-title">Shapes</h3>
  </div>
  <div class="central-container">
      <div class="central-anchor-left">
        <div class="central-container-text">
          <p style="color:#FF7700;">Shapes de marfin e mapple para o seu rolê!</p>
        </div>
        <div class="central-container-footer">
            <a href="#" id="shape-body-link" class="central-link">Veja mais</a>
        
        </div>

      </div>
    
    <div class="central-container-img">
        <img src="img/shape.jpg" width="180px">
    </div>
    
  </div>
  

</div>
<div class="central">
  <div class="central-title">
      <h3 class="central-text-title">Trucks</h3>
  </div>
  <div class="central-container">
      <div class="central-anchor-left">
        <div class="central-container-text">
          <p style="color:#FF7700;">Trucks indestrutíveis para garantir aquele grind!</p>
        </div>
        <div class="central-container-footer">
            <a href="#" id="truck-body-link" class="central-link">Veja mais</a>
        
        </div>

      </div>
    
    <div class="central-container-img">
        <img src="img/truck.png" width="180px">
    </div>
    
  </div>
</div>
<div class="central">
  <div class="central-title">
      <h3 class="central-text-title">Rodas e Rolamentos</h3>
  </div>
  <div class="central-container">
      <div class="central-anchor-left">
        <div class="central-container-text">
          <p style="color:#FF7700;">Rodas e rolamentos para transformar seu skate numa nave sobre rodas!</p>

        </div>
        <div class="central-container-footer">
            <a href="#" id="roda-body-link" class="central-link">Veja mais</a>
        
        </div>

      </div>
    
    <div class="central-container-img">
        <img src="img/roda.png" width="180px">
    </div>
    
  </div>
  

</div>`;

    document.getElementById('completo-body-link').addEventListener('click',()=>{ displayProductsPage("type","completo") })
    document.getElementById('shape-body-link').addEventListener('click',()=>{ displayProductsPage("type","shape") })
    document.getElementById('truck-body-link').addEventListener('click',()=>{ displayProductsPage("type","truck") })
    document.getElementById('roda-body-link').addEventListener('click',()=>{ displayProductsPage("type","roda") })

}



function displayAboutPage(){
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("about-link").style.color = active_color
    current_state = "about"

    document.getElementById("main-container").innerHTML = `<div class="central">
    <div class="central-title">
        <h3 class="central-text-title">Caio Chaves</h3>
    </div>
    <div class="central-container">
        <div class="central-anchor-left">
          <div class="central-container-text">
              <p></p>

          </div>
          <div class="central-container-footer">
              
          
          </div>

        </div>
      
      <div class="central-container-img">
          <img src="img/caio.jpg" width="180px">
      </div>
      
    </div>
    

</div>
<div class="central">
  <div class="central-title">
      <h3 class="central-text-title">Guilherme Hiromoto</h3>
  </div>
  <div class="central-container">
      <div class="central-anchor-left">
        <div class="central-container-text">
            <p></p>

        </div>
        <div class="central-container-footer">
            
        
        </div>

      </div>
    
    <div class="central-container-img">
        <img src="img/hiro.jpg" width="180px">
    </div>
    
  </div>
</div>
<div class="central">
  <div class="central-title">
      <h3 class="central-text-title">Victor Russo</h3>
  </div>
  <div class="central-container">
      <div class="central-anchor-left">
        <div class="central-container-text">
            <p></p>

        </div>
        <div class="central-container-footer">
            
        
        </div>

      </div>
    
    <div class="central-container-img">
        <img src="img/russo.jpg" width="180px">
    </div>
    
  </div>
</div>`;

}


function displayShapeDrawerPage(){
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("shape-drawer-link").style.color = active_color
    current_state = "shape-drawer"

    document.getElementById("main-container").innerHTML = `<div class="profile-canvas">
    <div class="shape">
    </div>
    <button style="margin:auto;" class="btn search">Download</button>
    <button class="btn search">Encomendar Shape</button>
</div>`;

}


var displayProductsPage = function(query_field, filter){
    if(query_field == "type"){
        document.getElementById(current_state+"-link").style.color = inactive_color
        document.getElementById(filter+"-link").style.color = active_color
        current_state = filter
        document.getElementById("main-container").innerHTML = ""
        displayProductsByType(filter)
    }
    if(query_field == "name"){
        document.getElementById("main-container").innerHTML = ""
        displayProductsByName(filter)
    }

    
}


function displayCartPage(){
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("cart-link").style.color = active_color
    current_state = "cart"
    let user  = localStorage.privilege == undefined ? "-1": localStorage.privilege

    switch(user){
        /*admin*/
        case '0':
            document.getElementById('main-container').innerHTML = `<div class="profile-canvas">
            <div class="profile-infos">
                <form onsubmit="return false;" class="form-user">
                <div class="form-container">
                    <div class="form-container-right">Preço:</div><div class="form-container-right"><input value="20" step="0.5" type="number"></div>
                    <div class="form-container-right">Nome:</div><div class="form-container-right"><input  type="text"></div>
                    <div class="form-container-right">Marca:</div><div class="form-container-right"><input  type="text"></div>
                    <div class="form-container-right">Tipo</div><div class="form-container-right"><select name="select">
                        <option value="sk8">Skate Completo</option>
                        <option value="shape" selected>Shape</option>
                        <option value="truck">Truck</option>
                        <option value="rodas">Rodas e Rolamentos</option>
                      </select></div>
                    <div class="form-container-right">Tamanho:</div><div class="form-container-right"><input type="number" value="8.0" step="0.2"></div>
                    <div class="form-container-right">Cor:</div><div class="form-container-right"><select name="select">
                        <option value="Verde"selected>Verde</option>
                        <option value="Preto">Preto</option>
                        <option value="Azul">Azul</option>
                      </select></div>
                    <div class="form-container-right">Qtde. em Estoque:</div><div class="form-container-right"><input value="100" type="number"></div>
                    <div class="form-container-right">Descrição:</div>
                    <div class="form-container-right"><textarea placeholder="Pequena descrição Textual" rows="5" cols="40"></textarea></div>
                    <div class="form-container-right"><button id="btn-cadastrar" class="btn search">Cadastrar</button></div>

                </ul>
                </div>
                </form>
            </div>
            <div class="profile-img">
            </div>
        </div>`
        document.getElementById("btn-cadastrar").addEventListener('click', ()=>{ alert("Produto Cadastrado com Sucesso"); displayIndexPage() })
        break;
    }
}

export {displayProductsPage}

