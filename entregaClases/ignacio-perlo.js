const fs=require("fs");

class contenedor{
    _productos=[];
    constructor(archivo){
        this.archivo=archivo;
    }

    save(obj){
        
        if(this._productos.length>0){
            obj.id=this._productos[this._productos.length-1].id+1;
        }else{
            obj.id=1;
        }
        
        this._productos.push(obj);
        this.writeFile().then(res=>{
            
        })
        console.log(obj.id);
        
        
    }
    getById(id){
        
        console.log(this._productos.find(p=>p.id==id));
         
    }
    getAll(){
       
        console.log(this._productos);
       
    }
    deleteById(id){
        
        this._productos.splice(this._productos.findIndex(p=>p.id==id),1);
        this.writeFile().then(res=>{

        })
       
    }
    deleteAll(){
        this._productos=[];
        this.writeFile().then(res=>{

        })
    }
    
    async readFile(){
        if(fs.existsSync(this.archivo)){
            await fs.promises.readFile(this.archivo,"utf-8").then(data=>{
                this._productos=JSON.parse(data).sort(function(a, b) {
                    return a.id - b.id;
                });
                
            });
        }
    }

    async writeFile(){
        if(this._productos.length==0){
            await fs.promises.writeFile(this.archivo,"");
        }else{
            await fs.promises.writeFile(this.archivo,JSON.stringify(this._productos));
        }
        
        
    }
}   

const cont=new contenedor("productos.txt");
cont.save({title:'prueba4',price:500,thumbnail:'prueba4.jpg'});
cont.save({title:'prueba3',price:500,thumbnail:'prueba4.jpg'});
cont.save({title:'prueba5',price:500,thumbnail:'prueba5.jpg'});
cont.getById(2)
cont.getAll();
cont.deleteById(2);
cont.getAll();
cont.deleteAll();
cont.getAll();
cont.save({title:'prueba5',price:500,thumbnail:'prueba5.jpg'});
cont.getAll();