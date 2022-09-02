import { useState } from "react";
import Head from "next/head";
import CardContainer from "../components/containers/CardContainer";
import Button from "../components/buttons/Button";

export default function Admin() {
	const [stats, setStats] = useState({
		posts: 123,
		comments: 123,
		users: 123,
		bannedUsers: 123,
		bannedPosts: 123,
	});

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
								<td>{stats.posts}</td>
							</tr>
							<tr>
								<td>Number of comments</td>
								<td>{stats.comments}</td>
							</tr>
							<tr>
								<td>Number of users</td>
								<td>{stats.users}</td>
							</tr>
							<tr>
								<td>Number of banned users</td>
								<td>{stats.bannedUsers}</td>
							</tr>
							<tr>
								<td>Number of banned posts</td>
								<td>{stats.bannedPosts}</td>
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
										<Button
											className="p-0"
											onClick={() => unban(e.username)}
										>
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
