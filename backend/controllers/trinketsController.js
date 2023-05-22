const Trinket = require('../models/Trinket')
const User = require('../models/Users')
const asyncHandler = require('express-async-handler')


const getAllTrinkets = asyncHandler(async (req, res) => {
    // Get all notes from MongoDB
    const trinkets = await Trinket.find().lean()
    // console.log(trinkets)
    // If no notes 
    if (!trinkets?.length) {
        return res.status(400).json({ message: 'No trinkets found!?' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop

    // const trinketWithUser = await Promise.all(trinkets.map(async (trinket) => {
    //     const user = await User.findById(trinket.user).lean().exec()
    //     console.log(trinket.user)
    //     console.log(user)
    //     return { ...trinket, username: user.username }
    // }))

    res.json(trinkets)
})


const createNewTrinket = asyncHandler(async (req, res) => {
    const { user, name, description, price } = req.body

    // Confirm data
    if (!user || !name || !description || !price) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const imageUrl = "../images/duck.jpg"

    // Check for duplicate title
    // const duplicate = await Note.findOne({ title }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate note title' })
    // }

    // Create and store the new user 
    const trinket = await Trinket.create({ user, name, description, price, imageUrl })

    if (trinket) { // Created 
        return res.status(201).json({ message: 'New trinket created' })
    } else {
        return res.status(400).json({ message: 'Invalid trinket data received' })
    }

})




module.exports = {
    getAllTrinkets,
    createNewTrinket,
    // updateUser,
    // deleteUser
}