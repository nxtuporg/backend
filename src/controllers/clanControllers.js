const Clan = require('../models/clanModel');

const fetchClans = async (req, res) => {
    try {
        const clans = await Clan.find({});

        if (clans.length > 0) {
          return res.status(200).json({
                success: true,
                data: clans,
            });
        } else {

          return res.status(404).json({
                success: false,
                message: "No clan events found.",
            });
        }
    } catch (error) {
        console.error("Error fetching clans:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching clan data.",
            error: error.message,
        });
    }
};



const updateClan = async (req, res) => {
    try {
      const { clanId } = req.params.clanId;
      const updateData = req.body;
  
     
      if (!clanId) {
        return res.status(400).json({ message: 'Clan ID is required' });
      }
  
      
      const updatedClan = await Clan.findByIdAndUpdate(
        clanId,
        updateData,
        { 
          new: true, 
        }
      );
  
      if (!updatedClan) {
        return res.status(404).json({ message: 'Clan not found' });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Clan updated successfully',
        data: updatedClan
      });
  
    } catch (error) {
      console.error('Error in updateClan:', error);
      return res.status(500).json({
        success: false,
        message: 'Error updating clan',
        error: error.message
      });
    }
  };



const addClan = async (req, res) => {
    try {
      const { name, description, location } = req.body;
  
      if (!name || !description || !location) {
        return res.status(400).json({
          success: false,
          message: 'All fields (name, description, location) are required.',
        });
      }

      const newClan = new Clans({
        name,
        description,
        location,
      });
  
      const savedClan = await newClan.save();
  
      return res.status(201).json({
        success: true,
        message: 'Clan created successfully',
        data: savedClan,
      });
    } catch (error) {
      console.error('Error adding clan:', error);
  
      return res.status(500).json({
        success: false,
        message: 'An error occurred while adding the clan.',
        error: error.message,  
      });
    }
  };
  

module.exports = {
    fetchClans,
    updateClan,
    addClan,
};

