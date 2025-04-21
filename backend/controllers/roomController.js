const { rooms, room_types, RoomDetails, reservations } = require('../models');
const { Sequelize, Op } = require('sequelize');

const capitalizeWords = (str) => {
	if (!str) return str;
	return str.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
};

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
			const roomTypes = await room_types.findAll({
				attributes: [
					'id',
					'type_name',
					'base_price',
					'max_capacity', 
					'bed_size',
					'bed_qty',
					'description'
				]
			});
			console.log('Room types found:', roomTypes.length); // Debug log
			res.json(roomTypes);
		} catch (error) {
			console.error("Error fetching room types:", error);
			res.status(500).json({ error: "Failed to fetch room types" });
		}
	},

	createRoomType: async (req, res) => {
		try {
			const roomType = req.body;
			const formattedRoomType = {
				...roomType,
				type_name: capitalizeWords(roomType.type_name),
				bed_size: capitalizeWords(roomType.bed_size),
				description: capitalizeWords(roomType.description)
			};
			const createdRoomType = await room_types.create(formattedRoomType);
			res.json(createdRoomType);
		} catch (error) {
			console.error("Error creating room type:", error);
			res.status(500).json({ error: "Failed to create room type" });
		}
	},

	createRoom: async (req, res) => {
		try {
			const room = req.body;
			const formattedRoom = {
				...room,
				room_view: capitalizeWords(room.room_view),
				room_status: capitalizeWords(room.room_status),
				room_notes: capitalizeWords(room.room_notes)
			};
			const newRoom = await rooms.create(formattedRoom);
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
			console.log("Received update data:", roomsUpdate); // Debug log
			
			// Find the room first
			const room = await rooms.findOne({
				where: { room_number: roomsUpdate.room_number }
			});

			if (!room) {
				return res.status(404).json({ error: "Room not found" });
			}

			// Prepare update data while preserving existing values
			const formattedRoom = {
				room_view: capitalizeWords(roomsUpdate.room_view),
				status: capitalizeWords(roomsUpdate.status),
				room_notes: capitalizeWords(roomsUpdate.room_notes),
				room_type_id: roomsUpdate.room_type_id
			};

			console.log("Updating room with:", formattedRoom); // Debug log
			
			const result = await rooms.update(formattedRoom, {
				where: { room_number: roomsUpdate.room_number }
			});
			
			// Fetch the updated room to return the complete data
			const updatedRoom = await rooms.findOne({
				where: { room_number: roomsUpdate.room_number }
			});
			
			res.json(updatedRoom);
		} catch (error) {
			console.error("Error updating room:", error);
			res.status(500).json({ error: "Failed to update room" });
		}
	},

	updateRoomType: async (req, res) => {
		try {
			const roomType = req.body;
			console.log("Updating room type with data:", roomType);
			
			const result = await room_types.update({
				type_name: capitalizeWords(roomType.type_name),
				bed_size: capitalizeWords(roomType.bed_size),
				bed_qty: parseInt(roomType.bed_qty),
				base_price: parseFloat(roomType.base_price),
				max_capacity: parseInt(roomType.max_capacity),
				description: capitalizeWords(roomType.description)
			}, {
				where: { id: roomType.id }
			});

			
			if (result[0] === 0) {
				return res.status(404).json({ error: "Room type not found" });
			}
			
			res.json({ message: "Room type updated successfully", data: roomType });
		} catch (error) {
			console.error("Error updating room type:", error);
			res.status(500).json({ error: "Failed to update room type", details: error.message });
		}
	},

	deleteRoomType: async (req, res) => {
		try {
			const id = req.params.id;
			console.log("Request params:", req.params);
			console.log("Received type_id:", id);
			console.log("Attempting to delete room type:", req.params.type_name );
			
			const result = await room_types.destroy({
				where: { id: id }
			});

			if (result === 0) {
				return res.status(404).json({ error: "Room type not found" });
			}
			
			res.json({ message: "DELETED SUCCESSFULLY" });
		} catch (error) {
			console.error("Error deleting room type:", error);
			res.status(500).json({ error: "Failed to delete room type" });
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
			const data = await RoomDetails.findAll({
				order: [
					['room_number', 'ASC']
				]
			});
			
			res.json(data); // Send the data as a JSON response
		} catch (error) {
			console.error('Error querying the view:', error);
			res.status(500).send('Server error');
		}
	},

	availableRooms: async (req, res) => {
        try {
            const { checkIn, checkOut } = req.query;

            if (!checkIn || !checkOut) {
                return res.status(400).json({ error: 'Check-in and check-out dates are required' });
            }

            const availableRooms = await rooms.findAll({
                attributes: ['id', 'room_number', 'status'],
                include: [{
                    model: room_types,
                    attributes: ['type_name', 'base_price', 'max_capacity', 'bed_size', 'bed_qty', 'description'],
                    required: true
                }],
                where: {
                    [Op.and]: [
                        { status: 'available' },
                        Sequelize.literal(`
                            rooms.id NOT IN (
                                SELECT room_id 
                                FROM reservations 
                                WHERE (
                                    check_in_date <= '${checkOut}' 
                                    AND check_out_date >= '${checkIn}'
                                )
                            )
                        `)
                    ]
                }
            });

            res.json(availableRooms);
        } catch (error) {
            console.error('Error fetching available rooms:', error);
            res.status(500).json({ error: 'Failed to fetch available rooms' });
        }
    }

};
	

module.exports = roomController;