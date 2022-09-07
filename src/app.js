const express = require('express')
const app = express();
require('./db/conn')
const path = require('path')
const hbs = require('hbs')
const { error } = require('console')
const User = require('./modules/usermessage')
const mongoose = require('mongoose')
bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000

const templatepath = path.join(__dirname, '../src/templates/views')
const partialpath = path.join(__dirname, "../src/templates/partial");

app.use(express.json());
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')))
app.use('/images', express.static(path.join(__dirname, '/templates/images')))
app.use('/partial', express.static(path.join(__dirname, '../styles/partial')))
app.use('/images', express.static(path.join(__dirname, '/templates/images')))

app.set('view engine', 'hbs')
app.set('views', templatepath)
hbs.registerPartials(partialpath);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.hbs')
})
app.get('/index', (req, res) => {
    res.render('index.hbs')
})
app.get('/classes', (req, res) => {
    res.render('classes.hbs')
})
app.get('/personal-trainers', (req, res) => {
    res.render('personal-trainers.hbs')
})
app.get('/prices', (req, res) => {
    res.render('prices.hbs')
})
app.get('/schedule', (req, res) => {
    res.render('schedule.hbs')
})
app.get('/signup', (req, res) => {
    res.render('signup.hbs')
})
app.get('/signin', (req, res) => {
    res.render('signin.hbs')
})

app.post('/signup', async (req, res) => {
    try {
        const userData = new User(req.body);
        await userData.save();
        res.render('index.hbs');
    }
    catch (Error) {
        res.status(500).send(error)
    }
})
app.post('/signin', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // const useremail = await User.findOne({ email: email })
        if (password === "password" && email === "admin123@gmail.com") {
            res.render("admin/index1.hbs")
        } else {
            res.send("Invalid Login Details")
        }
    } catch (error) {
        res.status(400).send("Invalid login detail")
    }
})

app.listen(port, (req, res) => {
    console.log("Server is running at 5000")
});







var schema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    // password: String,
    message: String,
})
var detailsModel = mongoose.model("users", schema);
app.get("/learners-admin", function (req, res) {
    detailsModel.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("admin/display.ejs", { details: allDetails })
        }
    })
})

app.get('/index-admin', (req, res) => {
    res.render('admin/index1.hbs')
})
app.get('/classes-admin', (req, res) => {
    res.render('admin/classes1.hbs')
})
app.get('/personal-trainers-admin', (req, res) => {
    res.render('admin/personal-trainers1.hbs')
})
app.get('/prices-admin', (req, res) => {
    res.render('admin/prices1.hbs')
})
app.get('/schedule-admin', (req, res) => {
    res.render('admin/schedule1.hbs')
})
app.get('/logout', (req, res) => {
    res.render('index.hbs')
})
app.get("/getemail",async function (request, response){
    global.firstname = request.query.firstname;
    if (firstname != "") {
        let result = await User.deleteOne({
            name : firstname
        })
        console.warn(result);
        if((await result).acknowledged)
        {
            response.redirect('back');
        }}
        else {
        response.send("Please provide us first name");
    }
});
