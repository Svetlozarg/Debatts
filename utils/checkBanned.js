import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Check if user is banned
export async function checkBanned(user) {
  if (user && user?.displayName !== undefined) {
    const docRef = doc(db, 'Users', user?.displayName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().banned !== undefined) {
        return docSnap.data().banned;
      }
    } else {
      console.log('No such document!');
    }
  }
}
