import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import CardContainer from "../components/containers/CardContainer";
import Button from "../components/buttons/Button";
import {
  deleteDoc,
  arrayRemove,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  where,
  query,
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
  const searchUser = useRef("");

  const [searchedUser, setSearchedUser] = useState([]);

  // Ban User
  const ban = async (displayName) => {
    // Ban User
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach(async (user) => {
      if (user.data().displayName === displayName) {
        user.data().debatts.map(async (debatt, i) => {
          await updateDoc(doc(db, "Users", displayName), {
            banned: true,
            debatts: arrayRemove(user.data().debatts[i]),
          });
        });
      }
    });

    const querySnapshot2 = await getDocs(collection(db, "Debatts"));
    querySnapshot2.forEach(async (docID) => {
      // // Delete banned user's posts
      if (docID.data().author === displayName) {
        await deleteDoc(doc(db, "Debatts", docID.data().title));
      }
      // Delete Agree Comments
      docID.data().agree.map(async (comment, i) => {
        if (comment.author === displayName) {
          await updateDoc(doc(db, "Debatts", docID.data().title), {
            agree: arrayRemove(docID.data().agree[i]),
          });
        }
      });
      // Delete Disagree Comments
      docID.data().disagree.map(async (comment, i) => {
        if (comment.author === displayName) {
          await updateDoc(doc(db, "Debatts", docID.data().title), {
            disagree: arrayRemove(docID.data().disagree[i]),
          });
        }
      });
    });

    // location.reload();
  };

  // Unban User
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

  // Make User Admin
  const makeAdmin = async (displayName) => {
    const docRef = doc(db, "Users", displayName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(doc(db, "Users", displayName), {
        role: "admin",
      });
    }

    location.reload();
  };

  const makeUser = async (displayName) => {
    const docRef = doc(db, "Users", displayName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(doc(db, "Users", displayName), {
        role: "user",
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

  // Search user
  const handleSearchUser = async () => {
    const q = query(
      collection(db, "Users"),
      where("displayName", "==", searchUser.current.value)
    );

    const userArr = [];
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      userArr.push(doc.data());
    });

    if (userArr.length === 0) {
      setSearchedUser([]);
    } else {
      setSearchedUser(userArr);
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
      {/* Statistics */}
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
      {/* Find User */}
      <CardContainer hover={false}>
        <h2>Find User</h2>
        <form>
          <div class="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              class="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              ref={searchUser}
              onChange={handleSearchUser}
              required
            />
          </div>
        </form>
        {searchedUser.length !== 0 &&
          searchedUser.map((userItem) => {
            return (
              <div key={user.id} className="text-center my-2">
                <p>{userItem.displayName}</p>
                <div className="my-2 flex justify-evenly items-center">
                  {userItem.role === "user" ? (
                    <Button
                      className="p-0"
                      onClick={() => makeAdmin(userItem.displayName)}
                    >
                      Admin
                    </Button>
                  ) : (
                    <Button
                      className="p-0"
                      onClick={() => makeUser(userItem.displayName)}
                    >
                      User
                    </Button>
                  )}

                  {userItem.banned !== undefined && userItem.banned === true ? (
                    <Button
                      className="p-0"
                      onClick={() => unban(userItem.displayName)}
                    >
                      Unban
                    </Button>
                  ) : (
                    <Button
                      className="p-0"
                      onClick={() => ban(userItem.displayName)}
                    >
                      Ban
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        {searchedUser.length === 0 && <div>No user found</div>}
      </CardContainer>
      {/* Banned Users */}
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
      {/* Find Posts */}
      <CardContainer hover={false}>
        <h2>Find Post</h2>
        <p>TODO if necessary</p>
      </CardContainer>
    </main>
  );
}
