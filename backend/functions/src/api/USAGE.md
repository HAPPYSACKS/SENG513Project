# Firebase Cloud Functions Documentation

This document provides an overview and usage details of the Firebase Cloud Functions implemented in this project. These functions handle various aspects of user management and room management.

## Table of Contents

- [User Management](#user-management)
  - [createUserProfile](#createuserprofile)
  - [deleteUserProfile](#deleteuserprofile)
  - [editUserProfile](#edituserprofile)
  - [getUserProfile](#getuserprofile)
- [Room Management](#room-management)
  - [getRoom](#getroom)
  - [addRoom](#addroom)
  - [getAllRooms](#getallrooms)
  - [deleteRoom](#deleteroom)

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

### getRoom

**Endpoint:** `getRoom`  
**Method:** GET  
**Description:** Fetches details of a specific room by its ID.

**Query Parameters:**

- `roomID`: The unique identifier of the room.

**Example Usage:**  
`GET /getRoom?roomID=<room-id>`

**Responses:**

- `200 OK`: Successfully retrieved the room data.
- `400 Bad Request`: Room ID is missing.
- `404 Not Found`: Room not found.
- `500 Internal Server Error`: Server error occurred.

---

### addRoom

**Endpoint:** `addRoom`  
**Method:** POST  
**Description:** Adds a new room to the database.

**Request Body:**

- The request should contain data relevant to the new room.

**Example Usage:**  
`POST /addRoom` with the new room data in the request body.

**Responses:**

- `200 OK`: Successfully added the new room, returns new room ID.
- `405 Method Not Allowed`: Incorrect HTTP method used.
- `500 Internal Server Error`: Server error occurred.

---

### getAllRooms

**Endpoint:** `getAllRooms`  
**Method:** GET  
**Description:** Retrieves data of all rooms.

**Example Usage:**  
`GET /getAllRooms`

**Responses:**

- `200 OK`: Successfully retrieved all rooms data.
- `405 Method Not Allowed`: Incorrect HTTP method used.
- `500 Internal Server Error`: Server error occurred.

---

### deleteRoom

**Endpoint:** `deleteRoom`  
**Method:** DELETE  
**Description:** Deletes a specific room from the database.

**Query Parameters:**

- `roomID`: The unique identifier of the room to be deleted.

**Example Usage:**  
`DELETE /deleteRoom?roomID=<room-id>`

**Responses:**

- `200 OK`: Successfully deleted the room.
- `400 Bad Request`: Room ID is missing.
- `403 Forbidden`: User is not authorized to delete the room.
- `404 Not Found`: Room not found.
- `500 Internal Server Error`: Server error occurred.
