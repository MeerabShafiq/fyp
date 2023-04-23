const Profile = require('../models/udpateProfile.model');

exports.updatePro = async (req, res) => {
  const { userId } = req.body; // extract the userId from the request parameters
  const profileData = req.body; // get the profile data from the request body

  // check if a profile already exists for the given userId
  Profile.findOne({ userId })
    .then(existingProfile => {
      if (existingProfile) {
        // update the profile in the database using Mongoose
        Profile.findOneAndUpdate(
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
      } else {
        // create a new profile in the database using Mongoose
        Profile.create({ userId, ...profileData })
          .then(createdProfile => {
            res.json({message: 'success', result:createdProfile}); // send the created profile in the response
          })
          .catch(error => {
            console.error('Error creating profile:', error);
            res.status(500).send('Error creating profile'); // send an error response if the creation fails
          });
      }
    })
    .catch(error => {
      console.error('Error finding profile:', error);
      res.status(500).send('Error finding profile'); // send an error response if the search fails
    });
};


exports.getProfile = async (req, res) => {
  try {
    let userId = req.params.id;
    if (!userId) {
      return res.status(400).send('userId is required');
    }
    const profile = await Profile.findOne({ userId:Number(userId) });
    if (!profile) {
      return res.status(404).send('Profile not found');
    }
    res.send({ success: true, result: profile });
  } catch (err) {
    console.error(err);
    res.status(500).send({message:'Error retrieving profile', err});
  }
};
