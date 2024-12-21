module.exports = (sequelize, DataTypes) => {
	const room_types = sequelize.define("room_types", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		type_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		base_price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false
		},
		max_capacity: {
			type: DataTypes.INTEGER,
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
		description: {
			type: DataTypes.TEXT
		}
	});

	room_types.associate = (models) => {
		room_types.hasMany(models.rooms, {
			foreignKey: 'room_type_id'
		});
	};

	return room_types;
};