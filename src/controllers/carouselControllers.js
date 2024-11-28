const Carousel = require('../models/carouselModel');

const fetchCarousel = async (req, res) => {
    try {
        const carousel = await Carousel.find({}); 

        if (carousel.length > 0) {
            res.status(200).json({
                success: true,
                data: carousel,
            });
        } else {

            res.status(404).json({
                success: false,
                message: "No carousel items found.",
            });
        }
    } catch (error) {
        console.error("Error fetching carousel:", error);

        res.status(500).json({
            success: false,
            message: "An error occurred while fetching carousel data.",
        });
    }
};

module.exports = {
    fetchCarousel,
};
