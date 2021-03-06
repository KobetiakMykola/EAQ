const dataBase = require('../../dataBase').getInstance();
const tokenVerificator = require('../../helpers/tokenVerificator');
const secret = require('../../config/secret');

module.exports = async (req, res) => {
    try {
        const Menu = dataBase.getModel('Menu');

        const nameFromParams = req.params.name;
        if (!nameFromParams) throw new Error('No name');

        const menuInfo = req.body;
        if (!menuInfo) throw new Error('Body is empty');

        const {name} = menuInfo;
        if (name) throw new Error('Some fields are empty');

        const token = req.get('Authorization');
        if (!token) throw new Error('No token');

        const {id: idFromToken} = tokenVerificator(token, secret);

        const isExist = await Menu.findOne({
            where: {
                name: nameFromParams,
                cafe_id: idFromToken
            }
        });
        if (!isExist) throw new Error('No menu with this name');

        await Menu.update({
            cafe_id: idFromToken,
            name,

        }, {
            where: {
                name: nameFromParams,
                cafe_id: idFromToken
            }
        });

        res.json({
            success: true,
            message: 'Menu successfully updated'
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
