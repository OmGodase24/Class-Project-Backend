const RegisterClass = require('../Models/RegisterationModel');
const Class = require('../Models/classModel');
const sendEmail = require('../utils/email');

exports.registerForBatch = async (req, res) => {
    try {
        const { Stud_Name, Stud_Mobile, Stud_Email, Parents_No, Current_address, Permanent_address, Institution, Mother_Profession, Father_Profession } = req.body;
        const { Batch_Code } = req.params;

        // Create a new registration for the batch
        const newRegistration = await RegisterClass.create({
            Stud_Name,
            Stud_Mobile,
            Stud_Email,
            Parents_No,
            Current_address,
            Permanent_address,
            Institution,
            Mother_Profession,
            Father_Profession,
            Batch_Code
        });

        // Update the registration count for the batch
        await Class.findOneAndUpdate({ Batch_Code }, { $inc: { registrationCount: 1 } });

        // Send confirmation email to the student
        await sendEmail({
            email: Stud_Email,
            subject: 'Registration Confirmation',
            message: `Dear ${Stud_Name},

We are pleased to confirm your registration for the batch ${Batch_Code}.

Registration Details:
- Name: ${Stud_Name}
- Mobile: ${Stud_Mobile}
- Email: ${Stud_Email}
- Batch Code: ${Batch_Code}

To complete the payment, please contact us at phone number: +91 7897642014.

If you have any questions or need further assistance, please don't hesitate to contact us.

Best regards,
Programmers Support Team`
        });

        res.status(201).json({
            status: 'success',
            message: 'User successfully registered for the batch! A confirmation email has been sent.',
            data: newRegistration
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                status: 'fail',
                message: 'User is already registered for this batch.'
            });
        }
        console.error('Registration error:', err);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred during registration. Please try again.'
        });
    }
};

exports.getRegistrationsByBatch = async (req, res) => {
    try {
        const { Batch_Code } = req.params;

        // Get all registrations for the batch
        const registrations = await RegisterClass.find({ Batch_Code });

        const count = await RegisterClass.countDocuments({ Batch_Code });

        if (!registrations || registrations.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No registrations found for this batch.'
            });
        }

        res.status(200).json({
            status: 'success',
            count: count,
            data: registrations,

        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

