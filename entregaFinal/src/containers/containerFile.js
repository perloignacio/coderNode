const fs=require("fs");
 class containerFile{
    _objs=[];
    filename="";
    constructor(filename){
        this.filename=filename;
    }

    async insert(obj){ 
        if(this._objs.length>0){
            obj.id=this._objs[this._objs.length-1].id+1;
        }else{
            obj.id=1;
        }
        obj.timestamp=Date.now();
        this._objs.push(obj);
        this.Guardar();
        return true;
    }

    async getById(id){
        
        return this._objs.find(o=>o.id==id);
         
    }

    async update(id,obj){
        obj.id=id;
        if(this._objs.findIndex(o=>o.id==id)!=-1){
            this._objs[this._objs.findIndex(o=>o.id==id)]=obj;
            this.Guardar();
            return true;
        }else{
            return false;
        }
        
         
    }
    async getAll(){
       
        return this._objs;
       
    }
    async deleteById(id){
        if(this._obj.findIndex(o=>o.id==id)!=-1){
            this._obj.splice(this._objs.findIndex(o=>o.id==id),1);
            this.Guardar();
            return true;
        }else{
            return false;
        }
       
    }

    

    iniciar(){

        console.log()
        fs.readFile("src/"+this.filename, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            if(data!=""){
                this._objs=JSON.parse(data);
            }else{
                this._objs=[];
            }
            
        });
    }
    Guardar(){
        fs.promises.writeFile("src/"+this.filename,JSON.stringify(this._objs));
    }

    
    
}
module.exports=containerFile;
