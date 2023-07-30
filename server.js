require('dotenv').config()
const express = require('express');
const cors = require("cors");
const dbConnect = require('./utils/db')
const app = express();
dbConnect()
const port = process.env.PORT;
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});
app.use(cors({
    credentials: true,
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    exposedHeaders: ["set-cookie"]
}))
app.use(express.json())



const routePass = require('./utils/authorizationpass');
app.use(routePass)
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')

app.use("/api", userRouter);
app.use("/api", blogRouter);

app.get('/', async (req, res) => {
    res.send(`<marquee><h1 style="color:green">Welcome! This is ENVERX </h1></marquee>`)
})

app.listen(port, () => {
    console.log('listening on', port);
})



