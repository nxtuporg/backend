const Events = require('../models/eventsModel');

const fetchEvents = async (req, res) => {
    try {
        const events = await Events.find({}); 

        if (events.length > 0) {

            res.status(200).json({
                success: true,
                data: events,
            });
        } else {

            res.status(404).json({
                success: false,
                message: "No events found.",
            });
        }
    } catch (error) {
        console.error("Error fetching events:", error);

        res.status(500).json({
            success: false,
            message: "An error occurred while fetching event data.",
        });
    }
};

module.exports = {
    fetchEvents,
};
