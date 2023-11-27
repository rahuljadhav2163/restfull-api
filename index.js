import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import book from "./model/booking.js";
import Bus from "./model/bus.js";
const app = express();
app.use(express.json())

const connectdb = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
        console.log('mongodb connected')
    }
}
connectdb();

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'All Good!' })
})

app.post('/api/bookings', async (req, res) => {
    const { name, age, to, from, adult } = req.body;

    const booking = new book({
        name, age, to, from, adult
    })

    try {
        const savedCustmer = await booking.save();

        return res.status(201).json({
            success: true,
            data: savedCustmer,
            message: "Booking succesfully..!"
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
})

app.get('/api/bookings', async (req, res) => {
    const allBook = await book.find();

    res.status(200).json({
        success: true,
        data: allBook,
        message: "fetch all booking"
    })
})

app.put('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, to, from, adult } = req.body;

    await book.updateOne({ _id: id }, {
        $set: {
            name: name,
            age: age,
            adult: adult,
            to: to,
            from: from
        }
    })

    const updatedCustmer = await book.findOne({ _id: id })

    res.status(200).json({
        success: "true",
        data: updatedCustmer,
        message: "Updated successfully..!"
    })

})

app.patch('/api/bookings/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, to, from, adult } = req.body;

    await book.updateOne({ _id: id }, {
        $set: {
            name: name,
            age: age,
            adult: adult,
            to: to,
            from: from
        }
    })

    const updatedCustmer = await book.findOne({ _id: id })

    res.status(200).json({
        success: "true",
        data: updatedCustmer,
        message: "Updated successfully..!"
    })

})

app.delete('/api/bookings/:id', async(req,res)=>{
    const { id } = req.params

    await book.deleteOne({ _id: id })

    res.status(204).json({
        success: "true",
        message: "Data delete succesfully..!"
    })
})

app.post('/api/v1/buses', async (req, res) => {
    const { name, seats,busno,type } = req.body;

    const busbooking = new Bus({
        name, seats,busno,type 
    })

    try {
        const savedBus = await busbooking.save();

        return res.status(201).json({
            success: true,
            data: savedBus,
            message: "bus data add succesfully..!"
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
})

app.post('/api/v2/buses', async (req, res) => {
    const { name, tatalSeats,busno,type } = req.body;

    const busbooking = new Bus({
        name, tatalSeats,busno,type 
    })

    try {
        const savedBus = await busbooking.save();

        return res.status(201).json({
            success: true,
            data: savedBus,
            message: "bus data add succesfully..!"
        })
    } catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }
})

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});