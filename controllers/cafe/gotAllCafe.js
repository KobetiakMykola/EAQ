const dataBase = require('../../dataBase').getInstance();
const tokenVerifikator = require('../../helpers/tokenVerificator');
const secret = require('../../config/secret');
const userRole = require('../../config/userRoles');

module.exports = async (req, res) => {
    try {
        const Cafe = dataBase.getModel('Cafe');

        const {admin} = userRole;

        const token = req.get('Authorization');
        if (!token) throw new Error('No token');

        const {name: nameFromToken} = tokenVerifikator(token, secret);
        if (nameFromToken !== admin) throw new Error('You are not admin');

        const gotCafe = await Cafe.findAll({});

        if (!gotCafe) throw new Error('Cafe not exist');

        res.json({
            success: true,
            message: gotCafe
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};

