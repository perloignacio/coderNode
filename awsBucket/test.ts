import {S3} from 'aws-sdk';
export class test{
    constructor(){

    }
    async GetFile(){
        let storage:S3=new S3({region:'us-east-1'});
        try{
           
            let resp=await storage.getObject({Bucket:'telecom-sh-crm-planes-public',Key:'planes.json'}).promise();
            
            let json=JSON.parse(resp.Body.toString());
            if(json){
                json.planes.forEach(element => {
                    console.log(element);
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

let t:test=new test();
t.GetFile();
