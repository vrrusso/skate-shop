/**
 *  this script controls the routing of the application. 
 *  The behaviour of the pages obtained from the index are described there.
 *  This makes the SPA possible.
 * 
 * 
 */



/**
 * some imports
 */
import {logout,login,displayUserData,displayUserAdress,displayUserDataForm} from './UserSessionControl.js'
import {registerUser} from './SignUpControl.js'
import {displayProductsByType,displayProductsByName} from './ProductDisplayControl.js'
import {displayProductsCart} from './CartDisplayControl.js'



/**
 * link to the profile/login page
 */
document.getElementById("profile-link").addEventListener('click', displayProfilePage)

/**
 * link to the main page
 */
document.getElementById("index-link").addEventListener('click',displayIndexPage)

/**
 * link to the about page
 */
document.getElementById('about-link').addEventListener('click',displayAboutPage)


/**
 * link to the shape drawer page
 */
document.getElementById('shape-drawer-link').addEventListener('click',displayShapeDrawerPage)

/**
 * these are the header links to the product page, each one with a differente filter by type
 */
document.getElementById('completo-link').addEventListener('click',()=>{ displayProductsPage("type","completo") })
document.getElementById('shape-link').addEventListener('click',()=>{ displayProductsPage("type","shape") })
document.getElementById('truck-link').addEventListener('click',()=>{ displayProductsPage("type","truck") })
document.getElementById('roda-link').addEventListener('click',()=>{ displayProductsPage("type","roda") })


/**
 * these are the body links on the index to the product page, each one with a differente filter by type
 */
document.getElementById('completo-body-link').addEventListener('click',()=>{ displayProductsPage("type","completo") })
document.getElementById('shape-body-link').addEventListener('click',()=>{ displayProductsPage("type","shape") })
document.getElementById('truck-body-link').addEventListener('click',()=>{ displayProductsPage("type","truck") })
document.getElementById('roda-body-link').addEventListener('click',()=>{ displayProductsPage("type","roda") })


/**
 * the action for the search button, display the product pages filtered by name
 */
document.getElementById('btn-search').addEventListener('click', ()=>{displayProductsPage('name',document.getElementById('search-input').value)} )


/**
 * link to the cart page
 */
document.getElementById('cart-link').addEventListener('click', ()=>{displayCartPage()})


/**
 * this var holds the current state of the application - when the page is first loaded, the state is index
 */
var current_state = "index"

/**
 * colors for the links
 */
const active_color = "#BA0303"
const inactive_color = "#767676"


/**
 * this is the function responsible for showing the profile/login page
 * if the user is adm or a common user, the page is profile
 * if the user is a guest, the page is login
 */
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
                  '<div class="form-container-right">Email:</div><div class="form-container-right"><input id="email-login" type="email" required></div>'+
                  '<div class="form-container-right">Senha:</div><div class="form-container-right"><input id="password" type="password" required></div>'+
                  '<div class="form-container-right"><button class="btn search" id="btn-submit-login">Login</button></div><div class="form-container-right"></div>'+
                  '<div class="form-container-right"><a href="#" class="central-link">Recuperar Senha</a></div>'+
                '</form>'+

              '</div>'+
               
            '</div>'+
            '<div class="profile-img">'+
              '<form class="form-user">'+
              '<div class="form-container" onsubmit="return false;">'+
                '<div class="form-container-right">Nome:</div><div class="form-container-right"><input type="text" id="name" required></div>'+
                '<div class="form-container-right">Email:</div><div class="form-container-right"><input type="text" id="mail" required></div>'+
                '<div class="form-container-right">Telefone:</div><div class="form-container-right"><input  type="tel" id="phone" required></div>'+
                '<div class="form-container-right">Nascimento:</div><div class="form-container-right"><input type="date" id="birth" required></div>'+
                '<div class="form-container-right">CPF:</div><div class="form-container-right"><input type="text" id="cpf" required></div>'+
                '<div class="form-container-right">Endereço:</div><div class="form-container-right"><input type="text" id="address" required></div>'+
                '<div class="form-container-right">CEP:</div><div class="form-container-right"><input type="text" id="cep" required></div>'+
                '<div class="form-container-right">Cidade:</div><div class="form-container-right"><input type="text" id="city" required></div>'+
                '<div class="form-container-right">Estado:</div><div class="form-container-right"><input type="text" id="state" required></div>'+
                '<div class="form-container-right">Base:</div><div class="form-container-right"><select id="base"><option value="regular">Regular</option><option value="goofy" selected="selected">Goofy</option></select></div>'+
                '<div class="form-container-right">Senha:</div><div class="form-container-right"><input type="password" id="pass" required></div>'+
                '<div class="form-container-right">Repetir Senha:</div><div class="form-container-right"><input type="password" id="repass" required></div>'+
                  '<div class="form-container-right"><button id="btn-submit-register" class="btn search">Registrar</button></div>'+

              '</ul>'+
              '</div>'+
              '</form>'+
            '</div>'+
        '</div>';



        //click event to login
        document.getElementById('btn-submit-login').addEventListener('click', login)

        //click event to register
        document.getElementById("btn-submit-register").addEventListener("click",registerUser)
        
            
        break;
        default://user or adm
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
                '<a href="#" id="alter-link" class="central-link-white">Alterar Dados</a>'+
                '<a href="#" id="logout-link" class="central-link-white">Logout</a>'+
            '</div>'+
            '<div class="profile-img">'+
                '<img id="profile-img-user" width="400">'+
            '</div>'+
        '</div>';

        //click event to logout
        document.getElementById('logout-link').addEventListener('click',logout)

        //click event to update the personal data
        document.getElementById('alter-link').addEventListener('click', displayUserFormPage)
        
        //this function fetches the user data on the page
        displayUserData()

        break;
    }
}



/**
 * this function is responsible for fetching the user form page for updating
 */
function displayUserFormPage(){
  document.getElementById('main-container').innerHTML = `<div class="profile-canvas">
  <div class="profile-infos">
      <form action="return false;" class="form-user">
      <div class="form-container">
          <div class="form-container-right">Nome:</div><div class="form-container-right"><input id="user-name-input" type="text"></div>
          <div class="form-container-right">Email:</div><div class="form-container-right"><input id="user-email-input" type="text"></div>
          <div class="form-container-right">Telefone:</div><div class="form-container-right"><input id="user-tel-input"  type="tel" ></div>
          <div class="form-container-right">Nascimento:</div><div class="form-container-right"><input id="user-birthday-input" type="date"></div>
          <div class="form-container-right">CPF:</div><div class="form-container-right"><input id="user-cpf-input" type="text"></div>
          <div class="form-container-right">Endereço:</div><div class="form-container-right"><input id="user-address-input" type="text"></div>
          <div class="form-container-right">CEP:</div><div class="form-container-right"><input id="user-cep-input" type="text"></div>
          <div class="form-container-right">Cidade:</div><div class="form-container-right"><input id="user-city-input" type="text"></div>
          <div class="form-container-right">Estado:</div><div class="form-container-right"><input id="user-state-input" type="text"></div>
          <div class="form-container-right">Base:</div><div class="form-container-right"><select id="user-base-select"><option value="regular">Regular</option><option value="goofy">Goofy</option></select></div>
          <div class="form-container-right"><button id="btn-alter" class="btn search">Alterar</button></div>

      </ul>
      </div>
      </form>
  </div>
  <div class="profile-img">
      <img src="img/russo.jpg" width="400">
  </div>
</div>`;

  //fills the form with current data
  displayUserDataForm();

  //just a mockup as there is no BD in the project
  document.getElementById('btn-alter').addEventListener('click',displayProfilePage)
}


/**
 * this function is responsible for showing the index page
 */
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


    //adding the relevant events for index page
    document.getElementById('completo-body-link').addEventListener('click',()=>{ displayProductsPage("type","completo") })
    document.getElementById('shape-body-link').addEventListener('click',()=>{ displayProductsPage("type","shape") })
    document.getElementById('truck-body-link').addEventListener('click',()=>{ displayProductsPage("type","truck") })
    document.getElementById('roda-body-link').addEventListener('click',()=>{ displayProductsPage("type","roda") })

}




/**
 * this function is responsible for showing the about page
 */
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


/**
 * this function is responsible for showing the shape drawer page
 * for now, this is just a static page, but later it will have some sharp behaviour
 */
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



/**
 * this function is responsible for showing the products page
 * query_field is the field to be queried
 * filter is the filter itself
 */
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

/**
 * this function is responsible for showing the cart/new_product page
 * if the user is adm, it is the new product
 * if the user is a costumer is the cart
 */
var displayCartPage = function(){
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
        
        //mockup  behavior of creating a new product
        document.getElementById("btn-cadastrar").addEventListener('click', ()=>{ alert("Produto Cadastrado com Sucesso"); displayIndexPage() })
        break;
        default:
          //cart page
          document.getElementById('main-container').innerHTML = `<span id="products-cart-container"></span><div class="cart-footer"><span class="cart-info" id="total-value">Valor Total: $0</span>
          <a id="conclude-purchase-link" class="central-link" style="margin-left: 400px;">Finalizar Compra</a></div>`;
          //display the products on the cart
          displayProductsCart()

          //link to finish purchase
          document.getElementById('conclude-purchase-link').addEventListener('click', displayPaymentPage)
    }
}


/**
 * this function is responsible for showing the paymment screen
 */
function displayPaymentPage(){
  let user  = localStorage.privilege == undefined ? "-1": localStorage.privilege
  switch (user){
    //if the user is a guest, the user has to create an account to finish purchase
    case "-1": alert("Execute Login para finalizar sua compra!"); displayProfilePage()
      break;
    default:
      document.getElementById('main-container').innerHTML = `<div class="profile-canvas">
      <div class="profile-infos">
          <form id="purchase-info-form" onsubmit="return false;" class="form-user">
          <div class="form-container">
              Endereço:<br>
              <!--
              <input type="radio" name="address" id="1" checked><label for="1">Rua da USP, 19-19, São Carlos-SP, 99999-99</label><br>
              <input type="radio" name="address" id="2"><label for="2">Rua da UFSCAR, 18-18, São Carlos-SP, 99988-99</label><br>
              -->
              <span id= "adress-input"></span>
              <input type="radio" name="address"><input placeholder="Outro endereço..." type="text"  id="adress-text-option"><br>
              Número do Cartão*:
              <input required type="text">
              <button id="purchase-button" class="btn search">Comprar</button>

          </ul>
          </div>
          </form>
      </div>
      <div class="profile-img">
          
      </div>
  </div>`
      //display the user saved adress
      displayUserAdress();
      
      //event to finish the purchase
      document.getElementById('purchase-button').addEventListener('click',finishPurchase)
      break;
  }
}


//mockup behavior of finishing the purchase
function finishPurchase(){
  alert("Compra Concluída com sucesso!")
  localStorage.removeItem('cart')
  displayIndexPage()

}

export {displayProductsPage,displayCartPage}

