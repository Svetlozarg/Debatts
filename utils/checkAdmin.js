import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Check if user is admin
export async function checkAdmin(user) {
  if (user && user?.displayName !== undefined) {
    const docRef = doc(db, 'Users', user?.displayName);
    const docSnap = await getDoc(docRef);

    // Check if current user's role is admin
    if (docSnap.exists()) {
      if (docSnap.data().role === 'admin') {
        return true;
      } else {
        return false;
      }
    }
  }
}
