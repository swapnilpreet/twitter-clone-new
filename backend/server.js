const express = require('express');
require('dotenv').config();
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());

const connections = require('./config/dbconfig.js');
const PostRoute = require('./routes/post.Routes');
const UserRoute = require("./routes/user.Routes");
const BookmarksRoute = require("./routes/bookmark.Routes");
const CommentRoute = require('./routes/comment.Routes.js');
const PaymentRoute = require('./routes/payment.Routes.js');

const port = process.env.PORT || 8080;

app.use('/api',PostRoute);
app.use('/api/user',UserRoute);
app.use('/api/bookmarks',BookmarksRoute);
app.use('/api/comment',CommentRoute);
app.use('/api/payment',PaymentRoute);

const path = require('path');
__dirname=path.resolve();



if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')));
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}


app.listen(port,()=>{
    connections;
    console.log(`listening on ${port}`);
})
