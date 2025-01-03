// controllers/resturantController.js
const Resturant = require('../models/resturantModel');

// Get all restaurants
exports.getAllResturants = async (req, res) => {
    try {
        const resturants = await Resturant.find();
        console.log(resturants);
        res.status(200).json(resturants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single restaurant by ID
exports.getResturantById = async (req, res) => {
    try {
        const resturant = await Resturant.findOne({ id: req.params.id });
        if (!resturant) {
            return res.status(404).json({ message: 'Resturant not found' });
        }
        res.status(200).json(resturant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new restaurant
exports.createResturant = async (req, res) => {
    try {
        const resturant = new Resturant();
        console.log(req.body.name);
        resturant.id = req.body.id;
        resturant.name = req.body.name;
        resturant.full_address = req.body.full_address;
        resturant.creation_date = req.body.creation_date;
        resturant.manager = req.body.manager;

      
        await resturant.save();
        res.status(201).json(resturant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a restaurant by ID
exports.updateResturant = async (req, res) => {
    try {
        const updatedResturant = await Resturant.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedResturant) {
            return res.status(404).json({ message: 'Resturant not found' });
        }
        res.status(200).json(updatedResturant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a restaurant by ID
exports.deleteResturant = async (req, res) => {
    try {
        const deletedResturant = await Resturant.findOneAndDelete({ id: req.params.id });
        if (!deletedResturant) {
            return res.status(404).json({ message: 'Resturant not found' });
        }
        res.status(200).json({ message: 'Resturant deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
