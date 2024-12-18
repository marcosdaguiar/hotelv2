module.exports = (sequelize, DataTypes) => {
    const Maintenance = sequelize.define(
        'Maintenance',
        {
          maintenance_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          room_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key to the Rooms table',
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Description of the maintenance issue',
          },
          status: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: 'Status of the maintenance task (e.g., pending, completed)',
          },
          assigned_staff_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'user_id' },
            comment: 'Foreign key to the Users table for assigned staff',
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Date the maintenance was logged or performed',
          },
        },
        {
          tableName: 'Maintenance',
          timestamps: false,
          comment: 'Table to store maintenance requests and tasks.',
        }
      );
    return Maintenance
}