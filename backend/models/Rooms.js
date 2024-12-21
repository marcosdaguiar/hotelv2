module.exports = (sequelize, DataTypes) => {
    const rooms = sequelize.define("rooms", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        room_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'available'
        }
    });

    rooms.associate = (models) => {
        rooms.belongsTo(models.room_types, {
            foreignKey: 'room_type_id'
        });
    };

    return rooms;
};

