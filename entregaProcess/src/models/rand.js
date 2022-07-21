class rand{
    _numeros;
    constructor(){
        
    }
    
    getRandom(cant){
        this._numeros={}
        if(cant==undefined){
            cant=1000;
        }
        for(let i=1;i<=cant;i++){
            let numero=Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
           
            if(numero in this._numeros){
                this._numeros[numero]+=1;
            }else{
                this._numeros[numero]=1;
            }
        }
        return this._numeros;
            
    }
}
module.exports=rand;