'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sum: {
                type: DataTypes.FLOAT
            },
            time: {
                type: DataTypes.DATE
            },
            type_of_pay_id: {
                type: DataTypes.INTEGER
            },
            cafe_id: {
                type: DataTypes.INTEGER
            },
            table_number: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'order',
            timestamps: false
        }
    );
    // const Tag = sequelize.define('tag', {
    //     name: Sequelize.STRING,
    //     status: Sequelize.STRING
    // });
    const Type_payments = sequelize.import('./Payments_type.js');
    Order.belongsTo(Type_payments, {foreignKey: 'type_of_pay_id'});

    const Cafe_id = sequelize.import('./Cafe.js');
    Order.belongsTo(Cafe_id, {foreignKey: 'cafe_id'});

    return Order;
};
