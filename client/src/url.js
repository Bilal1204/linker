
let url;
if(process.env.NODE_ENV==='production'){
    url = "https://linkers.vercel.app"
}else{
    url = "http://localhost:8080"
}

module.exports = url