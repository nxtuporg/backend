const Registration = require('../models/registrationModel');

const fetchRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({});

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

// const createRegistration = async (req, res) => {
//     try {
//         const registration = await Registration.create(req.body);
//     } catch (error) {
        
//     }
// }




module.exports = {
    fetchRegistrations,
}

