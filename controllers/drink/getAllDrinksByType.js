const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const secret = require('../../config/secret');

module.exports = async (req, res) => {
    try {
        const Drink = dataBase.getModel('Drink');
        const Type_Drink = dataBase.getModel('Type_drink');

        const type = req.params.type;
        if (!type) throw new Error('No type');

        const token = req.get('Authorization');
        if (!token) throw new Error('No token');

        const {id: idFromToken} = tokenVerificator(token, secret);

        let findTypeDrink = await Type_Drink.findOne({
            where: {
                type
            }
        });

        const {id: TypeId} = findTypeDrink;

        const gotDrink = await Drink.findAll({
            where: {
                type_drink_id: TypeId,
                cafe_id: idFromToken
            },
        });
        if (!gotDrink) throw new Error('Drink not exist');

        res.json({
            success: true,
            message: gotDrink
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};

