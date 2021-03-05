const express= require('express')
const request= require('request')
const app= express()
const dotenv= require('dotenv')
dotenv.config()
app.set("view engine","ejs")
app.use('/public',express.static('public'))

app.get("/",(req,res)=>{
    res.render("homepage")
})
app.get("/aboutme",(req,res)=>{
    res.render("Aboutme")
})
app.get("/result",(req,res)=>{
    console.log(process.env.API_KEY)
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            const data= JSON.parse(body)
            res.render("result", {movieData: data})
        }else{
            res.send("uh oh error")
        }
    })
})
app.get("/result/:id",(req,res)=>{1
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            const data= JSON.parse(body)
            res.render("movieinfo",{movieData:data})
        }else{
            res.send("uh oh error")
        }
    })
})
app.get("*",(req,res)=>{
    res.send("Illegal response")
})
app.listen(3000,()=>{
    console.log("Server has started")
})