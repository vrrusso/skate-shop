/**
 * this script controls the form of updating products
 */


import {Product,getProductById} from './ProductController.js'

document.addEventListener('DOMContentLoaded',fillForm)

/**
 * fill the form with the current stored data
 */
var fillForm = function(product_id) {
    let product = getProductById(product_id)
    document.getElementById('price-input').value = product.price
    document.getElementById('name-input').value = product.name
    document.getElementById('brand-input').value = product.brand
    document.getElementById('size-input').value = product.size
    let colors = ['Verde','Preto','Azul','Vermelho','Branco','Prata','Amarelo']
    document.getElementById('color-input').selectedIndex = colors.indexOf(product.color)
    document.getElementById('stock-input').value = product.stock
    document.getElementById('sold-input').value = product.sold
    document.getElementById('description-input').value = product.description

    document.getElementById('img-product').src = product.img_path

}

export {fillForm}
