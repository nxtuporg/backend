const Clans = require('../models/clanModel');

const fetchClubs = async (req, res) => {
    try {
        const clubs = await Clans.find({});

        if (clubs.length > 0) {

            res.status(200).json({
                success: true,
                data: clubs,
            });
        } else {

            res.status(404).json({
                success: false,
                message: "No clubs found.",
            });
        }
    } catch (error) {
        console.error("Error fetching clubs:", error);

        res.status(500).json({
            success: false,
            message: "An error occurred while fetching club data.",
        });
    }
};

module.exports = {
    fetchClubs,
};
