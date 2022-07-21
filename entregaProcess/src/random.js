

process.on('message',msg=>{
    if(msg=='random'){
        let _numeros={}
        let cant=process.argv[2] ? parseInt(process.argv[2]): 1000;
        for(let i=1;i<=cant;i++){
            let numero=Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
            
            if(numero in _numeros){
                _numeros[numero]+=1;
            }else{
                _numeros[numero]=1;
            }
        }
        process.send(_numeros)
        process.exit();
    }
})


