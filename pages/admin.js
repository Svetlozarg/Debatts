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
	deleteField,
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
	// Handle Total Admins
	const [totalAdminsUsers, setTotalAdminsUsers] = useState([]);
	// Handle Total Banned Users
	const [totalBannerUsers, setTotalBannerUsers] = useState([]);
	// Handle Banned Users
	const [bannedUsers, setBannedUsers] = useState([]);
	const searchUser = useRef("");
	// Handle Approved Users
	const [unapprovedUsers, setUnapprovedUsers] = useState([]);

	// users
	const [users, setUsers] = useState([
		{ index: 1, username: "u1", email: "e1" },
		{ index: 2, username: "u2", email: "e2" },
		{ index: 3, username: "u3", email: "e3" },
		{ index: 4, username: "u4", email: "e4" },
		{ index: 5, username: "u5", email: "e5" },
		{ index: 6, username: "u6", email: "e6" },
		{ index: 7, username: "u7", email: "e7" },
		{ index: 8, username: "u8", email: "e8" },
		{ index: 9, username: "u9", email: "e9" },
		{ index: 10, username: "u10", email: "e10" },
		{ index: 11, username: "u11", email: "e11" },
		{ index: 12, username: "u12", email: "e12" },
		{ index: 13, username: "u13", email: "e13" },
		{ index: 14, username: "u14", email: "e14" },
		{ index: 15, username: "u15", email: "e15" },
		{ index: 16, username: "u16", email: "e16" },
		{ index: 17, username: "u17", email: "e17" },
		{ index: 18, username: "u18", email: "e18" },
		{ index: 19, username: "u19", email: "e19" },
	]);
	const [usersPage, setUsersPage] = useState(0);

	const usersPerPage = 10;

	useEffect(() => {
		if (usersPage * usersPerPage > users.length) {
			setUsersPage(0);
		} else if (usersPage < 0) {
			setUsersPage(parseInt(users.length / usersPerPage));
		}
	}, [usersPage]);

	// Ban User
	const ban = async (username) => {
		const docRef = doc(db, "Users", username);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			// Ban user and delete user debatts
			await updateDoc(doc(db, "Users", username), {
				banned: true,
				debatts: deleteField(),
			});
		}

		const querySnapshot = await getDocs(collection(db, "Debatts"));
		querySnapshot.forEach(async (currDoc) => {
			if (currDoc.data().author === username) {
				await deleteDoc(doc(db, "Debatts", currDoc.data().title));
			}

			currDoc.data().agree.map(async (comment, i) => {
				if (comment.author === username) {
					await updateDoc(doc(db, "Debatts", currDoc.data().title), {
						agree: arrayRemove(currDoc.data().agree[i]),
					});
				}
			});

			currDoc.data().disagree.map(async (comment, i) => {
				if (comment.author === username) {
					await updateDoc(doc(db, "Debatts", currDoc.data().title), {
						disagree: arrayRemove(currDoc.data().disagree[i]),
					});
				}
			});
		});

		location.reload();
	};

	// Unban User
	const unban = async (username) => {
		const docRef = doc(db, "Users", username);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			// Unban user
			await updateDoc(doc(db, "Users", username), {
				banned: false,
			});
		}

		location.reload();
	};

	// Approve User
	const approve = async (username) => {
		const docRef = doc(db, "Users", username);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			// Unban user
			await updateDoc(doc(db, "Users", username), {
				approved: true,
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

				// Fetch Total Banner Users
				const bannedUsersArr = [];
				const adminsArr = [];
				const unapprovedUsersArr = [];
				querySnapshot2.forEach((doc) => {
					if (doc.data().banned && doc.data().banned !== undefined) {
						bannedUsersArr.push(doc.data());
					} else if (
						!doc.data().approved &&
						doc.data().approved !== undefined
					) {
						unapprovedUsersArr.push(doc.data());
					} else if (doc.data().role === "admin") {
						adminsArr.push(doc.data());
					}
				});
				setTotalAdminsUsers(adminsArr);
				setTotalBannerUsers(bannedUsersArr);
				setBannedUsers(bannedUsersArr);
				setUnapprovedUsers(unapprovedUsersArr);
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
		<main className="max-w-5xl grid-cols-3">
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
								<td>Number of admins</td>
								<td>{totalAdminsUsers?.length}</td>
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
			{/* <CardContainer hover={false}>
				<h2>Find User</h2>
				<form>
					<div className="relative">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</div>
						<input
							type="search"
							id="search"
							className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
											onClick={() =>
												makeAdmin(userItem.displayName)
											}
										>
											Make Admin
										</Button>
									) : (
										<Button
											className="p-0"
											onClick={() =>
												makeUser(userItem.displayName)
											}
										>
											Make User
										</Button>
									)}

									{userItem.banned !== undefined &&
									userItem.banned === true ? (
										<Button
											className="p-0"
											onClick={() =>
												unban(userItem.displayName)
											}
										>
											Unban
										</Button>
									) : (
										<Button
											className="p-0"
											onClick={() =>
												ban(userItem.displayName)
											}
										>
											Ban
										</Button>
									)}
								</div>
							</div>
						);
					})}
				{searchedUser.length === 0 && <div>No user found</div>}
			</CardContainer> */}
			{/* Unapproved Users */}
			<CardContainer wide hover={false}>
				<h2>Unapproved Users</h2>
				<table className="table-auto w-full flex flex-col justify-start items-center max-h-[250px] overflow-y-scroll shadow-inner [&>tbody>tr:nth-child(odd)]:bg-black/5">
					<tbody className="w-full">
						<tr className="flex flex-row justify-between items-center w-full p-0.5">
							<th>Number</th>
							<th>Username</th>
							<th>Approve</th>
						</tr>

						{unapprovedUsers.map((e, i) => {
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
											onClick={() =>
												approve(e.displayName)
											}
										>
											Approve
										</Button>
									</td>
								</tr>
							);
						})}

						{unapprovedUsers.length === 0 && (
							<tr className="flex flex-row justify-between items-center w-full p-0.5">
								<td></td>
								<td>No users</td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>
			</CardContainer>
			{/* Find Posts */}
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

						{bannedUsers.length === 0 && (
							<tr className="flex flex-row justify-between items-center w-full p-0.5">
								<td></td>
								<td>No users</td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>
			</CardContainer>
			{/* Admins */}
			<CardContainer wide hover={false}>
				<h2>Admins</h2>
				<table className="table-auto w-full flex flex-col justify-start items-center max-h-[250px] overflow-y-scroll shadow-inner [&>tbody>tr:nth-child(odd)]:bg-black/5">
					<tbody className="w-full">
						<tr className="flex flex-row justify-between items-center w-full p-0.5">
							<th>Number</th>
							<th>Username</th>
							<th>Action</th>
						</tr>

						{totalAdminsUsers.map((e, i) => {
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
											onClick={() =>
												makeUser(e.displayName)
											}
										>
											Make User
										</Button>
									</td>
								</tr>
							);
						})}

						{totalAdminsUsers.length === 0 && (
							<tr className="flex flex-row justify-between items-center w-full p-0.5">
								<td></td>
								<td>No users</td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>
			</CardContainer>
			{/* Users */}
			<CardContainer wide hover={false} className="max-h-[750px]">
				<h2>Users</h2>
				<table className="table-auto w-full flex flex-col justify-start items-center  overflow-y-scroll shadow-inner [&>tbody>tr:nth-child(odd)]:bg-black/5">
					<tbody className="w-full">
						<tr className="flex flex-row justify-between items-center w-full p-0.5">
							<th>Number</th>
							<th>Username</th>
							<th>Email</th>
						</tr>

						{users
							.slice(
								usersPage * usersPerPage,
								Math.min(
									users.length,
									(usersPage + 1) * usersPerPage
								)
							)
							.map((e) => {
								return (
									<tr
										key={e.index}
										className="flex flex-row justify-between items-center w-full p-0.5"
									>
										<td>{e.index}</td>
										<td>{e.username}</td>
										<td>{e.email}</td>
									</tr>
								);
							})}

						{users.length === 0 && (
							<tr className="flex flex-row justify-between items-center w-full p-0.5">
								<td></td>
								<td>No users</td>
								<td></td>
							</tr>
						)}
					</tbody>
				</table>
				<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
					<div className="flex flex-1 justify-between sm:hidden">
						<a
							href="#"
							className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							Previous
						</a>
						<a
							href="#"
							className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							Next
						</a>
					</div>
					<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
						<div>
							<p className="text-sm text-gray-700">
								Showing
								<span className="font-medium">
									{" "}
									{usersPage * usersPerPage + 1}{" "}
								</span>
								to
								<span className="font-medium">
									{" "}
									{Math.min(
										users.length,
										(usersPage + 1) * usersPerPage
									)}{" "}
								</span>
								of
								<span className="font-medium">
									{" "}
									{users.length}{" "}
								</span>
								results
							</p>
						</div>
						<div>
							<nav
								className="isolate inline-flex -space-x-px rounded-md shadow-sm"
								aria-label="Pagination"
							>
								<a
									className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
									onClick={() => setUsersPage(usersPage - 1)}
								>
									<span className="sr-only">Previous</span>
									<svg
										className="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								<p
									aria-current="page"
									className="relative z-10 inline-flex items-center border  bg-indigo-50 px-4 py-2 text-sm font-medium  focus:z-20"
								>
									{usersPage + 1}
								</p>

								<a
									className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
									onClick={() => setUsersPage(usersPage + 1)}
								>
									<span className="sr-only">Next</span>
									<svg
										className="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
							</nav>
						</div>
					</div>
				</div>
			</CardContainer>
		</main>
	);
}
