module.exports = (sequelize, DataTypes) => {
    const DynamicPricing = sequelize.define(
        'DynamicPricing',
        {
          pricing_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          room_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'Foreign key to the Room_Types table',
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: 'Date for the dynamic price',
          },
          price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: 'Dynamic price for the specified room type and date',
          },
        },
        {
          tableName: 'DynamicPricing',
          timestamps: false,
          comment: 'Table to store dynamic pricing for room types.',
        }
      );
    return DynamicPricing
}