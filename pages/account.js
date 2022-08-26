import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

import LargeContainer from "../components/containers/LargeContainer";

export default function Account() {
	const { user, logout } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) router.push("/");
	});

	return (
		<main className="max-w-lg">
			<LargeContainer className="col-span-full">
				<h2 className="">USERNAME</h2>
				<div className="w-full border-b-2 text-gray-400 mt-2">
					Stats
				</div>
				<div className="my-1">
					<p>## debatts</p>
					<p>## opinions</p>
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
