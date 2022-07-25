const bodyParser = require("body-parser");
var express = require("express");
var mongoose = require("mongoose");

var app = express();
var port = process.env.PORT || 3000;
var DB = 'mongodb+srv://myweb:k2kb2bdbgv@cluster0.wsgye.mongodb.net/myweb?retryWrites=true&w=majority';
// var DB = 'mongodb://127.0.0.1:27017/library';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
    next();
})
mongoose.connect(DB,{
    // useNewParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindandModify:false
}).then(() => console.log("Connection Successful")).catch(err => console.log(err));

const UserSchema = mongoose.Schema({
    name : {type:String,require:true},
    email : {type:String,require:true},
    mobile : {
        type:Number,
        require : true
    },
    message:{type:String,require:true}
});

const BlogSchema = mongoose.Schema({
    title : {type:String,require:true},
    email : {type:String,require:true},
    img : {type:String, require:true},
    contentblog : {type:String,require:true},
    descblog : {type:String,require:true}
   
})

const User = mongoose.model("User", UserSchema);
const Blog = mongoose.model("Blog", BlogSchema);
// const CheUser = new User({
//     name:"Swapnil",
//     email: "swapnilsekhande@gmail.com",
//     mobile:8956902893,
//     message:"Testing"
// })

app.get('/',(req,res) => {
    res.send("Hello")
})

// CheUser.save().then(()=>console.log("UserSavedSuccessfully")).catch(err => console.log(err));
app.get('/',(req,res) => {
    res.send("Hello")
})


app.post('/post-blog', (req,res)=> {
    
    const CheBlog = new Blog(
        {
            title : req.body.title,
            email :req.body.email,
            img : req.body.img,
            contentblog : req.body.contentblog,
            descblog : req.body.descblog
           
        }
    )
console.log(CheBlog);
    CheBlog.save().then(()=>res.send({"Status":"UserSavedSuccessfully"})).catch(err => console.log(err));
})

app.get('/show-blog-content', (req,res) => {
    Blog.find({}).then((response) => res.send(response)).catch(err => console.log(err));
})

app.post("/delete-blog-data",(req,res)=> {
    const SwapObjNew = {
        _id:req.body.id
    }
    Blog.deleteOne(SwapObjNew).then(response => res.send(response)).catch(err => console.log(err));
})


app.post('/post-message',(req,res)=>{
    
    const CheUser = new User({
    name:req.body.name,
    email: req.body.email,
    mobile:req.body.mobile,
    message:req.body.message
    })

    CheUser.save().then(()=>res.send({"Status":"UserSavedSuccessfully"})).catch(err => console.log(err));

})

app.post('/delete-message',(req,res)=> {
    User.deleteOne({_id:req.body._id}).then(() => res.send({"status":"deleted"})).catch(err => res.send(err));
})


app.get('/show-Users-messages', (req, res)=>{
    User.find({}).then((user)=>res.send(user)).catch(err=> res.send(err));
})


app.listen(port, ()=> {
    console.log("Starting At Port"+port);
});
