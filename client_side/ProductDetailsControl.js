
import {Product,getProductById} from './ProductController.js'

document.addEventListener('DOMContentLoaded', displayProduct )


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

function displayAdminView(id){
    let product = getProductById(id)
    document.getElementById("product-name").innerHTML = product.name
    let layout = '<li>Marca: '+product.brand+'</li>'
    layout+='<li>Tamanho: '+product.size+'</li>'
    layout+='<li>Cor: '+product.color+'</li>'
    layout+='<li><p>'+product.description+'</p></li>'
    layout+='<li>Quantidade em Estoque: '+product.stock+'</li>'
    layout+='<li>Quantidade Vendida: '+product.sold+'</li>'
    document.getElementById('product-details-list').innerHTML = layout
    document.getElementById('product-price').innerHTML = '$'+ product.price
    document.getElementById('actions-product-details').innerHTML = '<a href="product_form.html" class="central-link">Editar</a><a href="example_product.html" class="central-link">Excluir Produto</a>'

    document.getElementById('product-img').innerHTML = '<img src="'+product.img_path+'" width="400">'

}
