const fs=require("fs");
class mensajes{
    _mensajes=[];
   constructor(){
       
   }

   save(obj){
       
       this._mensajes.push(obj);
       fs.promises.writeFile("src/chat.txt",JSON.stringify(this._mensajes));
       
   }
   
   getAll(){
      
       return this._mensajes;
      
   }

   iniciar(){
    fs.readFile('src/chat.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        if(data!=""){
            this._mensajes=JSON.parse(data);
        }else{
            this._mensajes=[];
        }
        
    });
   
   
}
   
   
}
module.exports=mensajes;