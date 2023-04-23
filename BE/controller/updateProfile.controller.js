const Profiles = require('../models/udpateProfile.model');

exports.updatePro = async (req, res) => {
  const { userId } = req.params; // extract the userId from the request parameters
  const profileData = req.body; // get the profile data from the request body

  // update the profile in the database using Mongoose
  Profiles.findOneAndUpdate(
    { userId }, // search for a profile with the specified userId
    profileData, // update the profile with the data from the request body
    { new: true } // set the `new` option to true to return the updated document
  )
    .then(updatedProfile => {
      res.json({message: 'success', result:updatedProfile}); // send the updated profile in the response
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      res.status(500).send('Error updating profile'); // send an error response if the update fails
    });
};

exports.getProfile = async (req, res) => {
    const userId = req.params.id || '';
    const result = await Profiles.find({ userId });
    
    try {
        if (userId) {
            const result = await Profiles.find({ userId });
            console.log(result);
      res.send({ success: true, result });
      // res.json(gigs)
    } else {
      res.status(404).send('Error something went wrong');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving products');
  }
};
