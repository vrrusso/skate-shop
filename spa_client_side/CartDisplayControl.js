import {Product,getProductById} from './ProductController.js'
import { displayProductDetailsPage } from './ProductDisplayControl.js';




var  displayProductsCart = function(){
    const cart = JSON.parse(localStorage.getItem('cart'))
    let total=0;
    if(cart == undefined)
        return;
    cart.cart.forEach(obj =>{
        const product = getProductById(obj.product_id)
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
        layout+='<div class="central-container-img"><img src="'+product.img_path+'" width="180px"></div>'
        layout+='</div>'
        layout+='</div>'
        document.getElementById('products-cart-container').innerHTML += layout

    })




    for(let i=0;i<cart.cart.length;i++){
        document.getElementById('remove-'+cart.cart[i].product_id).addEventListener('click',()=>{removeProduct(cart.cart[i].product_id,i,total)})
        document.getElementById('edit-'+cart.cart[i].product_id).addEventListener('click',()=>{displayProductDetailsPage(cart.cart[i].product_id)})
    }

    document.getElementById('total-value').innerHTML = "Valor Total: $"+total
}


function removeProduct(product_id,index,total){
    document.getElementById(product_id).remove()
    console.log(product_id)
    console.log(index)
    let cart = JSON.parse(localStorage.getItem('cart'))
    const product = getProductById(product_id)

    let qtd = cart.cart[index].qtd

    cart.cart.splice(index,1)

    document.getElementById('total-value').innerHTML = "Valor Total: $"+(total-qtd*product.price)

    localStorage.setItem('cart',JSON.stringify(cart))
}


export{displayProductsCart}
