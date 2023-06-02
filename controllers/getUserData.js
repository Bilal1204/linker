const User = require('../models/user')

const getUserData = async( req,res) =>{
    const handle = req.params.handle;
    try {
        const user = await User.findOne({handle : handle})        
        // console.log({user})
        if(!user) return res.json({message : 'error', error : 'User Not Found'})
        const userData = {
            name : user?.name,
            avatar : user?.avatar,
            bio : user?.bio,
            links : user.links
        }
        return res.json({message : 'found', userData, status : 'success'})
    } catch (err) {
        console.log(err)
        return res.json({message : 'error', error : err.message})
    }
}

const getUserSocials = async (req,res) =>{
    const handle = req.params.handle;
    try {
        const user = await User.findOne({handle : handle})        
        // console.log({user})
        if(!user) return res.json({message : 'error', error : 'User Not Found'})
        const  socials = user.socialMedia 
        return res.json({message : 'found', socials, status : 'success'})
    } catch (err) {
        console.log(err)
        return res.json({message : 'error', error : err.message})
    }
}

module.exports = {getUserData, getUserSocials}