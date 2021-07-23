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
import {Product,createProduct,getProductById} from './ProductController.js'

import {getUserPrivilege} from './UserController.js'

import {displayCanvas,downloadShapeImage} from './ShapeDrawer.js'



/**
 * link to the profile/login page
 */
document.getElementById("profile-link").addEventListener('click', displayProfilePage)

/**
 * link to the main page
 */
document.getElementById("index-link").addEventListener('click',()=>{displayIndexPage()})

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
async function displayProfilePage(){
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("profile-link").style.color = active_color
    current_state = "profile"

    let user  = localStorage.privilege == undefined ? "-1": localStorage.privilege

    let resp = null

    switch (user){
        //guest
        case '-1':
            resp = await fetch('http://localhost:3000/login.html')
            resp = await resp.text();
            document.getElementById('main-container').innerHTML = resp
          
            //click event to login
            document.getElementById('btn-submit-login').addEventListener('click', login)

            //click event to register
          document.getElementById("btn-submit-register").addEventListener("click",registerUser)
        
            
        break;
        default://user or adm
          resp = await fetch('http://localhost:3000/profile.html')
          resp = await resp.text();
          document.getElementById('main-container').innerHTML = resp

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
async function displayUserFormPage(){
  let resp = await fetch('http://localhost:3000/profile_form.html')
  resp = await resp.text();
  document.getElementById('main-container').innerHTML = resp

  //fills the form with current data
  displayUserDataForm();

  //just a mockup as there is no BD in the project
  document.getElementById('btn-alter').addEventListener('click',async ()=>{


    const name = document.getElementById('user-name-input').value
    const phone = document.getElementById('user-tel-input').value
    const birth = document.getElementById('user-birthday-input').value
    const cpf = document.getElementById('user-cpf-input').value
    const address = document.getElementById('user-address-input').value
    const cep = document.getElementById('user-cep-input').value
    const city = document.getElementById('user-city-input').value
    const state = document.getElementById('user-state-input').value
    const base = document.getElementById('user-base-select').value
    const img_path = document.getElementById('img-path-input').value

    if(name.trim() == '' ){
      alert("O campo nome deve ser preenchido!")
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



    let id = localStorage.userId
    let resp = await fetch("http://localhost:3000/user/"+id,{
                method:'PUT',
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
                  phone:phone,
                  birth:birth,
                  cpf:cpf,
                  address: address,
                  cep: cep,
                  city: city,
                  state: state,
                  base: base,
                  img_path: img_path

                })
              })
    if(resp.status == 200){
      resp = await resp.json()
      alert(resp.message)
      displayProfilePage()
    }
    else{
      resp = await resp.json()
      alert(resp.message)
    }
  }
  )
}


/**
 * this function is responsible for showing the index page
 */
var displayIndexPage = async function(){

    
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("index-link").style.color = active_color
    current_state = "index"

    let resp = await fetch('http://localhost:3000/index_body.html')
    resp = await resp.text();


    document.getElementById('main-container').innerHTML = resp;


    //adding the relevant events for index page
    document.getElementById('completo-body-link').addEventListener('click',()=>{ displayProductsPage("type","completo") })
    document.getElementById('shape-body-link').addEventListener('click',()=>{ displayProductsPage("type","shape") })
    document.getElementById('truck-body-link').addEventListener('click',()=>{ displayProductsPage("type","truck") })
    document.getElementById('roda-body-link').addEventListener('click',()=>{ displayProductsPage("type","roda") })

}




/**
 * this function is responsible for showing the about page
 */
async function displayAboutPage(){
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("about-link").style.color = active_color
    current_state = "about"

    let resp = await fetch('http://localhost:3000/about.html')
    resp = await resp.text();

    document.getElementById("main-container").innerHTML = resp;

}


/**
 * this function is responsible for showing the shape drawer page
 * for now, this is just a static page, but later it will have some sharp behaviour
 */
async function displayShapeDrawerPage(){
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("shape-drawer-link").style.color = active_color
    current_state = "shape-drawer"

    let resp = await fetch('http://localhost:3000/shape_drawer.html')
    resp = await resp.text();

    document.getElementById("main-container").innerHTML = resp;
    document.getElementById('download-button').addEventListener('click',downloadShapeImage)

    displayCanvas()

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
var displayCartPage = async function(){
    document.getElementById(current_state+"-link").style.color = inactive_color
    document.getElementById("cart-link").style.color = active_color
    current_state = "cart"
    let user  = localStorage.privilege == undefined ? "-1": localStorage.privilege
    let resp = null

    switch(user){
        /*admin*/
        case '0':
            resp = await fetch('http://localhost:3000/new_product.html')
            resp = await resp.text();
            document.getElementById('main-container').innerHTML = resp
        
        //mockup  behavior of creating a new product
        document.getElementById("btn-cadastrar").addEventListener('click', ()=>{ saveProduct() })
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
async function displayPaymentPage(){
  let user  = localStorage.privilege == undefined ? "-1": localStorage.privilege
  let total = 0

  const cart = JSON.parse(localStorage.getItem('cart'))
  if(cart == null){
    alert("Adcione algum item no carrinho para finalizar a compra!")
    return
  }
  for(const obj of cart.cart){
    const product = await getProductById(obj.product_id)
    if(product != null){
      total = product.price*obj.qtd
    }
  }
  if(total<=0){
    alert("Adcione algum item no carrinho para finalizar a compra!")
    return
  }
  switch (user){
    //if the user is a guest, the user has to create an account to finish purchase
    case "-1": alert("Execute Login para finalizar sua compra!"); displayProfilePage()
      break;
    default:
      let resp = await fetch('http://localhost:3000/payment.html')
      resp = await resp.text();
      document.getElementById('main-container').innerHTML = resp
      //display the user saved adress
      await displayUserAdress();
      
      //event to finish the purchase
      document.getElementById('purchase-button').addEventListener('click',finishPurchase)
      break;
  }
}


//mockup behavior of finishing the purchase
function finishPurchase(){
  if(document.getElementById('credit-no').value.trim() == "" ){
    alert("Digite um número de Cartão!")
    return
  }
  alert("Compra Concluída com sucesso!")
  localStorage.removeItem('cart')
  displayIndexPage()

}

async function saveProduct(){

  const price =  document.getElementById('price-input').value
  const name = document.getElementById('name-input').value
  const brand = document.getElementById('brand-input').value
  const type =  document.getElementById('type-input').value
  const size = document.getElementById('size-input').value
  const color = document.getElementById('color-input').value
  const stock = document.getElementById('stock-input').value
  const description = document.getElementById('description-input').value
  const img_path = document.getElementById('img-path-input').value


  if(price.trim() == ''){
    alert("O campo preço deve ser preenchido!")
    return
  }
  if(parseFloat(price) <= 0){
    alert("O valor de preço deve ser maior que zero!")
    return
  }

  if(name.trim() == ''){
    alert("O campo nome deve ser preenchido!")
    return
  }

  if(brand.trim() == ''){
    alert("O campo marca deve ser preenchido!")
    return
  }

  if(size.trim() == ''){
    alert("O campo tamanho deve ser preenchido!")
    return
  }
  if(parseFloat(size) <= 0){
    alert("O valor de tamanho deve ser maior que zero!")
    return
  }

  if(stock.trim() == ''){
    alert("O campo quantidade em estoque deve ser preenchido!")
    return
  }
  if(parseInt(stock) < 1){
    alert("A quantidade em estoque deve ser maior que zero!")
    return
  }

  if(img_path.trim() == ''){
    alert("O campo caminho da imagem deve ser preenchido!")
    return
  }

  

  let p = new Product(0,price,
  name,
  brand,
  type,
  size,
  color,
  stock,
  0,
  description,
  img_path
  )
  let resp = await createProduct(p)
  alert(resp.message)

  
}

export {displayProductsPage,displayCartPage,displayIndexPage}

