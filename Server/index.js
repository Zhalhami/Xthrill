import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const API_KEY = "8b79f6c4a70048f99dde56e4e696b0ae"
app.use(cors());
app.use(express.json());

app.get('/username', function (req, res){
    res.json({message: "Salami"})
})

const PORT = process.env.port || 5000
app.listen(PORT, function(){
    console.log(`Server started running at port ${PORT}`)
})