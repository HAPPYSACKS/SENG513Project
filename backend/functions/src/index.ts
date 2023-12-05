/**
 * Import function triggers from their respective submodules:
 *
 *
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as authFunctions from "./api/Users";
import * as roomFunctions from "./api/Room";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// Auth functions
export const createUserProfile = authFunctions.createUserProfile;
export const deleteUserProfile = authFunctions.deleteUserProfile;
export const editUserProfile = authFunctions.editUserProfile;
export const getUserProfile = authFunctions.getUserProfile;

// Room functions
export const getRoom = roomFunctions.getRoom;
export const addRoom = roomFunctions.addRoom;
export const getAllRooms = roomFunctions.getAllRooms;
export const deleteRoom = roomFunctions.deleteRoom;
export const addParticipantToRoom = roomFunctions.addParticipantToRoom;
