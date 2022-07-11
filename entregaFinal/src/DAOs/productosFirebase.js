const ContainerFirebase =require('../containers/containerFirebase');
const collection=require("./modelFirebases/productosCollection");
 class producto extends ContainerFirebase{
    
    constructor(){
        
        super(collection)
    }
    
}
module.exports=producto;