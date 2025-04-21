const express = require('express');
const router = express.Router();
const guestsController = require('../controllers/guestsController'); // Ensure this path is correct

router.post("/newGuest", guestsController.createGuest); // Ensure the HTTP method and path are correct
router.get("/searchGuests", guestsController.searchGuests); // Add this line
router.get("/getAllGuests", guestsController.getAllGuests); // Add this line
module.exports = router;
