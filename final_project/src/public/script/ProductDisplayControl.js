/**
 * this script controls the display of the products on products page, filtering by name and by type
 */


import {fetchProductsByType,Product,fetchProductsByName} from './ProductController.js'
import { displayProduct } from './ProductDetailsControl.js'





/**
 * based on products, set the layout for the page
 */
function setLayout(products){
    let layout = ''
    let user  = localStorage.privilege == undefined ? -1: localStorage.privilege
    let link_text=''

    /*admin */
    if(user == '0')
        link_text='Ver'
    else
        link_text='Comprar'


    products.forEach(product =>{
        layout+= '<div class="central">'
        layout+='<div class="central-title"><h3 class="central-text-title">'+product.name+'</h3></div>'
        layout+='<div class="central-container">'
        layout+='<div class="central-anchor-left">'
        layout+='<div class="central-container-text"></div>'
        layout+='<div class="central-container-footer"><a href="#" id="'+product.id+'-link" class="central-link">'+link_text+'</a><span class="price-tag">$'+product.price+'</span></div>'
        layout+='</div>'
        layout+='<div class="central-container-img"><img src="'+product.img_path+'" width="180px"></div>'
        layout+='</div>'
        layout+='</div>'
    })
    
    
    return layout
}

/**
 * 
 * search the products based on name
 */
var displayProductsByName = async function(name){
    document.getElementById('search-input').value = name
    const products = await fetchProductsByName(name)
    document.getElementById('main-container').innerHTML = setLayout(products)
    setEvents(products)
}

/**
 * 
 * search the products based on type 
 */
var displayProductsByType = async function(type){
    const products = await fetchProductsByType(type)
    document.getElementById('main-container').innerHTML = setLayout(products)
    setEvents(products)
}

//set the events for each product
function setEvents(products){
    products.forEach(product => {
        document.getElementById(product.id+'-link').addEventListener('click',() => displayProductDetailsPage(product.id))
    })
}


//display the details of a product
var displayProductDetailsPage = function(productId){
    document.getElementById('main-container').innerHTML = `<div id="profile-canvas-product-details" class="profile-canvas">

    <div  class="profile-infos">
        <h3 class="central-text-title" style="color:#642d01" id="product-name"></h3>
        
        <ul id="product-details-list">
         
        </ul>
      
        <span class="price-tag" id="product-price"></span>
        <span id="actions-product-details"></span>
        
    </div>
    <div id="product-img" class="profile-img">
        
        
    </div>
</div>`

    displayProduct(productId)

}

export {displayProductsByType,displayProductsByName,displayProductDetailsPage}



