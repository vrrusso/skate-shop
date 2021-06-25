

document.addEventListener('DOMContentLoaded', displayActiveLink)

function displayActiveLink(){
    let param = window.location.search.substr(1);
    param = param.split('=')[1]
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



