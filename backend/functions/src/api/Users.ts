import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// TODO
// Create route for users to delete account
// Create route for users to modify user information like email
// Create route to get user information from uid
// Create route to edit user information 
// Implement user preferences?


exports.createUserProfile = functions.auth
  .user()
  .onCreate(async (user: admin.auth.UserRecord) => {
    const username = user.displayName || user.email?.split("@")[0];

    try {
      const userRef = admin.database().ref(`Users/${user.uid}`);

      const userData = {
        AuthDetails: {}, //UNUSED
        Email: user.email,
        Preferences: {}, // NOT IMPLEMENTED
        PrivacySettings: {}, // UNUSED
        ProfilePictureURL: "", // set to some basic image
        Username: username,
      };

      // Return is used here to ensure the Cloud Function waits for the database write to finish.
      // return value of userRef.set(userData) is not actually used for anything.
      await userRef.set(userData);
      return;
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  });
