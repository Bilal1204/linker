const User = require('../models/user')
const jwtDecode = require('jwt-decode')

const saveSocials = async (req,res) =>{
    const {tokenMail, socials} = req.body
    try {
        const decoded = jwtDecode(tokenMail, process.env.SECRET_JWT)
        const email = decoded.email
    const user = await User.findOne({email : email})
    user.socialMedia = socials;
    await user.save();
    return res.json({message : 'saved', status : 'success'})
} catch (error) {
    return res.json({error : error.message, status : 'error'})
    } 
}

const saveProfile = async (req,res) =>{
    const {tokenMail, name, bio, avatar} = req.body
    try {
        const decoded = jwtDecode(tokenMail, process.env.SECRET_JWT)
        const email = decoded.email
    const user = await User.findOne({email : email})
    user.name = name;
    user.bio = bio;
    user.avatar = avatar;
    await user.save();
    return res.json({message : 'saved', status : 'success'})
} catch (error) {
    return res.json({error : error.message, status : 'error'})
    } 
}


const saveLinks = async (req,res) =>{
    const {tokenMail, links} = req.body
    try {
        const decoded = jwtDecode(tokenMail, process.env.SECRET_JWT)
        const email = decoded.email
    const user = await User.findOne({email : email})
    const newLink = links.map((link, i) =>({
        url : link.link.url,
        title : link.link.title,
        icon : ''
    }))
    user.links = newLink;
    await user.save();
    return res.json({message : 'saved', status : 'success'})
} catch (error) {
    return res.json({error : error.message, status : 'error'})
    } 
}

module.exports = {saveSocials, saveProfile, saveLinks}