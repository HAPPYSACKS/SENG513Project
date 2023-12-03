import * as functions from "firebase-functions";

import { isUsernameUnique } from "../utils/util";

import admin from "../utils/firebaseInit";

// TODO
// Test user deletion
// Test user creation
// Test user edit
// Test user read
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
      return;
    }
  });

exports.deleteUserProfile = functions.https.onCall(
  async (data, context: functions.https.CallableContext) => {
    if (!context.auth)
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated to delete their account"
      );
    try {
      const uid = context.auth.uid;

      const userRef = admin.database().ref(`Users/${uid}`);

      // Delete data from realtime database

      await userRef.remove();

      // Delete data from firebase authentication

      await admin.auth().deleteUser(uid);

      return { message: "User account deleted successfully." };
    } catch (error) {
      console.error("Error deleting user account:", error);
      throw new functions.https.HttpsError(
        "internal",
        "An error occurred while deleting the user account."
      );
    }
  }
);

// const editUserProfile = firebase.functions().httpsCallable('editUserProfile');
// editUserProfile({
//     email: 'newemail@example.com',
//     username: 'newusername',
//     profilePictureURL: 'http://www....'
//     ... other profile fields ...
// })

exports.editUserProfile = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to edit their profile."
    );
  }

  try {
    const uid = context.auth.uid;
    const updatedUserData = data;

    // Validate the updatedUserData as needed
    // actually do input sanitization. I'm just too lazy to do it.
    const uniqueUsername = await isUsernameUnique(
      updatedUserData.username,
      uid
    );

    if (!uniqueUsername) {
      throw new functions.https.HttpsError(
        "already-exists",
        "This username is already taken."
      );
    }

    const userRef = admin.database().ref(`Users/${uid}`);

    await userRef.update(updatedUserData);

    return { message: "User profile updated successfully." };
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to update user profile."
    );
  }
});

exports.getUserProfile = functions.https.onCall(async (data, context) => {
  // Optional: Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User must be authenticated to get their profile."
    );
  }

  try {
    const uid = data.uid; // Assuming the UID is passed in the data
    const userRef = admin.database().ref(`Users/${uid}`);
    const snapshot = await userRef.once("value");
    const userProfile = snapshot.val();

    if (!userProfile) {
      throw new functions.https.HttpsError(
        "not-found",
        "User profile not found."
      );
    }

    return userProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Unable to fetch user profile."
    );
  }
});
