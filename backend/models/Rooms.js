module.exports = (sequelize, DataTypes) => {

const Room = sequelize.define(
    'rooms',
    {
        room_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        room_type_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_view: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        room_notes: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Room;
}
