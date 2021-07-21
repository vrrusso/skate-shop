
var canvas
var paint = false


var displayCanvas = function () {
    canvas = document.getElementById('shape-canvas')

    canvas.addEventListener('mousedown', setPaintTrue)
    canvas.addEventListener('mouseup',setPaintFalse)

    canvas.addEventListener('mousemove',draw)
}


function setPaintTrue(){
    paint = true
    console.log(paint)
}

function setPaintFalse(){
    paint=false
    console.log(paint)
}


function draw(e){
    if(!paint)return
    console.log(e.clientX)
    console.log(e.clientY)
    var circle = $('<div></div>');
    circle.css('top',e.clientY);
    circle.css('left',e.clientX);
    circle.css('width','5px')
    circle.css('height','5px')
    circle.css('background','rgb(0,0,0)')
    circle.css('position','absolute')
    $("#shape-canvas").append(circle);

}

export {displayCanvas}