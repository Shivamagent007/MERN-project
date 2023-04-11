const mongoose = require("mongoose");
mongoose.set('strictQuery', false);



const { ServerApiVersion } = require('mongodb');



const connectDatabase =()=> {
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,serverApi: ServerApiVersion.v1 })
.then((data)=>{
    console.log(`Mongodb connected with server: ${data.connection.host}`)
})
}



module.exports = connectDatabase