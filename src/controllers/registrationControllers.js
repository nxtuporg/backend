const Registration = require('../models/registrationModel');

const fetchRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.findById(req.params.id);

        if (registrations) {
            return res.status(200).json({
                success: true,
                data: registrations,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No registrations found.",
            });
        }
    } catch (error) {
        console.error("Error fetching registrations:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching registration data.",
            error: error.message,
        });
    }
}       

const createRegistration = async (req, res) => {
    try {
        const {
            id, eventName, registrationDetails
        } = req.body;
        var dbres = await Registration.find({id});
        if(dbres.length > 0) {
            await Registration.findOneAndUpdate({id}, {$push: {registrationDetails: registrationDetails}})
        } else {
            const newRegistration = new Registration({id, eventName, registrationDetails});
            await newRegistration.save();
        }


        const newRegistration = new Registration({id, eventName, registrationDetails});
        await newRegistration.save();
        // const newRegistration = await Registration.create({id, eventName, registrationDetails});

        return res.status(201).json({
            success: true,
            data: newRegistration,
        });
    } catch (error) {
        console.error("Error creating registration:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating registration data.",
            error: error.message,
        });
    }
}




module.exports = {
    fetchRegistrations,
    createRegistration,
}

