const functions = require("firebase-functions");
import admin from "../utils/firebaseInit";
import { Request, Response } from "express";
import { verifyToken } from "../auth/verify";

// TODO
// Update Room on new participant
// Update room on last activity (update last activity timestamp)
// Test room deletion
// Test room creation
// Test room edit
// Test room read



exports.getRoom = functions.https.onRequest(
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

exports.addRoom = functions.https.onRequest(
  async (req: Request, res: Response) => {
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
        Owner: ownerID,
        Participants: {},
        Status: "active", // UNUSED
        Widgets: [], // UNUSED
      };

      // Adds a new room to the 'Room' node
      const roomRef = admin.database().ref("Room");
      const newRoomRef = await roomRef.push(newRoomData);

      res.status(200).send({ newRoomId: newRoomRef.key });
    } catch (error) {
      console.error("Error adding new room:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

exports.getAllRooms = functions.https.onRequest(
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

exports.deleteRoom = functions.https.onRequest(
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

exports.addParticipantToRoom = functions.https.onRequest(
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