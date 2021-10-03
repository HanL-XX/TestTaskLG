const express = require('express')
const app = express();
const dotenv = require("dotenv")
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose')
dotenv.config({ path: "./config.env" })
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
    console.log("Connected to DB")
})

mongoose.connection.on("error", (err) => {
    console.log("error", err)
})

app.use(express.json())
app.use(cors());
app.use(morgan('short'));
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', require("./routers/user"));

app.get('/', (req, res) => {
    res.send("Welcome to User")
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
