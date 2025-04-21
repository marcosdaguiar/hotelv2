module.exports = (sequelize, DataTypes) => {
    const Reservations = sequelize.define(
        'Reservations',
        {
            reservation_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            guest_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Guests', key: 'guest_id' },
                comment: 'Foreign key to the Guests table',
            },
            room_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'Foreign key to the Rooms table',
            },
            check_in_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: 'Check-in date for the reservation',
            },
            check_out_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: 'Check-out date for the reservation',
            },
            total_cost: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                comment: 'Total cost of the reservation',
            },
            status: {
                type: DataTypes.STRING(20),
                allowNull: false,
                comment: 'Status of the reservation (e.g., confirmed, cancelled)',
            },
        },
        {
        tableName: 'Reservations',
        timestamps: true,
        comment: 'Table to store reservation details.',
        }
    );

    Reservations.associate = function(models) {
        Reservations.belongsTo(models.rooms, {
            foreignKey: 'room_id',
            targetKey: 'id'
        });
    };

    return Reservations;
}