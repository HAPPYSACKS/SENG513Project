# Firebase Cloud Functions Documentation

This document provides an overview and usage details of the Firebase Cloud Functions implemented in this project. These functions handle various aspects of user management and authentication.

## Table of Contents

- [createUserProfile](#createuserprofile)
- [deleteUserProfile](#deleteuserprofile)
- [editUserProfile](#edituserprofile)
- [getUserProfile](#getuserprofile)

---

### createUserProfile

**Description:**  
Creates a user profile in Firebase Realtime Database when a new user signs up.

**Trigger:**  
Firebase Authentication's `onCreate` event.

**Data Written:**

- `AuthDetails`: Object (unused).
- `Email`: User's email.
- `Preferences`: User preferences (not implemented).
- `PrivacySettings`: User privacy settings (unused).
- `ProfilePictureURL`: URL to the user's profile picture (default empty).
- `Username`: User's display name or email prefix.

**Example Usage:**  
Automatically triggered on new user sign-up.

---

### deleteUserProfile

**Description:**  
Deletes a user's profile from Firebase Realtime Database and Firebase Authentication.

**Function Signature:**  
`functions.https.onCall((data, context) => {...})`

**Required Parameters:**  
None. Uses `context.auth.uid` for user identification.

**Example Usage:**

```javascript
const deleteUserProfile = firebase
  .functions()
  .httpsCallable("deleteUserProfile");
deleteUserProfile()
  .then((result) => {
    console.log(result.data.message);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### editUserProfile

**Description:**  
Updates a user's profile data in Firebase Realtime Database.

**Function Signature:**  
`functions.https.onCall(async (data, context) => {...})`

**Parameters:**

- `data`: Object containing fields to update.
- `context`: Context object for authentication.

**Example Usage:**

```javascript
const editUserProfile = firebase.functions().httpsCallable("editUserProfile");
editUserProfile({
  email: "newemail@example.com",
  username: "newusername",
  // other fields to update...
})
  .then((result) => {
    console.log(result.data.message);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### getUserProfile

**Description:**  
Retrieves a user's profile data from Firebase Realtime Database using their UID.

**Function Signature:**  
`functions.https.onCall(async (data, context) => {...})`

**Parameters:**

- `data.uid`: UID of the user whose profile is being retrieved.

**Example Usage:**

```javascript
const getUserProfile = firebase.functions().httpsCallable("getUserProfile");
getUserProfile({ uid: "user-uid" })
  .then((result) => {
    console.log("User Profile:", result.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```
