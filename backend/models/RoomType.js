module.exports = (sequelize, DataTypes) => {
	const RoomConfig = sequelize.define("room_types", {
		type_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		bed_size: {
			type: DataTypes.STRING,
			allowNull: false
		},
		
		bed_qty: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		base_price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false
		},
		max_capacity: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	return RoomConfig;
};
