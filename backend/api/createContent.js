const express = require('express');
const router = express.Router()
const Content = require('../models/Content')
const User = require('../models/User')
router.post('/', async(req, res) => {
    const { username, link, description } = req.body.obj;
    const checkUser = await User.findOne({
        username: username
    })
    if (checkUser != null)
    {
        const content = new Content({
            created_by : username, link, description
        })
        content.save()
            .then(() => res.json({
                message: "Content Added Successfully",
                status:true
            }))
            .catch(err => res.status(400).json({
                "error": err,
                "message": "Error in Adding Content",
                status:false
            }))
    }
    else{
        res.json({
            "message": "No Such User exists",
            status: false
        })
    }
})
module.exports = router