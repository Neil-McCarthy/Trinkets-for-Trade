const Trinket = require('../models/Trinket')
const User = require('../models/Users')
const asyncHandler = require('express-async-handler')


const getAllTrinkets = asyncHandler(async (req, res) => {
    console.log('controller');
    // Get all notes from MongoDB
    const trinkets = await Trinket.find().lean()

    // If no notes 
    if (!trinkets?.length) {
        return res.status(400).json({ message: 'No trinkets found!?' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const trinketWithUser = await Promise.all(trinkets.map(async (trinket) => {
        const user = await User.findById(trinket.user).lean().exec()
        return { ...trinket, username: user.username }
    }))

    res.json(trinketWithUser)
})




module.exports = {
    getAllTrinkets,
    // createNewUser,
    // updateUser,
    // deleteUser
}