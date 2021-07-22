/**
 * this script controls the form of updating products
 */


import {Product,getProductById} from './ProductController.js'

document.addEventListener('DOMContentLoaded',fillForm)

/**
 * fill the form with the current stored data
 */
var fillForm = async function(product_id) {
    let product = await getProductById(product_id)
    document.getElementById('price-input').value = product.price
    document.getElementById('name-input').value = product.name
    document.getElementById('brand-input').value = product.brand
    document.getElementById('size-input').value = product.size
    let colors = ['verde','preto','azul','vermelho','branco','prata','amarelo']
    document.getElementById('color-input').selectedIndex = colors.indexOf(product.color)
    document.getElementById('stock-input').value = product.stock
    document.getElementById('sold-input').value = product.sold
    document.getElementById('description-input').value = product.description

    document.getElementById('img-path-input').value = product.img_path

    document.getElementById('img-product').src = product.img_path

}

export {fillForm}
