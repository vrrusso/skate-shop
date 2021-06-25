
import {fetchProductsByType,Product} from './ProductController.js'


document.addEventListener('DOMContentLoaded', displayActiveLink)

document.addEventListener('DOMContentLoaded', displayProducts)

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

function displayProducts(){
    let param = window.location.search.substr(1);
    param = param.split('=')
    if(param[0] == 'type')
        displayProductsByType(param[1])
}


function displayProductsByType(type){
    console.log(fetchProductsByType(type))
}




