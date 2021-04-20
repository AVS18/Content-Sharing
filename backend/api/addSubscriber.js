const express = require('express');
const router = express.Router()
const Subscriber = require('../models/Subscriber');
const User = require('../models/User');

router.post('/', async(req, res) => {
    const { subscribed_by, subscribed_to } = req.body.obj;
    const subscribed_by_user = await User.findOne({
        username: subscribed_by
    })
    const subscribed_to_user = await User.findOne({
        username: subscribed_to
    })
    if (subscribed_by_user != null && subscribed_by_user != null)
    {
        const subscription = new Subscriber({
            subscribed_by : subscribed_by_user.username, subscribed_to : subscribed_to_user.username
        })
        subscription.save()
            .then(() => res.json({
                message: "Subscribed Successfully",
                status:true
            }))
            .catch(err => res.status(400).json({
                "error": err,
                "message": "Not Subscribed",
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