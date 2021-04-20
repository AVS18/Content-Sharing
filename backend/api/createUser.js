const express = require('express');
const router = express.Router()
const User = require('../models/User');

router.post('/', async(req, res) => {
    const { name, email, username, password,type } = req.body.obj;
    const finduser = await User.findOne({
        username: username
    })
    if (finduser == null)
    {
        const newUser = new User({
            name: name, email: email, username: username, password: password, type: type
        })
        newUser.save()
            .then(() => res.json({
                message: "Created account successfully",
                status:true
            }))
            .catch(err => res.status(400).json({
                "error": err,
                "message": "Error creating account",
                status:false
            }))
    }
    else{
        res.json({
            "message": "Username Already Exists",
            status: false
        })
    }
})
module.exports = router