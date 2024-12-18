module.exports = (sequelize, DataTypes) => {
    const Guests = sequelize.define(
        'Guests',
        {
        guest_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'First name of the guest',
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Last name of the guest',
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            comment: 'Email address of the guest',
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: 'Phone number of the guest',
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Address of the guest',
        },
        },
        {
        tableName: 'Guests',
        timestamps: false,
        comment: 'Table to store guest details.',
        }
    );
    return Guests
}