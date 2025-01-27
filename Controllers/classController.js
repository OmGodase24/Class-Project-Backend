const Class = require('../Models/classModel');
const mongoose = require('mongoose');

// Admin - Get all classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json({
            status: 'success',
            results: classes.length,
            data: { classes }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Admin - Get a single class by ID
exports.getClass = async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id);
        if (!classData) {
            return res.status(404).json({
                status: 'fail',
                message: 'No class found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { classData }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Admin - Create a new class
exports.createClass = async (req, res) => {
    try {
        const { Batch_Name, Batch_Duration, Start_Date, Teacher, Summary,Batch_Code,Batch_Price } = req.body;

        // Validate required fields
        if (!Batch_Name || !Batch_Duration || !Start_Date || !Teacher || !Summary || !Batch_Code || !Batch_Price) {
            return res.status(400).json({ status: 'fail', message: 'All fields are required' });
        }

        // Create new class
        const newClass = await Class.create({
            Batch_Name,
            Batch_Duration,
            Start_Date,
            Teacher,
            Summary,
            Batch_Price,
            Batch_Code
        });

        res.status(201).json({
            status: 'success',
            data: { class: newClass }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Admin - Update a class by ID
exports.updateClass = async (req, res) => {
    try {
        const classData = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!classData) {
            return res.status(404).json({
                status: 'fail',
                message: 'No class found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { class: classData }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Admin - Delete a class by ID
exports.deleteClass = async (req, res) => {
    try {
        const classData = await Class.findByIdAndDelete(req.params.id);
        if (!classData) {
            return res.status(404).json({
                status: 'fail',
                message: 'No class found with that ID'
            });
        }
        res.status(204).json({ status: 'success', message: 'Class Deleted' });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// User - Get class by name
exports.getClassByName = async (req, res) => {
    try {
        const classData = await Class.findOne({ Batch_Name: req.params.batchname });
        if (!classData) {
            return res.status(404).json({
                status: 'fail',
                message: 'No class found with that name'
            });
        }
        res.status(200).json({
            status: 'success',
            data: { class: classData }
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.getBatchByCode = async (req, res) => {
    try {
        const batch = await Class.findOne({ Batch_Code: req.params.batchCode });
        if (!batch) {
            return res.status(404).json({ status: 'fail', message: 'Batch not found' });
        }
        res.status(200).json({ status: 'success', data: { batch } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};
