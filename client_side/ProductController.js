/**
 * This script is responsible for the communications with the Products table in the DB
 * 
 * For now, we got no BD, so it justs simulates interaction with the BD
 */

 class Product {
    constructor(id,price,name,brand,type,size,color,stock,sold,description,img_path) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.brand = brand;
        this.type = type;
        this.size = size;
        this.color = color;
        this.stock = stock;
        this.sold = sold;
        this.description = description;
        this.img_path = img_path;
    }
}

const Products = [
    new Product(0,20,'Shape Creature','Creature','shape',8.0,'Verde',80,17,'Shape Irado de Tamanho Médio','./img/shape.jpg'),
    new Product(1,13,'Roda Mike Dias','747','roda',53,'Azul',20,5,'Roda com dureza 102a fabrucada com o melhor uretano','./img/roda.png'),
    new Product(2,30,'Truck Silver','Silver','truck',139,'Verde',10,3,'Truck feito em aço, leve e resistente!','./img/truck.png'),
    new Product(3,70,'Skate Completo Black Sheep','Black Sheep','completo',8.0,'Verde',20,11,'Skate Completo para iniciantes.','./img/sk8.png'),    
    new Product(4,30,'Shape Gang Tsuru','CISCO','shape',8.0,'Branco',19,3,'Shape Profissa 100% em marfim.','./img/shape2.png'),
    new Product(5,48,'Rolamento REDS','Bones','roda',8,'Vermelho',15,1,'Jogo com 8 rolamentos Bones.','./img/bearings.jpg'),
    new Product(6,35,'Shape Girl','Girl','shape',7.8,'Preto',7,0,'Shape gringo 100% Mapple','./img/shape_girl.jpg'),
    new Product(7,50,'Shape Crail ProModel','Crail','truck',139,'Amarelo',5,2,'Truck usado pelos pros!','./img/truck_crail.jpg'),
]


var fetchProductsByType = function(type){
    let arr = []
    Products.forEach(product => {
        if(product.type==type)
            arr.push(product)
    })
    return arr
}

export {fetchProductsByType,Product}
//console.log(Products)