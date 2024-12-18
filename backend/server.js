const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const roomRoutes = require('./routes/roomRoutes');
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/rooms', roomRoutes);

// Error handling
app.use(errorHandler);

// Database connection and server start
const startServer = async () => {
    try {
        await db.sequelize.sync();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
