const User = require('../models/user')
const jwt = require('jsonwebtoken')

const registerUser = async (req,res) =>{
    const {handle,email,password,category} = req.body;
    try{
        const defaultLink = {url : 'bilalshaikh.bio.link', title : 'Bilals Website', icon : ''}
        const user = await User.create({handle, email, password, role: category, links : [defaultLink]})
        // console.log({user})
    const token = jwt.sign({email : email}, process.env.SECRET_JWT)
    return res.json({message : 'User Created', status : 'Success', 'token' : token, id : user._id})
}
catch(err){
        if(err.code === '11000'){
            return res.json({message : 'Try with different handle or email', status : 'Error'})
        }
        return res.json({message : err.message, status : 'Error'})
    }
}

const loginUser = (req,res) =>{
    const {email,password} = req.body;
    try{
        const user = User.findOne({email : email, password : password})
        console.log({user})
        if(!user){
            return res.json({status : 'not found', error : 'Invalid Credentials'})
        }
        const token = jwt.sign({email : email}, process.env.SECRET_JWT)
        return res.json({message : 'User Found', status : 'Success', 'token' : token, id : user._id})
    } catch(err){
        return res.json({message : err.message, status : 'Error'})
    }
}

module.exports = {registerUser, loginUser}