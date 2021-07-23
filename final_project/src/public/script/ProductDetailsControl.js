/**
 * this script controls the display of products info in example_product page
 */


import {Product,getProductById,updateProduct,removeProduct} from './ProductController.js'
import { fillForm } from './ProductFormControl.js'
import { displayProductsPage,displayIndexPage } from './RouteControl.js'
import { displayCartPage } from './RouteControl.js'

/**
 * based on the id passed on the request and the privilege of the user, get the details of products
 */
var displayProduct = async function(param){
    let user  = localStorage.privilege == undefined ? -1: localStorage.privilege
    switch(user){
        case '0':
            displayAdminView(param)
            break;
        default:
            await displayCostumerView(param)
            document.getElementById('add-btn').addEventListener('click',()=>{addToTheCart(param)})
    }
}

//add a product to the cart
async function addToTheCart(product_id){
    let qtd = document.getElementById('qtd').value

    const product = await getProductById(product_id)
    
    if(product.stock-product.sold-qtd <0){
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

    await fetch("http://localhost:3000/product/pay/"+product.id,{
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
          sold:product.sold+parseInt(obj.qtd)
        })
    })
    

    //calls the cart page
    displayCartPage()
    
}


/**
 * 
 * when the user is a costumer 
 */
async function displayCostumerView(id){
    let product = await getProductById(id)
    document.getElementById("product-name").innerHTML = product.name
    let layout = '<li>Marca: '+product.brand+'</li>'
    layout+='<li>Tamanho: '+product.size+'</li>'
    layout+='<li>Cor: '+product.color+'</li>'
    layout+='<li><p>'+product.description+'</p></li>'
    document.getElementById('product-details-list').innerHTML = layout
    document.getElementById('product-price').innerHTML = '$'+product.price
    document.getElementById('actions-product-details').innerHTML = '<form onsubmit="return false;">Quantidade:<input value="1" id="qtd" type="number"><br><button id="add-btn" class="btn search" style="margin-top: 5px;">Adcionar ao Carrinho</button></form>'
    document.getElementById('product-img').innerHTML = '<img src="'+product.img_path+'" width="400" height="400">'
    
}

/**
 * 
 * when the user is a admin 
 */
async function displayAdminView(id){
    let product = await getProductById(id)
    console.log(product.name)
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

    document.getElementById('product-img').innerHTML = '<img src="'+product.img_path+'" width="400" height="400">'

    //in the final project there will be a BD interaction here, for now it is just a mockup
    document.getElementById('delete-link').addEventListener('click', async ()=>{
        let resp = await removeProduct(id)
        alert(resp.message)
        displayProductsPage("name","")
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
    await fillForm(product_id)


    //mockup behavior of editing a product
    document.getElementById('btn-submit-edit-form').addEventListener('click',async ()=>{ 
        const price =  document.getElementById('price-input').value
        const name = document.getElementById('name-input').value
        const brand = document.getElementById('brand-input').value
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

        let p = new Product(product_id,price,
            name,
            brand,
            "whatever",
            size,
            color,
            stock,
            0,
            description,
            img_path
            )
  let resp = await updateProduct(p)
  alert(resp.message)


  //displayProductsPage("name","")
    displayIndexPage()
    }
        
  )

}


export {displayProduct}