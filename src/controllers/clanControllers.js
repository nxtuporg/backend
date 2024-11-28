const Clan = require('../models/clanModel');

const fetchClans = async (req, res) => {
    try {
        const clans = await Clan.find({});

        if (clans.length > 0) {

            res.status(200).json({
                success: true,
                data: clans,
            });
        } else {

            res.status(404).json({
                success: false,
                message: "No clan events found.",
            });
        }
    } catch (error) {
        console.error("Error fetching clans:", error);

        res.status(500).json({
            success: false,
            message: "An error occurred while fetching clan data.",
        });
    }
};



const updateClan = async (req, res) => {
    try {
      const { clanId } = req.params.id;
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
  

module.exports = {
    fetchClans,updateClan
};

