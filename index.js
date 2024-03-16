import express from "express" ; 
import bodyParser from "body-parser" ; 

const app = express() ; 
const port = 3000 ; 

app.use(bodyParser.urlencoded({extended:true})) ; 
app.use(express.static("public")) ; 

var activeUser = -1 ; 
const data = [] ;
data.push(["shivam","Nature has always captivated the human soul with its beauty and mystery. In this blog post, we'll delve into the wonders of nature, from serene landscapes to awe-inspiring wildlife. Join us on a journey to appreciate the intricate balance of ecosystems and the importance of preserving our natural world."]) ; 
data.push(["Aman","In an era dominated by technology, its influence on society is undeniable. From the way we communicate to the jobs we do, technology has reshaped our lives. This blog explores the positive and negative impacts of technology on society, discussing topics such as automation, social media, and the future of work."]) ; 
data.push(["gopal","Embark on a gastronomic journey around the world as we explore the diverse and delicious cuisines that different cultures have to offer. From the spicy street food of India to the delicate pastries of France, get ready to tantalize your taste buds and learn more about the rich tapestry of global flavors."]) ;
data.push(["Surya","In the hustle and bustle of modern life, taking care of our mental well-being is crucial. This blog explores the concept of mindfulness and its positive impact on mental health. Discover simple mindfulness exercises, learn about the benefits of meditation, and find practical tips for incorporating mindfulness into your daily routine. Join us on a journey toward a more balanced and centered life."]) ; 

function insertBlog(blog){
    data.push([activeUser,blog]) ; 
}

app.get("/logout",(req,res)=>{
    activeUser = -1 ; 
    res.render("login.ejs") ;
})
app.get("/home",(req,res)=>{
    res.render("home.ejs",{data:data,});
}); 
app.get("/myFeed",(req,res)=>{
    res.render("home.ejs",{myFeed:true ,arr : data,activeUser:activeUser,flag : true, }) ; 
})
app.get("/newUpload",(req,res)=>{
    res.render("home.ejs",{post:true,}) ;
})
app.post("/input",(req,res)=>{
    console.log(req.body) ; 
    console.log(activeUser) ; 
    insertBlog(req.body["blog"]) ; 
    res.render("home.ejs",{data:data,}) ; 
})

// login Page Below : 
const users = new Map() ; 
users.set("root","root") ;  

function checkCredentials(userName , password){
    if(users.get(userName)!==password)return false ; 
    activeUser = userName ;
    return true ; 
}
function addUser(userName,password){
  users.set(userName,password) ; 
}

app.post("/signin",(req,res)=>{
    res.render("login.ejs") ; 
}) 
app.post("/create",(req,res)=>{
    const userName = req.body['userId'];
    const password = req.body['password'];

    if (users.has(userName)) {
        res.render("login.ejs", { error: "User Name already used !!", flag: true });
    } else {
        addUser(userName, password);
        res.render("login.ejs", { error: "Successfully Created !!" });
    }
})
app.post("/register",(req,res)=>{
    res.render("login.ejs",{flag:true,}) ; 
})
app.post("/submit",(req,res)=>{
    const userName = req.body['userId'];
    const password = req.body['password'];

    if (checkCredentials(userName, password)) {
        res.render("home.ejs",{data:data,});
    } else {
        res.render("login.ejs", { error: "Wrong Credentials !!" });
    }
})
app.get("/",(req,res)=>{
    res.render("login.ejs") ; 
})
app.listen(port,()=>{
    console.log(`Server running on port ${port}`) ; 
})