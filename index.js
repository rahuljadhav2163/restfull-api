import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import book from "./model/booking.js";
const app = express();
app.use(express.json())

const connectdb = async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if(conn){
        console.log('mongodb connected')
    }
}
connectdb();

app.get('/api/health', (req, res) => {
    res.json({status: 'All Good!'})
})

app.post('/api/bookings',async(req,res)=>{
    
})


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});