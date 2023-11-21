import * as admin from 'firebase-admin';
import { Request } from 'express';

admin.initializeApp();

async function verifyToken(req: Request): Promise<admin.auth.DecodedIdToken> {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) throw new Error('No token provided');

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        throw new Error('Invalid token');
    }
}
