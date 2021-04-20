const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subscriberSchema = new Schema({
    subscribed_by: {
        type: String,
        required: true
    },
    subscribed_to: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Subscriber", subscriberSchema, "subscribers")