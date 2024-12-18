module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define(
        'users',
        {
            user_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
              },
              name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: 'Full name of the user',
              },
              email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                comment: 'Email address of the user',
              },
              password_hash: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: 'Hashed password for authentication',
              },
              role: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: 'Role of the user (e.g., admin, staff)',
              },
              contact_info: {
                type: DataTypes.JSON,
                allowNull: true,
                comment: 'Additional contact information in JSON format',
              },
            },
            {
              tableName: 'Users',
              timestamps: false,
              comment: 'Table to store user account details.',
            }
        );
        return Users;
    }
    