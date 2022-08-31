import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import Card from "../components/containers/Card";
import ButtonOutline from "../components/buttons/ButtonOutline";
import Link from "next/link";
import ButtonActionRound from "../components/buttons/ButtonActionRound";

export default function MyPosts() {
  const { user } = useAuth();
  const router = useRouter();

  // posts go here
  const [posts, setPosts] = useState();

  const fetchPosts = async () => {
    const docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    setPosts(docSnap.data().debatts);
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    fetchPosts();
  }, []);

  return (
    <main>
      {posts && (
        <div className="col-span-full relative w-full">
          <h2 className=" text-center">{posts ? "Your Debatts" : ""}</h2>
          <div className="absolute right-6 top-0">
            <Link href="/account/">
              <ButtonActionRound className="w-9 h-9 ">
                <svg viewBox="0 0 24 24" className="w-8 h-8 ">
                  <path
                    fill="currentColor"
                    d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                  />
                </svg>
              </ButtonActionRound>
            </Link>
          </div>
        </div>
      )}

      {posts ? (
        posts.map((e, i) => {
          return (
            <Card
              key={i}
              title={e.title}
              body={e.body}
              id={e.id}
              wide={i == 0}
            />
          );
        })
      ) : (
        <div className="col-span-full text-xl text-center flex flex-col justify-start items-center gap-4">
          <p>It seems you have not posted a debatts yet!</p>
          <Link href="/post/">
            <ButtonOutline>Click here to post one</ButtonOutline>
          </Link>
          <p>Or</p>
          <Link href="/">
            <ButtonOutline>Follow other Debatts</ButtonOutline>
          </Link>
        </div>
      )}
    </main>
  );
}
