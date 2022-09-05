import { useEffect, useState } from "react";
import Head from "next/head";
import CardContainer from "../components/containers/CardContainer";
import Button from "../components/buttons/Button";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
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
  // Handle Total Users
  const [totalBannerUsers, setTotalBannerUsers] = useState([]);
  // Handle Total Users
  const [totalBannerPosts, setTotalBannerPosts] = useState([]);
  // Handle Banned Users
  const [bannedUsers, setBannedUsers] = useState([
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
    { username: "username", banTime: "1 day", banDate: "08/08/2022" },
  ]);

  const [removedPosts, setBannedPosts] = useState([
    {
      username: "username",
      banTime: "1 day",
      banDate: "08/08/2022",
      id: "abc",
    },
    {
      username: "username",
      banTime: "1 day",
      banDate: "08/08/2022",
      id: "abc",
    },
    {
      username: "username",
      banTime: "1 day",
      banDate: "08/08/2022",
      id: "abc",
    },
  ]);

  function unban(username) {}

  // Fetch Statistics
  const fetchStatistics = async () => {
    const docRef = doc(db, "Users", user.email);
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

        // Fetch Total Banner Posts TODO
      }
    }
  };

  useEffect(() => {
    fetchStatistics();
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
              <tr>
                <td>Number of banned posts</td>
                <td>{totalBannerPosts?.length}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContainer>
      <CardContainer hover={false}>
        <h2>Find User</h2>
      </CardContainer>
      <CardContainer wide hover={false}>
        <h2>Banned Users</h2>
        <table className="table-auto w-full flex flex-col justify-start items-center max-h-[250px] overflow-y-scroll shadow-inner [&>tbody>tr:nth-child(odd)]:bg-black/5">
          <tbody className="w-full">
            <tr className="flex flex-row justify-between items-center w-full p-0.5">
              <th>Number</th>
              <th>Username</th>
              <th>Ban Time</th>
              <th>Ban Date</th>
              <th>Unban</th>
            </tr>

            {bannedUsers.map((e, i) => {
              return (
                <tr
                  key={i}
                  className="flex flex-row justify-between items-center w-full p-0.5"
                >
                  <td>{i + 1}</td>
                  <td>{e.username}</td>
                  <td>{e.banTime}</td>
                  <td>{e.banDate}</td>
                  <td>
                    <Button className="p-0" onClick={() => unban(e.username)}>
                      unban
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
      </CardContainer>
      <CardContainer wide hover={false}>
        <h2>Banned Posts</h2>
        <table className="table-auto w-full flex flex-col justify-start items-center max-h-[250px] overflow-y-scroll shadow-inner [&>tbody>tr:nth-child(odd)]:bg-black/5">
          <tbody className="w-full">
            <tr className="flex flex-row justify-between items-center w-full p-0.5">
              <th>Number</th>
              <th>Username</th>
              <th>Ban Time</th>
              <th>Ban Date</th>
              <th>id</th>
            </tr>

            {removedPosts.map((e, i) => {
              return (
                <tr
                  key={i}
                  className="flex flex-row justify-between items-center w-full p-0.5"
                >
                  <td>{i + 1}</td>
                  <td>{e.username}</td>
                  <td>{e.banTime}</td>
                  <td>{e.banDate}</td>
                  <td>{e.id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContainer>
    </main>
  );
}
