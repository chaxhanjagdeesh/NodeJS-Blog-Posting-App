const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/profile', isLoggedIn, async (req, res) => {
 let user = await userModel.findById(req.user.userid).populate('posts');
//  console.log(user)
 res.render("profile", {user})
});

app.post('/post', isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
// console.log(content)
      let post = await postModel.create({
        content: content,
        user: user._id
      });

      user.posts.push(post._id);
      await user.save();
      res.redirect('/profile');
});

app.get('/like/:id', isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id : req.params.id }).populate("user");
  if(post.likes.includes(req.user.userid) == false){
// console.log(post)
  post.likes.push(req.user.userid);
  }else{
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect('/profile');
});


app.post('/register', async (req, res) => {
  const { username, email, password, age, name } = req.body;

  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send('User already exists');

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const newUser = await userModel.create({
        username,
        name,
        email,
        password: hash,
        age
      });

      let token = jwt.sign({ email: email, userid: newUser._id }, "shhhh");
      res.cookie("token", token);
      res.send("Registered")

    });
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.status(404).send('User not found');

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (!isMatch) { return res.redirect("/login") }

    let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
    res.cookie("token", token);
    res.redirect('/profile');

  });
});

app.get('/logout', async (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");

});

function isLoggedIn(req, res, next) {
  if (req.cookies.token == "") {
    res.redirect('/login');
  } else {
    jwt.verify(req.cookies.token, "shhhh", (err, decoded) => {
      if (err) res.send("Invalid token");
      req.user = decoded;
      next();
    })
  }
}

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});