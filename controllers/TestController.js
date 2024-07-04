const db = require('../models')
const User = db.User;

exports.fetchData = async (req, res) => {
    // await User.create({ firstName: 'Jane', lastName: 'Doe', email: 'nik@web.com', password: 'pass123' })
    let data = await User.findAll();
    console.log(data);
    res.status(200).send({
        message: data,
    });
}