const User = require('../models/Users');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');



const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(400).json({message: 'No users found!?'});
    }
    res.json(users);
});



// ADD EMAIL AND EMAIL VERIFY
const createNewUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;

    //confirm data
    if (!username || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    // check for duplicate
    const duplicate = await User.findOne({username}).lean().exec();
    if (duplicate) {
        return res.status(409).json({message: 'Duplicate username'});
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject = {username, 'password': hashedPassword};

    // create and store new user
    const user = await User.create(userObject);
    if (user) {
        res.status(201).json({message: `New user ${username} created`});
    } else {
        res.status(400).json({message: 'Invalid user data received'});
    }
});



const updateUser = asyncHandler(async (req, res) => {
    const {id, username, password} = req.body;

    // confirm data
    if (!id || !username) {
        res.status(400).json({message: 'All fields are required'});
    }

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({message: 'No users found'});
    }

    // check for duplicate
    const duplicate = await User.findOne({username}).lean().exec();
    // allow updates to original user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate username'});
    }

    user.username = username;

    if (password) {
        // hash password
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.json({message: `${updatedUser.username} updated`})
});



const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body;
    if (!id) {
        return res.status(400).json({message: 'User ID not recognised'});
    }

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({message: 'User not found'});
    }

    const result = await user.deleteOne();
    const reply = `Username ${result.username} with ID ${result._id} has been deleted`;
    res.json(reply);
});



module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}