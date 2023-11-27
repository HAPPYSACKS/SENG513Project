const functions = require("firebase-functions");
const admin = require("firebase-admin");
import { Request, Response } from "express";
import { verifyToken } from "../auth/verify";

admin.initializeApp();

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
      const roomData = snapshot.value();

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
        Owner: ownerID, // This could be dynamic based on the authenticated user
        Participants: {},
        Status: "active",
        Widgets: [],
      };

      // Add new room to the 'Room' node
      const roomRef = admin.database().ref("Room");
      const newRoomRef = await roomRef.push(newRoomData);

      res.status(200).send({ newRoomId: newRoomRef.key });
    } catch (error) {
      console.error("Error adding new room:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);
