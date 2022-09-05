import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import {
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Head from "next/head";
import { getAuth, deleteUser } from "firebase/auth";

import LargeContainer from "../components/containers/LargeContainer";

export default function Account() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  // Fetch user data
  const handleUserData = async () => {
    const docRef = doc(db, "Users", user.displayName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  // Check if user is banned
  const checkBannedUser = async () => {
    if (user) {
      const docRef = doc(db, "Users", user?.displayName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data().banned && docSnap.data().banned !== undefined) {
          alert("You are banned");
          logout();
        }
      } else {
        console.log("No such document!");
      }
    }
  };

  // Handle delete account
  const deleteAccount = async () => {
    const docRef = doc(db, "Users", user?.displayName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Delete user
      await deleteDoc(doc(db, "Users", user?.displayName));
    }

    const querySnapshot = await getDocs(collection(db, "Debatts"));
    querySnapshot.forEach(async (getDoc) => {
      // Delete posts
      if (getDoc.data().author === user?.displayName) {
        await deleteDoc(doc(db, "Debatts", getDoc.data().title));
      }

      // Delete Agree Comments
      getDoc.data().agree.map(async (comment, i) => {
        if (comment.author === user?.displayName) {
          await updateDoc(doc(db, "Debatts", getDoc.data().title), {
            agree: arrayRemove(getDoc.data().agree[i]),
          });
        }
      });

      // Delete Disagree Comments
      getDoc.data().disagree.map(async (comment, i) => {
        if (comment.author === user?.displayName) {
          await updateDoc(doc(db, "Debatts", getDoc.data().title), {
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

    router.push("/login");
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      checkBannedUser();
      handleUserData();
    }
  }, []);

  return (
    <main className="max-w-lg">
      <Head>
        <title>Debatts · Admin Panel</title>
      </Head>
      <LargeContainer className="col-span-full">
        <h2 className="">{userData?.userName}</h2>
        <div className="w-full border-b-2 text-gray-400 mt-2">Information</div>
        <div className="my-1">
          <p>Username: {userData?.displayName}</p>
          <p>Full Name: {userData?.fullName}</p>
          <p>Email Address: {userData?.email}</p>
          <p>Created at: {userData?.createdAt}</p>
        </div>
        <div className="w-full border-b-2 text-gray-400 mt-2">
          Account settings
        </div>
        <div className="my-1 flex flex-col w-fit">
          <p>TODO</p>
          <a>Change email</a>
          <p>TODO</p>
          <a>Change password</a>
          <a onClick={() => deleteAccount()}>Delete account</a>
        </div>
      </LargeContainer>
    </main>
  );
}
