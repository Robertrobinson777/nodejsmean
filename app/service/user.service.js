const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../model');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const user = await User.findOne({'email.id':email});

    if (user && bcrypt.compareSync(password, user.password)) {
        if(user.email._v){
        const { password,_v, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: 60 * 60 }); //expires every hour
        return {
            ...userWithoutHash,  token
        };
    } else{
        return {
            message:"Email verfication failed"
        }
    }
}
}

async function getAll() {
    return await User.find().select('-password');
}

async function getById(id) {
    return await User.findById(id).select('-password');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ 'email.id': userParam.email })) {
        throw 'EmailID already exists';
    }

    const user = new User({
        email: {
            id: userParam.email,
        },
        mobile: {
            no: userParam.mobile,
        },
        name: {
            first: userParam.firstname,
            last: userParam.lastname
        }
    });

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
