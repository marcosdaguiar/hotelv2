const express = require ('express')
const router = express.Router()
const {rooms, roomConfig} = require('../models');
const { json, Sequelize } = require('sequelize');
const cors = require('cors')


//router.get("/", roomController.getAllRooms);

router.get("/test", async (req, res) =>{
    const listOfRooms = await rooms.findAll();
    res.json(listOfRooms)
})

router.get("/search/beds/:bedCount", async (req, res) => {
    const bedCount = parseInt(req.params.bedCount);
    try {
        const filteredRooms = await rooms.findAll({
            where: {
                room_bed_count: bedCount
            },
            attributes: [
                'room_type',
                'room_bed_count',
                'room_view',
                [Sequelize.fn('MIN', Sequelize.col('room_price')), 'room_price'],
                [Sequelize.fn('COUNT', Sequelize.col('room_id')), 'available_rooms']
            ],
            group: ['room_type', 'room_bed_count', 'room_view']
        });
        res.json(filteredRooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
});




router.post("/", async (req, res) => {
    try {
        console.log("Received data:", req.body); // Debug log
        const room = req.body;
        
        // Validate required fields
        const requiredFields = ['room_id', 'room_type', 'room_bed_size', 'room_bed_count', 'room_view', 'room_status', 'room_price'];
        for (const field of requiredFields) {
            if (!room[field]) {
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }
        
        // Convert string numbers to actual numbers if needed
        const formattedRoom = {
            ...room,
            room_id: Number(room.room_id),
            room_bed_count: Number(room.room_bed_count),
            room_price: Number(room.room_price)
        };
        
        const createdRoom = await rooms.create(formattedRoom);
        console.log("Created room:", createdRoom); // Debug log
        res.json(createdRoom);
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ 
            message: "Failed to create room",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

router.delete("/:room_id", async (req, res) => {
    const room_id = req.params.room_id;
    await rooms.destroy({
        where: {
            room_id: room_id,
        },
    })
    res.json("DELETED SUCCESSFULLY");
})

router.put("/update", async (req, res) => {
    const roomsUpdate = req.body

    await rooms.update({
        room_id: roomsUpdate.room_id,
        room_type: roomsUpdate.room_type,
        room_bed_size: roomsUpdate.room_bed_size,
        room_bed_count: roomsUpdate.room_bed_count,
        room_view: roomsUpdate.room_view,
        room_booked: roomsUpdate.room_booked,
        room_status: roomsUpdate.room_status,
        room_notes: roomsUpdate.room_notes,
        room_price: roomsUpdate.room_price}, {
            where:{
                room_id: roomsUpdate.room_id,
            }
        });
    res.json(roomsUpdate);
})

module.exports = router