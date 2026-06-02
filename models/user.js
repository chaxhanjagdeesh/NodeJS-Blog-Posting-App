const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/MongoDBreference').then(() => console.log('MongoDB connected...')).catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    posts: [{type:mongoose.Schema.Types.ObjectId, ref: "Post"}]
})


const User = mongoose.model('User', userSchema);

module.exports = User;