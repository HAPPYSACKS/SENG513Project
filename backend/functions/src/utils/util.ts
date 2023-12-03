import * as admin from "firebase-admin";

export async function isUsernameUnique(username: string, currentUserId: string): Promise<boolean> {
    const usersRef = admin.database().ref('Users');
    const snapshot = await usersRef.orderByChild('Username').equalTo(username).once('value');
    const users = snapshot.val();

    // Username is unique if no user with this username is found, 
    // or if it's found only for the current user
    return !users || Object.keys(users).every(key => key === currentUserId);
}


