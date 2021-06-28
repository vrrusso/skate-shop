/**
 * this script controls the display of products info in example_product page
 */


import {Product,getProductById} from './ProductController.js'

document.addEventListener('DOMContentLoaded', displayProduct )

/**
 * based on the id passed on the request and the privilege of the user, get the details of products
 */
function displayProduct(){
    let user  = localStorage.privilege == undefined ? -1: localStorage.privilege
    let param = window.location.search.substr(1).split('=')
    param = param[1]
    switch(user){
        case '0':
            displayAdminView(param)
            break;
        default:
            displayCostumerView(param)
    }
}

/**
 * 
 * when the user is a costumer 
 */
function displayCostumerView(id){
    let product = getProductById(id)
    document.getElementById("product-name").innerHTML = product.name
    let layout = '<li>Marca: '+product.brand+'</li>'
    layout+='<li>Tamanho: '+product.size+'</li>'
    layout+='<li>Cor: '+product.color+'</li>'
    layout+='<li><p>'+product.description+'</p></li>'
    document.getElementById('product-details-list').innerHTML = layout
    document.getElementById('product-price').innerHTML = product.price
    document.getElementById('actions-product-details').innerHTML = '<form action="cart.html">Quantidade:<input value="1" type="number"><br><button class="btn search" style="margin-top: 5px;">Adcionar ao Carrinho</button></form>'
    document.getElementById('product-img').innerHTML = '<img src="'+product.img_path+'" width="400">'
}

/**
 * 
 * when the user is a admin 
 */
function displayAdminView(id){
    let product = getProductById(id)
    document.getElementById("product-name").innerHTML = product.name
    let layout = '<li>Marca: '+product.brand+'</li>'
    layout+='<li>Tamanho: '+product.size+'</li>'
    layout+='<li>Cor: '+product.color+'</li>'
    layout+='<li>'+product.description+'</li>'
    layout+='<li>Quantidade em Estoque: '+product.stock+'</li>'
    layout+='<li>Quantidade Vendida: '+product.sold+'</li>'
    document.getElementById('product-details-list').innerHTML = layout
    document.getElementById('product-price').innerHTML = '$'+ product.price
    document.getElementById('actions-product-details').innerHTML = '<a href="product_form.html?product_id='+product.id+'" class="central-link">Editar</a><a href="example_product.html" class="central-link">Excluir Produto</a>'

    document.getElementById('product-img').innerHTML = '<img src="'+product.img_path+'" width="400">'

}
