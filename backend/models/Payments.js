module.exports = (sequelize, DataTypes) => {

    const Payments = sequelize.define(
        'Payments',
        {
        payment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        reservation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key to the Reservations table',
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Amount of the payment',
        },
        payment_date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Date and time of the payment',
        },
        payment_method: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: 'Payment method used (e.g., credit card, cash)',
        },
        status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: 'Status of the payment (e.g., completed, pending)',
        },
        },
        {
        tableName: 'Payments',
        timestamps: false,
        comment: 'Table to store payment transactions.',
        }
    );
    return Payments
}