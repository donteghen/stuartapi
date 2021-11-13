const express = require('express')
const Courier =  require('../models/courier')
const router = express.Router()

router.get('/couriers', async (req, res) => {
    try {
        const couriers = await Courier.find()
        res.send(couriers)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/couriers/:id', async (req, res) => {
    res.send('couries')
})

router.post('/couriers', async (req, res) => {
    try {
        const newCourier = new Courier({
            max_capacity: req.body.max_capacity,
            curr_capacity:req.body.max_capacity,
            available_capacity:0
        });
        const courier = await newCourier.save()
        if (!courier) {
            throw new Error('courier createion failed!')
        }
        res.send(courier)
    } catch (error) {
        res.send(error.message)      
    }
})

router.patch('/couriers/:id/remove_capacity', async (req, res) => {
    try {
        const courier = await Courier.findById(req.params.id)
        if (!courier) {
            throw new Error('Courier not found!')
        }
        if (courier.curr_capacity < req.body.used_capacity) {
            throw new Error('')
        }
        courier.curr_capacity = courier.curr_capacity - req.body.used_capacity;
        courier.available_capacity =  courier.max_capacity - courier.curr_capacity;
        const savedCourier = await courier.save();
        res.send(savedCourier);
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.patch('/couriers/:id/add_capacity', async (req, res) => {
    try {
        const courier = await Courier.findById(req.params.id)
        if (!courier) {
            throw new Error('Courier not found!')
        }
        if(req.body.fill_capacity > courier.available_capacity){
            throw new Error(`This courier\'s current available space is : ${courier.available_capacity}`)
        }
        courier.curr_capacity = courier.curr_capacity + req.body.fill_capacity;
        courier.available_capacity =  courier.max_capacity - courier.curr_capacity;
        const savedCourier = await courier.save();
        res.send(savedCourier);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/couriers/lookup', async (req, res) => {
    try {
        const {capacity_required} = req.body;
        const couriers = await Courier.find({
            available_capacity: { $gte: capacity_required }
        })
        if (!couriers) { 
            throw new Error('Courier not found!')
        }
        res.send(couriers);
    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports = router;