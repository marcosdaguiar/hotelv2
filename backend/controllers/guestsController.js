const { Guests } = require('../models'); // Ensure the model is correctly imported
const { Op, Sequelize } = require('sequelize');

const capitalizeWords = (str) => {
    if (!str) return str;
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

const lowercase = (str) => {
    if (!str) return str;
    return str.toLowerCase();
};

const createGuest = async (req, res) => {
    try {
        const guest = req.body;
        const formattedGuest = {
            ...guest,
            first_name: capitalizeWords(guest.first_name),
            last_name: capitalizeWords(guest.last_name),
            email: lowercase(guest.email),
            phone_number: guest.phone_number,
            address: capitalizeWords(guest.address),
            apt: capitalizeWords(guest.apt),
            city: capitalizeWords(guest.city),
            state: capitalizeWords(guest.state),
            country: capitalizeWords(guest.country)
        };
        const newGuest = await Guests.create(formattedGuest);
        res.json(newGuest);
    } catch (error) {
        console.error("Error creating guest:", error);
        res.status(500).json({ error: "Failed to create guest" });
    }
};

const getAllGuests = async (req, res) => {
    try {
        const guests = await Guests.findAll({
            order: [
                ['first_name', 'ASC'],
                ['last_name', 'ASC']
            ]
        });
        res.json(guests);
    } catch (error) {
        console.error("Error fetching all guests:", error);
        res.status(500).json({ error: "Failed to fetch guests" });
    }
};

const searchGuests = async (req, res) => {
    try {
        const { searchTerm, searchType } = req.query;
        
        if (!searchTerm || !searchType) {
            return res.status(400).json({ error: "Search term and type required" });
        }

        const whereClause = {};
        
        switch(searchType) {
            case 'first_name':
                whereClause.first_name = Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('first_name')),
                    'LIKE',
                    `%${searchTerm.toLowerCase()}%`
                );
                break;
            case 'last_name':
                whereClause.last_name = Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('last_name')),
                    'LIKE',
                    `%${searchTerm.toLowerCase()}%`
                );
                break;
            case 'phone_number':
                whereClause.phone_number = { [Op.like]: `%${searchTerm}%` };
                break;
            default:
                return res.status(400).json({ error: "Invalid search type" });
        }

        const guests = await Guests.findAll({
            where: whereClause,
            order: [['first_name', 'ASC']]
        });

        res.json(guests);
    } catch (error) {
        console.error("Error searching guests:", error);
        res.status(500).json({ error: "Failed to search guests", details: error.message });
    }
};


module.exports = {
    createGuest,
    searchGuests,
    getAllGuests, // Add this line
};