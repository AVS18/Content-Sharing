const express = require('express');
const router = express.Router()
const User = require('../models/User');

router.post('/', async(req, res) => {
    const { username, password } = req.body.obj;
    const finduser = await User.findOne({
        username: username,
        password:password
    })
    if(finduser != null)
    {
        res.json({
            message: "Login Success",
            status:true,
            type:finduser.type
        })
    }
    else
    {
        res.json({
            message: "Please Check your username/password and try again",
            status:false
        })
    }
})
module.exports = router