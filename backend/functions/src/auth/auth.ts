import * as admin from 'firebase-admin';
import { Request } from 'express';

admin.initializeApp();

async function verifyToken(req: Request): Promise<admin.auth.DecodedIdToken> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new Error('No token provided');
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
        throw new Error('Bearer token not found in the authorization header');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        // You can handle specific error types if necessary
        throw new Error('Invalid token');
    }
}
