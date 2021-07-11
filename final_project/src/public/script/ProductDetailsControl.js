/**
 * this script controls the display of products info in example_product page
 */


import {Product,getProductById} from './ProductController.js'
import { fillForm } from './ProductFormControl.js'
import { displayProductsPage } from './RouteControl.js'
import { displayCartPage } from './RouteControl.js'

/**
 * based on the id passed on the request and the privilege of the user, get the details of products
 */
var displayProduct = function(param){
    let user  = localStorage.privilege == undefined ? -1: localStorage.privilege
    switch(user){
        case '0':
            displayAdminView(param)
            break;
        default:
            displayCostumerView(param)
            document.getElementById('add-btn').addEventListener('click',()=>{addToTheCart(param)})
    }
}

//add a product to the cart
function addToTheCart(product_id){
    let qtd = document.getElementById('qtd').value

    const product = getProductById(product_id)
    

    if(product.stock-product.sold-qtd <=0){
        alert("Não há itens suficiente no estoque para essa venda! ")
        return;
    }
    //console.log(product_id)
    //console.log(qtd)

    const obj = {
        "product_id":product_id+"",
        "qtd":qtd+"",
    }

    if(obj.qtd <= 0){
        alert("Selecione uma quantidade válida!")
        return;
    }
    

    //if the cart is empty
    if(localStorage.cart == undefined){
        let new_cart = {
            "cart":[],
        }
        new_cart.cart.push(obj)
        localStorage.setItem('cart',JSON.stringify(new_cart))
    }


    //if the cart already have items
    else{
        let str = localStorage.cart
        let cart = JSON.parse(str)
        let index = -1
        for(let i=0;i<cart.cart.length;i++){
            if(cart.cart[i].product_id == obj.product_id)
                index=i
        }
        if(index == -1){
            cart.cart.push(obj)
        }
        else{
            cart.cart[index].qtd = obj.qtd;             
        }
        localStorage.setItem('cart',JSON.stringify(cart))
        console.log(JSON.parse(localStorage.cart))
    }

    //calls the cart page
    displayCartPage()
    
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
    document.getElementById('product-price').innerHTML = '$'+product.price
    document.getElementById('actions-product-details').innerHTML = '<form onsubmit="return false;">Quantidade:<input value="1" id="qtd" type="number"><br><button id="add-btn" class="btn search" style="margin-top: 5px;">Adcionar ao Carrinho</button></form>'
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
    document.getElementById('actions-product-details').innerHTML = '<a href="#" id="edit-link" class="central-link">Editar</a><a href="#" id="delete-link" class="central-link">Excluir Produto</a>'

    document.getElementById('product-img').innerHTML = '<img src="'+product.img_path+'" width="400">'

    //in the final project there will be a BD interaction here, for now it is just a mockup
    document.getElementById('delete-link').addEventListener('click', ()=>{
        alert("Produto Excluído com sucesso")
    })

    document.getElementById('edit-link').addEventListener('click', () => displayProductEditForm(id) )

}


/**
 * 
 * this function is responsible of showing the product edit form from the admin view
 * 
 */
async function displayProductEditForm(product_id){

    let resp = await fetch('http://localhost:3000/edit_product_form.html')
    resp = await resp.text();
    document.getElementById('profile-canvas-product-details').innerHTML = resp

    //fills the form with product data
    fillForm(product_id)


    //mockup behavior of editing a product
    document.getElementById('btn-submit-edit-form').addEventListener('click',()=>{alert("Produto Alterado com Sucesso");displayProductsPage("name","")})

}


export {displayProduct}