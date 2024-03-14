require('dotenv').config();
const mongoose = require('mongoose');

// console.log('Starting',process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI);

const connections = mongoose.connection;

connections.on('connected',()=>{
    console.log('mongo Db connection successfully connected')
});
connections.on('error',(err)=>{
    console.log(`mongo error Db connection ${err}`)
});

module.exports = connections;