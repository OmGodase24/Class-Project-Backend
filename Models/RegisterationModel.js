const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Registration schema
const RegisterClassSchema = new Schema({
    Stud_Name: { type: String, required: true },
    Stud_Mobile: { type: String, required: true },
    Stud_Email: { type: String, required: true },
    Parents_No: { type: String, required: true },
    Current_address: { type: String, required: true },
    Permanent_address: { type: String, required: true },
    Institution: { type: String, required: true },
    Mother_Profession: { type: String, required: true },
    Father_Profession: { type: String, required: true },
    Batch_Code: { type: String, required: true },
});

// Create a compound index to ensure unique registration per batch
RegisterClassSchema.index({ Stud_Mobile: 1, Stud_Email: 1, Batch_Code: 1 }, { unique: true });

module.exports = mongoose.model('RegisterClass', RegisterClassSchema);

