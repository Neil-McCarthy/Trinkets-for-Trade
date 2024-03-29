const Trinket = require('../models/Trinket')
const User = require('../models/Users')
const asyncHandler = require('express-async-handler')


const getAllTrinkets = asyncHandler(async (req, res) => {
    // Get all trinkets from MongoDB
    const trinkets = await Trinket.find().lean()
    // console.log(trinkets)
    // If no trinkets 
    if (!trinkets?.length) {
        return res.status(400).json({ message: 'No trinkets found!?' })
    }

    // Add username to each trinket before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop

    const trinketWithUser = await Promise.all(trinkets.map(async (trinket) => {
        const user = await User.findById(trinket.user).lean().exec()
        console.log(trinket.user)
        console.log(user)
        return { ...trinket, username: user.username }
    }))

    res.json(trinketWithUser)
})


const createNewTrinket = asyncHandler(async (req, res) => {
    const { user, name, description, price } = req.body

    // Confirm data
    if (!user || !name || !description || !price) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const imageUrl = "../images/duck.jpg"

    // Check for duplicate title
    // const duplicate = await Trinket.findOne({ title }).lean().exec()

    // if (duplicate) {
    //     return res.status(409).json({ message: 'Duplicate trinket title' })
    // }

    // Create and store the new user 
    const trinket = await Trinket.create({ user, name, description, price, imageUrl })

    if (trinket) { // Created 
        return res.status(201).json({ message: 'New trinket created' })
    } else {
        return res.status(400).json({ message: 'Invalid trinket data received' })
    }

})


const updateTrinket = asyncHandler(async (req, res) => {
    const { id, name, description, price, imageUrl } = req.body

    // Confirm data
    if (!id || !name || !description || !price || !imageUrl) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm trinket exists to update
    const trinket = await Trinket.findById(id).exec()

    if (!trinket) {
        return res.status(400).json({ message: 'Trinket not found' })
    }

    trinket.name = name
    trinket.description = description
    trinket.price = price
    trinket.imageUrl = imageUrl

    const updatedTrinket = await trinket.save()

    res.json(`'${updatedTrinket.description}' updated`)
})


const deleteTrinket = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Trinket ID required' })
    }

    // Confirm trinket exists to delete 
    const trinket = await Trinket.findById(id).exec()

    if (!trinket) {
        return res.status(400).json({ message: 'Trinket not found' })
    }

    const result = await trinket.deleteOne()

    const reply = `Trinket '${result.name}' with ID ${result._id} deleted`

    res.json(reply)
})




module.exports = {
    getAllTrinkets,
    createNewTrinket,
    updateTrinket,
    deleteTrinket
}