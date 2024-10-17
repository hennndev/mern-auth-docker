const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const authRoutes = require("./routers/auth.routes")
require("dotenv").config({})
const app = express()

app.use(cors())
app.use(express.json())
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(process.env.PORT || 3001, () => console.log("Server connected"))
}).catch(() => console.log("Something went wrong with server configuration"))

app.get("/", (req, res) => {
    res.send("Welcome to REST API default route")
})
app.use(authRoutes)


