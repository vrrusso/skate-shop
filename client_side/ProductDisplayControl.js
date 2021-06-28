/**
 * this script controls the display of the products on products page, filtering by name and by type
 */


import {fetchProductsByType,Product,fetchProductsByName} from './ProductController.js'


document.addEventListener('DOMContentLoaded', displayActiveLink)

document.addEventListener('DOMContentLoaded', displayProducts)

/**
 * based on the type requested, change the correct link color
 */
function displayActiveLink(){
    let param = window.location.search.substr(1);
    param = param.split('=')
    if(param[0] == 'type'){
        param = param[1];
        switch(param){
            case 'completo':
                document.getElementById("complete-skate-link").style.color = '#BA0303'
                break;
            case 'shape':
                document.getElementById("shape-link").style.color = '#BA0303'
                break;
            case 'truck':
                document.getElementById("truck-link").style.color = '#BA0303'
                break;
            case 'roda':
                document.getElementById("wheel-link").style.color = '#BA0303'
                break;
        }
    }
}

/**
 * get the params from the request
 */
function displayProducts(){
    let param = window.location.search.substr(1);
    param = param.split('=')
    if(param[0] == 'type')
        displayProductsByType(param[1])
    if(param[0] == 'name')
        displayProductsByName(param[1])
}

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
        console.log(product)
        layout+= '<div class="central">'
        layout+='<div class="central-title"><h3 class="central-text-title">'+product.name+'</h3></div>'
        layout+='<div class="central-container">'
        layout+='<div class="central-anchor-left">'
        layout+='<div class="central-container-text"></div>'
        layout+='<div class="central-container-footer"><a href="example_product.html?product_id='+product.id+'" class="central-link">'+link_text+'</a><span class="price-tag">$'+product.price+'</span></div>'
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
function displayProductsByName(name){
    document.getElementById('search-input').value = name
    const products = fetchProductsByName(name)
    document.getElementById('container-feed-products').innerHTML = setLayout(products)
}

/**
 * 
 * search the products based on type 
 */
function displayProductsByType(type){
    const products = fetchProductsByType(type)
    document.getElementById('container-feed-products').innerHTML = setLayout(products)
}




