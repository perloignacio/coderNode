let admin = require('firebase-admin')
let { options } = require('../../configs/config')
const serviceAccount = require(options.Firebase);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
    
const db = admin.firestore()

module.exports=db; 