const { rooms, room_types, RoomDetails } = require('../models');
const { Sequelize } = require('sequelize');

const roomController = {
	getAllRooms: async (req, res) => {
		try {
			console.log("getting from roomController")
			const listOfRooms = await rooms.findAll();
			res.json(listOfRooms);
		} catch (error) {
			console.error("Error fetching rooms:", error);
			res.status(500).json({ error: "Failed to fetch rooms" });
		}
	},

	getRoomType: async (req, res) => {
		try {
			const roomTypes = await room_types.findAll();
			res.json(roomTypes);
		} catch (error) {
			console.error("Error fetching room types:", error);
			res.status(500).json({ error: "Failed to fetch room types" });
		}
	},

	createRoomType: async (req, res) => {
		try {
			const roomType = req.body;
			const createdRoomType = await room_types.create(roomType);
			res.json(createdRoomType);
		} catch (error) {
			console.error("Error creating room type:", error);
			res.status(500).json({ error: "Failed to create room type" });
		}
	},

	createRoom: async (req, res) => {
		try {
			const room = req.body;
			const newRoom = await rooms.create(room);
			res.json(newRoom);
		} catch (error) {
			console.error("Error creating room:", error);
			res.status(500).json({ error: "Failed to create room" });
		}
	},

	deleteRoom: async (req, res) => {
		try {
			const roomId = req.params.room_id;
			console.log("Request params:", req.params);
			console.log("Received room_id:", roomId);
			
			if (!roomId) {
				console.error("Room ID is undefined");
				return res.status(400).json({ error: "Room ID is required" });
			}

			// Parse room ID to ensure it's a number
			const parsedRoomId = parseInt(roomId);
			if (isNaN(parsedRoomId)) {
				console.error("Invalid room ID format");
				return res.status(400).json({ error: "Invalid room ID format" });
			}

			console.log("Attempting to delete room ID:", parsedRoomId);
			
			const result = await rooms.destroy({
				where: { room_number: parsedRoomId }
			});

			if (result === 0) {
				return res.status(404).json({ error: "Room not found" });
			}
			
			res.json({ message: "DELETED SUCCESSFULLY", deletedRoomId: parsedRoomId });
		} catch (error) {
			console.error("Error deleting room:", error);
			res.status(500).json({ error: "Failed to delete room" });
		}
	},

	updateRoom: async (req, res) => {
		try {
			const roomsUpdate = req.body;
			await rooms.update(roomsUpdate, {
				where: { room_number: roomsUpdate.room_number }
			});
			res.json(roomsUpdate);
		} catch (error) {
			console.error("Error updating room:", error);
			res.status(500).json({ error: "Failed to update room" });
		}
	},

	searchRoomsByBeds: async (req, res) => {
		try {
			const bedCount = parseInt(req.params.bedCount);
			const filteredRooms = await rooms.findAll({
				where: { room_bed_count: bedCount },
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
			console.error("Error searching rooms:", error);
			res.status(500).json({ error: "Failed to search rooms" });
		}
	}, 

	RoomDetails: async (req, res) => {
		try {
			const data = await RoomDetails.findAll();
			res.json(data); // Send the data as a JSON response
		} catch (error) {
			console.error('Error querying the view:', error);
			res.status(500).send('Server error');
		}
	}
};

module.exports = roomController;