module.exports = (sequelize, DataTypes) => {
    const Notifications = sequelize.define(
        'Notifications',
        {
          notification_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'user_id' },
            comment: 'Foreign key to the Users table',
          },
          message: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Notification message',
          },
          is_read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: 'Indicates whether the notification has been read',
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Date the notification was sent',
          },
        },
        {
          tableName: 'Notifications',
          timestamps: false,
          comment: 'Table to store user notifications.',
        }
      );
    return Notifications
}