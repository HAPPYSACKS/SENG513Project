const functions = require("firebase-functions");
import * as cors from "cors";
import admin from "../utils/firebaseInit";
import { Request, Response } from "express";
import { verifyToken } from "../auth/verify";
import * as logger from "firebase-functions/logger";

// TODO
// Update Room on new participant
// Update room on last activity (update last activity timestamp)
// Test room deletion
// Test room creation
// Test room edit
// Test room read

const corsHandler = cors({ origin: true }); // change later

export const getRoom = functions.https.onRequest(
  async (req: Request, res: Response) => {
    if (req.method !== "GET") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const roomID = req.query.roomID;

    if (!roomID) {
      res.status(400).send("Room ID is required");
      return;
    }

    try {
      const roomRef = admin.database().ref(`Room/${roomID}`);
      const snapshot = await roomRef.once("value");
      const roomData = snapshot.val();

      if (roomData) {
        res.status(200).json(roomData);
      } else {
        res.status(404).send("Room not found");
      }
    } catch (error) {
      console.error("Error fetching room:", error);

      res.status(500).send("Internal Server Error");
    }
  }
);

export const addRoom = functions.https.onRequest(
  (req: Request, res: Response) => {
    corsHandler(req, res, async () => {
      // Assumes the request method to be POST
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      try {
        const decodedToken = await verifyToken(req);
        const ownerID = decodedToken.uid;

        const newRoomData = {
          CreationTimestamp: new Date().toISOString(), // Set current time as creation timestamp
          LastActivityTimestamp: new Date().toISOString(), // Set current time as last activity timestamp
          OwnerID: ownerID,
          Participants: { ownerID },
          Status: "active", // UNUSED
          Widgets: [], // UNUSED
        };

        // Adds a new room to the 'Room' node
        const roomRef = admin.database().ref("Room");
        const newRoomRef = await roomRef.push(newRoomData);

        res.status(200).send({ newRoomId: newRoomRef.key });
      } catch (error) {
        console.error("Error adding new room:", error);
        logger.error("Error adding new room:", error);
        res.status(500).send("Internal Server Error");
      }
    });
  }
);

export const getAllRooms = functions.https.onRequest(
  async (req: Request, res: Response) => {
    // Assumes the request method to be GET
    if (req.method !== "GET") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    try {
      const roomsRef = admin.database().ref("Room");
      const snapshot = await roomsRef.once("value");
      const roomsData = snapshot.val();

      res.status(200).json(roomsData);
    } catch (error) {
      console.error("Error listing rooms:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  
);

export const deleteRoom = functions.https.onRequest(
  async (req: Request, res: Response) => {
    // Assumes the request method to be DELETE
    if (req.method !== "DELETE") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const roomID = req.query.roomID;
    if (!roomID) {
      res.status(400).send("Room ID is required");
      return;
    }

    try {
      const decodedToken = await verifyToken(req);
      const userId = decodedToken.uid;

      const roomRef = admin.database().ref(`Room/${roomID}`);
      const snapshot = await roomRef.once("value");
      if (!snapshot.exists()) {
        res.status(404).send("Room not found");
        return;
      }

      const roomData = snapshot.val();
      const isOwner = roomData.Owner === userId;

      // Maybe implement an `admin` check, so that maybe admins can clean up rooms?
      if (!isOwner) {
        res.status(403).send("Not authorized to delete this room");
        return;
      }

      await roomRef.remove();
      res.status(200).send(`Room ${roomID} deleted successfully`);
    } catch (error) {
      console.error("Error deleting room:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// check this

export const addParticipantToRoom = functions.https.onRequest(
  async (req: Request, res: Response) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const { roomID, userID, role } = req.body; // also include permissions?

    const decodedToken = await verifyToken(req);
    if (!decodedToken) {
      res.status(401).send("Unauthorized");
      return;
    }

    if (decodedToken.uid !== userID) {
      res.status(403).send("Forbidden: You can only add yourself to a room");
      return;
    }

    if (!roomID) {
      res.status(400).send("Room ID is required");
      return;
    }

    try {
      const roomParticipantsRef = admin
        .database()
        .ref(`Room/${roomID}/Participants/${userID}`);
      await roomParticipantsRef.set({
        Role: role || "participant",
        Status: "active",
      });

      // update AccessControls if you manage permissions separately if they are used or managed by backend (idk tho)

      res.status(200).send("Participant added successfully");
    } catch (error) {
      console.error("Error adding participant:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export const updateRoomRefID = functions.https.onRequest(
  (req: Request, res: Response) => {
    corsHandler(req, res, async () => {
      // Check for POST method
      if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
      }

      try {
        const decodedToken = await verifyToken(req);
        if (!decodedToken) {
          res.status(401).send("Unauthorized");
          return;
        }

        // Extract roomID and roomRefID from the request body
        const { roomID, roomRefID } = req.body;

        // Validate the input
        if (!roomID || !roomRefID) {
          res.status(400).send("Room ID and Room Ref ID are required");
          return;
        }

        // Get a reference to the specific room
        const roomRef = admin.database().ref(`Room/${roomID}`);

        // Update the roomRefID field
        await roomRef.update({ roomRefID });

        res
          .status(200)
          .send(`Room Ref ID updated successfully for room ${roomID}`);
      } catch (error) {
        console.error("Error updating Room Ref ID:", error);
        res.status(500).send("Internal Server Error");
      }
    });
  }
);
