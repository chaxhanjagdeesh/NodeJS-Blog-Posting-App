const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    profilePic: {
        type: String,
        default: "default-profile-pic.jpg"
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
})


const User = mongoose.model('User', userSchema);

module.exports = User;