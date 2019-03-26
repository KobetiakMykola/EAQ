let dataBase = require('../../dataBase').getInstance();

module.exports = async (req, res) => {
    try {
        const Cafe = dataBase.getModel('Cafe');

        const name = req.params.name;

        if (!name) throw new Error('No id');

        await Cafe.destroy({
            where: {
                name
            }
        });

        res.json({
            success: true,
            message: 'Cafe successfully deleted'
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e.message
        });
    }
};
