class ContainerFirebase {
    constructor(collection){
        this.collection=collection;
    }

    async insert(obj){
        let res = await this.collection.orderBy("id","desc").limit(1).get();
        let tmp=res.docs.map(doc=>doc.data())[0];
        
        if(tmp){
            obj.id=tmp.id+1;
        }else{
            obj.id=1;
        }
        let doc = this.collection.doc(`${obj.id}`)
        let item = await doc.create(obj)
        return true
    }

    async getAll(){
        let result = await this.collection.get()
        result = result.docs.map(doc=>doc.data())
        return result;
        
        
    }

    async getById(id){
        
        let result = await this.collection.doc(`${id}`).get()
        return result.data()
    }

    async deleteById(id){
        let doc = this.collection.doc(`${id}`)
        let item = doc.delete()
        return true
        
    }

    async update(id,obj){
        let doc = this.collection.doc(`${id}`)
        let item = await doc.update(obj)
        return true
    }

    async iniciar(){
         
    
    }

    async Guardar(){
        
    }
}

module.exports =  ContainerFirebase 
