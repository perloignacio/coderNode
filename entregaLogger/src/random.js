

process.on('message',msg=>{
    if(msg=='random'){
        let _numeros={}
        let cant=parseInt(process.argv[2])
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


