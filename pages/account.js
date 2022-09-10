import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import {
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import Head from 'next/head';
import {
  getAuth,
  deleteUser,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import LargeContainer from '../components/containers/LargeContainer';
import { checkApproved } from '../utils/checkApproved';
import { checkBanned } from '../utils/checkBanned';

export default function Account() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  const handleUserData = async () => {
    // Chech if Approved
    if ((await checkApproved(user)) === false) {
      alert(
        'You are not approved. Please wait for an admin to go through your request and approve your profile. Thank you for your patience!'
      );
      logout();
      return;
      // Check if banned
    } else if ((await checkBanned(user)) === true) {
      alert('You are banned');
      logout();
      return;
    } else if (user && user?.displayName !== undefined) {
      const docRef = doc(db, 'Users', user?.displayName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log('No such document!');
      }

      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  // Handle delete account
  const deleteAccount = async () => {
    if (user && user?.displayName !== undefined) {
      // ReAuth!
      const docRef = doc(db, 'Users', user?.displayName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Delete user
        await deleteDoc(doc(db, 'Users', user?.displayName));
      }

      const querySnapshot = await getDocs(collection(db, 'Debatts'));
      querySnapshot.forEach(async (getDoc) => {
        // Delete posts
        if (getDoc.data().author === user?.displayName) {
          await deleteDoc(doc(db, 'Debatts', getDoc.data().title));
        }

        // Delete Agree Comments
        getDoc.data().agree.map(async (comment, i) => {
          if (comment.author === user?.displayName) {
            await updateDoc(doc(db, 'Debatts', getDoc.data().title), {
              agree: arrayRemove(getDoc.data().agree[i]),
            });
          }
        });

        // Delete Disagree Comments
        getDoc.data().disagree.map(async (comment, i) => {
          if (comment.author === user?.displayName) {
            await updateDoc(doc(db, 'Debatts', getDoc.data().title), {
              disagree: arrayRemove(getDoc.data().disagree[i]),
            });
          }
        });
      });

      let auth = getAuth();
      let currUser = auth.currentUser;

      // Delete user's obj
      deleteUser(currUser).catch((error) => {
        console.log(error.message);
      });

      router.push('/login');
    }
  };

  // Handle Change Email
  const changeEmail = async () => {
    if (user && user?.displayName !== undefined) {
      const auth = getAuth();
      const user = auth.currentUser;

      const { email } = user;

      // Prompt for current password
      const password = prompt('Type your current password');

      const credentials = EmailAuthProvider.credential(email, password);

      // Prompt for new email
      const newEmail = prompt('Type your new email');
      // Prompt for repeat new email
      const repeatNewEmail = prompt('Repeat your new email');

      // Check if emails match
      if (newEmail === repeatNewEmail) {
        // Reauth user with email and password
        await reauthenticateWithCredential(user, credentials)
          .then(async () => {
            // Update new email
            await updateEmail(auth.currentUser, newEmail).catch((error) => {
              console.log(error.message);
            });

            await updateDoc(doc(db, 'Users', user?.displayName), {
              email: newEmail,
            });

            location.reload();
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        alert('Emails do not match');
      }
    }
  };

  // Handle Change Password
  const changePassword = async () => {
    if (user && user?.displayName !== undefined) {
      const auth = getAuth();
      const user = auth.currentUser;

      const { email } = user;

      // Prompt for current password
      const password = prompt('Type your current password');

      const credentials = EmailAuthProvider.credential(email, password);

      // Prompt for new password
      const newPassword = prompt('Type your new password');
      // Prompt for repeat new password
      const repeatNewPassword = prompt('Repeat your new password');

      // Check if password match
      if (newPassword === repeatNewPassword) {
        // Reauth user with password and password
        await reauthenticateWithCredential(user, credentials)
          .then(async () => {
            // Update new password
            await updatePassword(auth.currentUser, newPassword).catch(
              (error) => {
                console.log(error.message);
              }
            );

            logout();

            location.reload();
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        alert('Emails do not match');
      }
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      handleUserData();
    }
  }, []);

  return (
    <main className='max-w-lg'>
      <Head>
        <title>Debatts · Admin Panel</title>
      </Head>

      {loading && (
        <div className='col-span-full'>
          <div className='spinner'></div>
        </div>
      )}

      {!loading && (
        <LargeContainer className='col-span-full'>
          <h2 className=''>{userData?.userName}</h2>
          <div className='w-full border-b-2 text-gray-400 mt-2 text-center'>
            Information
          </div>
          {/* User Information */}
          <div className='my-1'>
            {/* Username */}
            <p>
              <span className='font-semibold'>Username:</span>{' '}
              {userData?.displayName}
            </p>
            {/* Full Name */}
            <p>
              <span className='font-semibold'>Full Name:</span>{' '}
              {userData?.fullName}
            </p>
            {/* Email Address */}
            <p>
              <span className='font-semibold'>Email Address:</span>{' '}
              {userData?.email}
            </p>
            {/* Created At */}
            <p>
              <span className='font-semibold'>Created at:</span>{' '}
              {userData?.createdAt}
            </p>
            {/* Role */}
            <p className='capitalize'>
              <span className='font-semibold'>Role:</span> {userData?.role}
            </p>
            {/* Approved */}
            <p className='capitalize'>
              <span className='font-semibold'>Approved:</span>{' '}
              {userData?.approved ? 'Yes' : 'No'}
            </p>
            {/* Banned */}
            <p className='capitalize'>
              <span className='font-semibold'>Banned:</span>{' '}
              {userData?.banned ? 'Yes' : 'No'}
            </p>
          </div>

          {/* Account Settings */}
          <div className='w-full border-b-2 text-gray-400 mt-2 text-center'>
            Account Settings
          </div>
          {/* Account Button */}
          <div className='my-1 flex flex-col align-center justify-center text-center'>
            {/* Change Email */}
            <a onClick={() => changeEmail()}>Change email</a>
            {/* Change Password */}
            <a onClick={() => changePassword()}>Change password</a>
            {/* Delete Account */}
            <a onClick={() => deleteAccount()}>Delete account</a>
          </div>
        </LargeContainer>
      )}
    </main>
  );
}
