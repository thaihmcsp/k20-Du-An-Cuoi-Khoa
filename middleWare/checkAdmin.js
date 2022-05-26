const userModel = require("../models/userModel");

async function checkAdmin(req , res ,next) {
    try {
        let token = req.cookies.user
        if (token) {
            const account = await userModel.findOne({
                token : token
            })
            if (account.role === 'admin') {
                next()
            } else {
                res.redirect('/home')
            }
        } else {
            res.redirect("/home");
        }
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = checkAdmin;