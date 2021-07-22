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
import {Product,createProduct} from './ProductController.js'

import {getUserPrivilege} from './UserController.js'

import {displayCanvas,downloadShapeImage} from './ShapeDrawer.js'



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
                  name:document.getElementById('user-name-input').value,
                  mail:document.getElementById('user-email-input').value,
                  phone:document.getElementById('user-tel-input').value,
                  birth:document.getElementById('user-birthday-input').value,
                  cpf:document.getElementById('user-cpf-input').value,
                  address: document.getElementById('user-address-input').value,
                  cep:document.getElementById('user-cep-input').value,
                  city:document.getElementById('user-city-input').value,
                  state:document.getElementById('user-state-input').value,
                  base:document.getElementById('user-base-select').value,
                  img_path:document.getElementById('img-path-input').value

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
  alert("Compra Concluída com sucesso!")
  localStorage.removeItem('cart')
  displayIndexPage()

}

async function saveProduct(){
  let p = new Product(0,document.getElementById('price-input').value,
  document.getElementById('name-input').value,
  document.getElementById('brand-input').value,
  document.getElementById('type-input').value,
  document.getElementById('size-input').value,
  document.getElementById('color-input').value,
  document.getElementById('stock-input').value,
  0,
  document.getElementById('description-input').value,
  document.getElementById('img-path-input').value
  )
  let resp = await createProduct(p)
  alert(resp.message)

  
}

export {displayProductsPage,displayCartPage,displayIndexPage}

