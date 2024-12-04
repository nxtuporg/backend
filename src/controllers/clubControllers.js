const Clubs  = require('../models/clubModel');

const fetchClubs = async (req, res) => {
    try {
        const clubs = await Clubs.find({});

        if (clubs.length > 0) {
          return res.status(200).json({
                success: true,
                data: clubs,
            });
        } else {

          return res.status(404).json({
                success: false,
                message: "No clubs found.",
            });
        }
    } catch (error) {
        console.error("Error fetching clubs:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching club data.",
        });
    }
};

const updateClub = async (req, res) => {
    try {
      const { clubId } = req.params.clubId;
      const updateData = req.body;

      if (!clubId) {
        return res.status(400).json({ message: 'Club ID is required' });
      }  
      const updatedClub = await Club.findByIdAndUpdate(
        clubId,
        updateData,
        { new: true }  
      );
      if (!updatedClub) {
        return res.status(404).json({ message: 'Club not found' });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Club updated successfully',
        data: updatedClub,
      });
    } catch (error) {
        // Catch and log any errors
        console.error('Error in updateClub:', error);
    
        return res.status(500).json({
          success: false,
          message: 'An error occurred while updating the club data.',
          error: error.message,
        });
    }
};

const addClub = async (req, res) => {
  try {
    const { name, description, location } = req.body;

    if (!name || !description || !location) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, description, location) are required.',
      });
    }

    const newClub = new Clans({
      name,
      description,
      location,
    });

    const savedClub = await newClub.save();

    return res.status(201).json({
      success: true,
      message: 'Club created successfully',
      data: savedClub,
    });
  } catch (error) {
    console.error('Error adding club:', error);

    return res.status(500).json({
      success: false,
      message: 'An error occurred while adding the club.',
      error: error.message,  
    });
  }
};


module.exports = {
    fetchClubs,
    updateClub,
    addClub,
};
