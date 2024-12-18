module.exports = (sequelize, DataTypes) => {
    const Services = sequelize.define(
        'Services',
        {
        service_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Name of the service',
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Price of the service',
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Description of the service',
        },
        },
        {
        tableName: 'Services',
        timestamps: false,
        comment: 'Table to store available services.',
        }
    );
    return Services
}