const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Shipment = sequelize.define('Shipment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  trackingId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  fromCountry: {
    type: DataTypes.ENUM('China', 'UAE', 'Turkey'),
    allowNull: false
  },
  toCity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  weight: DataTypes.DECIMAL(10, 2),
  volume: DataTypes.DECIMAL(10, 2),
  cargoCount: DataTypes.INTEGER,
  price: DataTypes.DECIMAL(10, 2),
  status: {
    type: DataTypes.ENUM(
      'pending', 'received', 'shipped', 
      'in_transit', 'arrived', 'delivered', 'cancelled'
    ),
    defaultValue: 'pending'
  },
  notes: DataTypes.TEXT
}, {
  timestamps: true,
  tableName: 'shipments'
});

// Relations
User.hasMany(Shipment, { foreignKey: 'userId' });
Shipment.belongsTo(User, { foreignKey: 'userId' });

module.exports = Shipment;
