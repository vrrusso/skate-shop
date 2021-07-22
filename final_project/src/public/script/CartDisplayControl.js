/**
 * this script is responsible of fecthing the product of the cart on the cart screen
 */


import {Product,getProductById} from './ProductController.js'
import { displayProductDetailsPage } from './ProductDisplayControl.js';




/**
 * 
 * gets the products from the cart and displays them on sreen
 */
var  displayProductsCart = async function(){
    const cart = JSON.parse(localStorage.getItem('cart'))
    let total=0;
    if(cart == undefined)
        return;
    for(const obj of cart.cart){
        const product = await getProductById(obj.product_id)
        if(product != null){
            total+=product.price*obj.qtd
            let layout = ""
            layout+= '<div class="central" id="'+obj.product_id+'">'
            layout+='<div class="central-title">'
            layout+='<h3 class="central-text-title">'+product.name+'</h3>'
            layout+='</div>'
            layout+='<div class="central-container">'
            layout+='<div class="central-anchor-left">'
            layout+='<div class="central-container-text">'
            layout+='</div>'
            layout+='<div class="central-container-footer">'
            layout+='<span class="cart-info">Qtd.: '+obj.qtd+'</span>'
            layout+='<span class="cart-info">Preço: $'+ product.price+'</span>'
            layout+='<span class="cart-info">Valor: $'+product.price*obj.qtd+'</span>'
            layout+='<a href="#" id="edit-'+obj.product_id+'" class="central-link">Editar</a><a id="remove-'+obj.product_id+'" class="central-link">Remover</a>'
            layout+='</div>'
            layout+='</div>'
            layout+='<div class="central-container-img"><img src="'+product.img_path+'" width="180px" height="180px"></div>'
            layout+='</div>'
            layout+='</div>'
            document.getElementById('products-cart-container').innerHTML += layout
        }
    }




    for(let i=0;i<cart.cart.length;i++){

        let insert = document.getElementById('remove-'+cart.cart[i].product_id)
        let edit = document.getElementById('edit-'+cart.cart[i].product_id)

        if(insert != null)
            //event to remove item from the cart
            document.getElementById('remove-'+cart.cart[i].product_id).addEventListener('click',()=>{removeProduct(cart.cart[i].product_id,i,total)})
        
        //event to edit some product
        //the product screen will come up   
        if(edit!= null)     
            document.getElementById('edit-'+cart.cart[i].product_id).addEventListener('click',()=>{displayProductDetailsPage(cart.cart[i].product_id)})
    }

    document.getElementById('total-value').innerHTML = "Valor Total: $"+total
}



/**
 * 
 * removes a product from the cart and from the screen
 * product_id is the id of the product to be removed, index is the index of the product in the cart
 * and total is the total value of the cart
 */
async function removeProduct(product_id,index,total){
    document.getElementById(product_id).remove()
    console.log(product_id)
    console.log(index)
    let cart = JSON.parse(localStorage.getItem('cart'))
    const product = await getProductById(product_id)

    let qtd = cart.cart[index].qtd


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
          sold:product.sold-qtd
        })
    })

    cart.cart.splice(index,1)

    document.getElementById('total-value').innerHTML = "Valor Total: $"+(total-qtd*product.price)

    localStorage.setItem('cart',JSON.stringify(cart))
}


export{displayProductsCart}
