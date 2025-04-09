const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
require("dotenv").config();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const tripsRouter = require('./routes/trips');

const PORT = process.env.PORT || 4000

// database connect
database.connect();

// add middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connect
cloudinaryConnect();

//routes
app.use("/api/v1/auth" , userRoutes);
app.use('/trips', tripsRouter);


// defRoute
app.get("/", (req,res)=>{
 return res.json({
    success:true,
    message:"server is up and running",
 });
});

// activate the server
app.listen(PORT , ()=>{
    console.log(`App is Successfully runnning at ${PORT} port`);
})
