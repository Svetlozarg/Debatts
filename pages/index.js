import Head from "next/head";
import Card from "../components/containers/Card";

export default function Home() {
	const debatts = [
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "very very very very very very very very very very long title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "very very very very very very very very very very long title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "very very very very very very very very very very long title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "very very very very very very very very very very long title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "small body",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "2 small",
			id: "abc",
		},
		{
			title: "title",
			body: "iquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Pha",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
		{
			title: "title",
			body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pharetra augue at lectus iaculis cursus nec eget nibh. Quisque ultrices mattis ex euismod faucibus. Curabitur et dignissim purus. Aliquam purus ligula, blandit quis ante id, consectetur dapibus lectus. Phasellus et eros sed enim venenatis tincidunt. Pellentesque dolor metus, faucibus ut porta at, condimentum eu risus. Aenean fermentum et lectus vel pharetra. Praesent hendrerit tincidunt nisl, malesuada posuere diam bibendum sed. Nullam volutpat posuere blandit. ",
			id: "abc",
		},
	];

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Home */}
			<main>
				{debatts.map((e, i) => {
					return (
						<Card
							key={i}
							title={e.title}
							body={e.body}
							id={e.id}
							wide={i == 0}
						/>
					);
				})}
			</main>
		</div>
	);
}
