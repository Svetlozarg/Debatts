import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Check if user is approved
export async function checkApproved(user) {
  if (user && user?.displayName !== undefined) {
    const docRef = doc(db, 'Users', user?.displayName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().approved !== undefined) {
        return docSnap.data().approved;
      }
    } else {
      console.log('No such document!');
    }
  }
}
