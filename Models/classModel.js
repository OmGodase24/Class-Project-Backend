const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    Batch_Name: { type: String, required: true },
    Batch_Duration: { type: String, required: true },
    Start_Date: { type: String, required: true },
    Teacher: { type: String, required: true },
    Summary: { type: String, required: true },
    Batch_Price: { type: Number, required: true } ,
    Batch_Code: { type: String, unique: true, required: true },
    registrationCount: { type: Number, default: 0 }, // New field for tracking registrations
});

// Auto-generate Batch_Code before saving
ClassSchema.pre('save', function (next) {
    if (!this.Batch_Code) {
        this.Batch_Code = `${this.Batch_Name.replace(/\s+/g, '').substring(0, 4).toUpperCase()}${this.Start_Date.replace(/-/g, '').substring(0, 6)}`;
    }
    next();
});

module.exports = mongoose.model('Class', ClassSchema);
