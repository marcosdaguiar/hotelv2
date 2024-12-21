const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get("/", roomController.getAllRooms);
router.get("/search/beds/:bedCount", roomController.searchRoomsByBeds);
router.post("/", roomController.createRoom);
router.delete("/:room_id", roomController.deleteRoom);
router.put("/update", roomController.updateRoom);
router.get("/rooms_details", roomController.RoomDetails);
router.get("/room_types", roomController.getRoomType);
router.post("/create_room_type", roomController.createRoomType)
router.put("/update_room_type", roomController.updateRoomType)
router.delete("/delete_room_type/:id", roomController.deleteRoomType)
router.get("/available", roomController.availableRooms);
module.exports = router;
