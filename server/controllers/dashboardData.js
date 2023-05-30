const User = require('../models/user')
const  jwtDecode =  require("jwt-decode");


const dashboardData = async (req,res) =>{    
    const {tokenMail} = req.body;
    // console.log({tokenMail})
    try{
        const decodedToken = jwtDecode(tokenMail, process.env.SECRET_JWT)
        const email = decodedToken.email
        // console.log({decodedToken})
        const user = await User.findOne({email : email})
        const userData = {
            name : user.name,
            role : user.role,
            bio: user.bio,
            avatar : user.avatar,
            handle : user.handle,
            links : user.links.length
        }
        return res.json({message : 'Success from backend', userData, status : 'Okay'})
    }catch(err){
        return res.json({status : 'error', error : err.message})
    }
}

module.exports = {dashboardData}