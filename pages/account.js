import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import LargeContainer from "../components/containers/LargeContainer";

export default function Account() {
  const { user } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  // Fetch user data
  const handleUserData = async () => {
    const docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      handleUserData();
    }
  }, []);

  return (
    <main className="max-w-lg">
      <LargeContainer className="col-span-full">
        <h2 className="">{userData?.userName}</h2>
        <div className="w-full border-b-2 text-gray-400 mt-2">Information</div>
        <div className="my-1">
          <p>Full Name: {userData?.fullName}</p>
          <p>Email Address: {userData?.email}</p>
          <p>Created at: {userData?.createdAt}</p>
        </div>
        <div className="w-full border-b-2 text-gray-400 mt-2">
          Account settings
        </div>
        <div className="my-1 flex flex-col w-fit">
          <a>Change email</a>
          <a>Change password</a>
          <a>Delete account</a>
        </div>
      </LargeContainer>
    </main>
  );
}
