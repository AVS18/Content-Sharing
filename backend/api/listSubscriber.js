const express = require('express');
const router = express.Router()
const User = require('../models/User');

const Subscriber = require('../models/Subscriber');

router.post('/', async(req, res) => {
    const { subscribed_by } = req.body.obj;
    const subscribed_by_user = await User.findOne({
        username: subscribed_by
    })
    if (subscribed_by_user != null) //user exist
    {
        const subscribers_available = await Subscriber.find({subscribed_by}).select('subscribed_to')
        var past_subs_username = []
        for(var i=0;i<subscribers_available.length;i++)
        past_subs_username.push(subscribers_available[i].subscribed_to)
        const obj = await User.find({type:'creator',username:{$nin:past_subs_username}}).select('username')
        if (obj !=null){
            res.json({
                subscribers:obj,
                message: "Subscribed Successfully",
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