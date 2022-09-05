import { useEffect, useState } from "react";
import Head from "next/head";
import CardContainer from "../components/containers/CardContainer";
import Button from "../components/buttons/Button";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Admin() {
  // User obj
  const { user } = useAuth();
  // Router
  const router = useRouter();
  // Handle Total Posts
  const [totalPosts, setTotalPosts] = useState([]);
  // Handle Total Users
  const [totalUsers, setTotalUsers] = useState([]);
  // Handle Total Banned Users
  const [totalBannerUsers, setTotalBannerUsers] = useState([]);
  // Handle Banned Users
  const [bannedUsers, setBannedUsers] = useState([]);

  const unban = async (displayName) => {
    const docRef = doc(db, "Users", displayName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(doc(db, "Users", displayName), {
        banned: false,
      });
    }

    location.reload();
  };

  // Fetch Statistics
  const fetchStatistics = async () => {
    const docRef = doc(db, "Users", user.displayName);
    const docSnap = await getDoc(docRef);

    // Check if current user's role is admin
    if (docSnap.exists()) {
      if (docSnap.data().role !== "admin") {
        router.push("/");
      } else if (docSnap.data().role === "admin") {
        // Fetch Total Debats
        const querySnapshot = await getDocs(collection(db, "Debatts"));
        const debattsArr = [];
        querySnapshot.forEach((doc) => {
          debattsArr.push(doc.data());
        });
        setTotalPosts(debattsArr);

        // Fetch Total Users
        const querySnapshot2 = await getDocs(collection(db, "Users"));
        const usersArr = [];
        querySnapshot2.forEach((doc) => {
          usersArr.push(doc.data());
        });
        setTotalUsers(usersArr);

        // Fetch Total Banner Users TODO
        const bannedUsersArr = [];
        querySnapshot2.forEach((doc) => {
          if (doc.data().banned && doc.data().banned !== undefined) {
            bannedUsersArr.push(doc.data());
          }
        });
        setTotalBannerUsers(bannedUsersArr);
        setBannedUsers(bannedUsersArr);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchStatistics();
    }
  }, []);

  return (
    <main className="max-w-3xl">
      <Head>
        <title>Debatts · Admin Panel</title>
      </Head>
      <h1 className="col-span-full text-center">Admin Panel</h1>
      <CardContainer wide hover={false}>
        <h2>Statistics</h2>
        <div className="overflow-y-scroll flex justify-start items-stretch flex-col h-full w-full">
          <table className="table-fixed [&>*>tr:nth-child(odd)]:bg-black/5 [&>*>tr>td:nth-child(2)]:font-mono [&>*>tr>td]:p-0.5 rounded-md  ">
            <tbody>
              <tr>
                <td>Number of posts</td>
                <td>{totalPosts?.length}</td>
              </tr>
              <tr>
                <td>Number of users</td>
                <td>{totalUsers?.length}</td>
              </tr>
              <tr>
                <td>Number of banned users</td>
                <td>{totalBannerUsers?.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContainer>
      <CardContainer hover={false}>
        <h2>Find User</h2>
        <p>TODO if necessary</p>
      </CardContainer>
      <CardContainer wide hover={false}>
        <h2>Banned Users</h2>
        <table className="table-auto w-full flex flex-col justify-start items-center max-h-[250px] overflow-y-scroll shadow-inner [&>tbody>tr:nth-child(odd)]:bg-black/5">
          <tbody className="w-full">
            <tr className="flex flex-row justify-between items-center w-full p-0.5">
              <th>Number</th>
              <th>Username</th>
              <th>Unban</th>
            </tr>

            {bannedUsers.map((e, i) => {
              return (
                <tr
                  key={i}
                  className="flex flex-row justify-between items-center w-full p-0.5"
                >
                  <td>{i + 1}</td>
                  <td>{e.displayName}</td>
                  <td>
                    <Button
                      className="p-0"
                      onClick={() => unban(e.displayName)}
                    >
                      Unban
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContainer>
      <CardContainer hover={false}>
        <h2>Find Post</h2>
        <p>TODO if necessary</p>
      </CardContainer>
    </main>
  );
}
