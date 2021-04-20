const express = require('express');
const router = express.Router()
const User = require('../models/User');
const Content = require('../models/Content');
const Subscriber = require('../models/Subscriber')

router.post('/', async(req, res) => {
    const { username } = req.body.obj;
    const correctUser = await User.findOne({
        username
    })
    if (correctUser != null) //user exist
    {
        const subscribers_available = await Subscriber.find({subscribed_by:username}).select('subscribed_to')
        var past_subs_username = []
        for(var i=0;i<subscribers_available.length;i++)
        past_subs_username.push(subscribers_available[i].subscribed_to)
        const obj = await Content.find({created_by:{$in:past_subs_username}})
        if (obj !=null){
            res.json({
                contents:obj,
                message: "Retrived Successfully",
                status:true
            })
        }
        else{
            res.json({
                message: "Try later",
                status:false
            })
        }
    }
    else{
        res.json({
            "message": "No Such User exists",
            status: false
        })
    }
})
module.exports = router