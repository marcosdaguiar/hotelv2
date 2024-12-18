module.exports = (sequelize, DataTypes) => {
    const ServiceUsage = sequelize.define(
        'Service_Usage',
        {
        usage_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        reservation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key to the Reservations table',
        },
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key to the Services table',
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Date and time the service was used',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Quantity of the service used',
        },
        total_cost: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Total cost of the service usage',
        },
        },
        {
        tableName: 'Service_Usage',
        timestamps: false,
        comment: 'Table to track usage of services by guests.',
        }
    );
    return ServiceUsage
}