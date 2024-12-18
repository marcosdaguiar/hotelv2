module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define(
        'Feedback',
        {
          review_id: {
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
          reservation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Reservations', key: 'reservation_id' },
            comment: 'Foreign key to the Reservations table',
          },
          rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Rating given by the guest',
          },
          comments: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: 'Feedback comments provided by the guest',
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Date the feedback was provided',
          },
        },
        {
          tableName: 'Feedback',
          timestamps: false,
          comment: 'Table to store feedback from guests.',
        }
    );
    return Feedback
}