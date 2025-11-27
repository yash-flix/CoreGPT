import express from "express";
import 'dotenv/config';
import cors from "cors";
import mongoose from "mongoose"
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use("/api" , chatRoutes);

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
  connectDB();
});

const connectDB = async()=>
{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.log("Failed to connect with the DB", error);
        res.status(500).json({error: "Failed to connect with the DB"})
    }
   
}


// app.post("/test" , async(req,res)=>
// {
//     const options = {
//         method:POST,
//         headers :{
//             "Content-Type": "application/json" ,
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         }, 
//         body: JSON.stringify({
//             model: "gpt-4o-mini" , 
//             messages : [{
//                 role : "user",
//                 content : req.body.message
//             }]
//         })
//     }
//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions" , options );
//         const data = await response.json();
//         const reply = data.choices[0].message.content
//        // console.log(reply)
//         res.send(reply);
//     } catch (error) {
//         console.log(error)
        
//     }
// })