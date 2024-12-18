module.exports = (sequelize, DataTypes) => {
    const RoomDetails = sequelize.define('RoomDetails', {
        // Define the columns that exist in the view, or use dynamic querying
        room_id: {
            type: DataTypes.INTEGER,
            primaryKey: true // Optional if the view has a unique identifier
        },
        room_number: DataTypes.INTEGER,
        room_type_id: DataTypes.INTEGER,
        type_name: DataTypes.STRING,
        room_type_description: DataTypes.STRING,
        room_view: DataTypes.STRING,
        room_status:DataTypes.STRING,
        room_notes:DataTypes.STRING,
        bed_size:DataTypes.STRING,
        bed_qty:DataTypes.INTEGER,
        max_capacity:DataTypes.INTEGER,
        room_base_price:DataTypes.INTEGER

    }, {
        tableName: 'vw_room_details', // Specify the name of the view
        timestamps: false // Views don't usually have createdAt or updatedAt
    });
    return RoomDetails;
};