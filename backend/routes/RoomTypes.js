const express = require('express');
const router = express.Router();
const { roomConfig } = require('../models');

router.get("/", async (req, res) => {
	try {
		const roomTypes = await roomConfig.findAll();
		res.json(roomTypes);
	} catch (error) {
		console.error("Error fetching room types:", error);
		res.status(500).json({ error: "Failed to fetch room types" });
	}
});

module.exports = router;