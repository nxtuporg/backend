const Carousels = require('../models/carouselModel');

const fetchCarousel = async (req, res) => {
    try {
        const carousel = await Carousels.find({}); 

        if (carousel.length > 0) {
            return res.status(200).json({
                success: true,
                data: carousel,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No carousel items found.",
            });
        }
    } catch (error) {
        console.error("Error fetching carousel:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching carousel data.",
            error: error.message,
        });
    }
};

const updateCarousel = async (req, res) => {
    try {
        const { carouselId } = req.params; 
        const updateData = req.body;

        if (!carouselId) {
            return res.status(400).json({
                success: false,
                message: 'Carousel ID is required',
            });
        }

        const updatedCarousel = await Carousels.findByIdAndUpdate(
            carouselId,
            updateData,
            { new: true }
        );

        if (!updatedCarousel) {
            return res.status(404).json({
                success: false,
                message: 'Carousel item not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Carousel item updated successfully',
            data: updatedCarousel,
        });
    } catch (error) {
        console.error('Error updating carousel:', error);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the carousel item.',
            error: error.message,
        });
    }
};

const addCarousel = async (req, res) => {
    try {
        console.log("req came")
        const { id, alt, url, link, date } = req.body;

        if (!id || !alt || !url || !link || !date) {
            return res.status(400).json({
                success: false,
                message: 'All fields (id, alt, url, link) are required.',
            });
        }

        const newCarousel = new Carousels({
            id,
            alt,
            url,
            link,
            date,
        });

        const savedCarousel = await newCarousel.save();

        return res.status(201).json({
            success: true,
            message: 'Carousel item created successfully', 
            data: savedCarousel,
        });
    } catch (error) {
        console.error('Error adding carousel:', error);
        
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding the carousel item.',
            error: error.message,
        });
    }
};

module.exports = {
    fetchCarousel,
    updateCarousel,
    addCarousel,
};
