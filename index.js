const express = require('express')
const app =  express()
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const {registerUser, loginUser} = require('./controllers/auth')
const {dashboardData}  = require('./controllers/dashboardData')
const {getUserData, getUserSocials} = require('./controllers/getUserData')
const {saveSocials,saveProfile, saveLinks} = require('./controllers/saveItems')
const {loadSocials, loadLinks} = require('./controllers/loadPrevious')
const {MONGO_URI,SECRET_JWT} = require('./config/keys')
const port = process.env.PORT || 8080
const path = require('path')

app.use(express.json())
app.use(cors({credentials: true, origin: true}))
dotenv.config();

mongoose.set('strictQuery',false)

mongoose.connect(MONGO_URI)
.then(()=>console.log('Mongodb Connected'))
.catch(err => console.log(err))

// app.get('/',(req,res) =>{
//     res.send('Hello There')
// })

app.post('/api/register',registerUser)
app.post('/api/login',loginUser)

app.post('/data/dashboard',dashboardData)

app.post('/save/socials',saveSocials)
app.post('/load/socials',loadSocials)

app.post('/load/links',loadLinks)

app.get('/get/:handle', getUserData);
app.get('/get/socials/:handle', getUserSocials);

app.post('/save/profile',saveProfile)
app.post('/save/links',saveLinks)

// if(process.env.NODE_ENV == 'production'){
//     app.get('/',(req,res)=>{
//         app.use(express.static(path.resolve(__dirname,'client','build')))
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})