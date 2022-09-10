import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import Head from 'next/head';
import Card from '../components/containers/Card';
import ButtonOutline from '../components/buttons/ButtonOutline';
import Link from 'next/link';
import ButtonActionRound from '../components/buttons/ButtonActionRound';
import { checkApproved } from '../utils/checkApproved';
import { checkBanned } from '../utils/checkBanned';

export default function MyPosts() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // State to store posts
  const [posts, setPosts] = useState();
  const [numberPosts, setNumberPosts] = useState(23);
  const [loading, setLoading] = useState(true);

  // Fetch Posts
  const fetchPosts = async () => {
    // Chech if Approved
    if ((await checkApproved(user)) === false) {
      alert(
        'You are not approved. Please wait for an admin to go through your request and approve your profile. Thank you for your patience!'
      );
      logout();
      return;
      // Check if banned
    } else if ((await checkBanned(user)) === true) {
      alert('You are banned');
      logout();
      return;
    } else if (user && user?.displayName !== undefined) {
      const docRef = doc(db, 'Users', user.displayName);
      const docSnap = await getDoc(docRef);
      setPosts(docSnap.data().debatts);

      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  // Handle Load More Posts
  const loadMorePosts = () => {
    setNumberPosts((prevValue) => prevValue + 10);
  };

  useEffect(() => {
    if (!user) {
      router.push('/');
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <main>
        <Head>
          <title>Debatts · My Debatts</title>
        </Head>

        {/* My Debatts Header */}
        {posts && (
          <div className='col-span-full relative w-full'>
            <h2 className=' text-center'>{posts ? 'Your Debatts' : ''}</h2>
            <div className='absolute right-6 top-0 flex justify-center items-center gap-2'>
              <p>My Account</p>
              <Link href='/account/'>
                <ButtonActionRound className='w-9 h-9 '>
                  <svg viewBox='0 0 24 24' className='w-8 h-8 '>
                    <path
                      fill='currentColor'
                      d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'
                    />
                  </svg>
                </ButtonActionRound>
              </Link>
            </div>
          </div>
        )}

        {/* My Debatts Cards */}
        {!loading &&
          posts?.length !== 0 &&
          posts?.slice(0, numberPosts).map((e, i) => {
            return (
              <Card
                key={i}
                title={e.title}
                body={e.body}
                author={e.author}
                id={e.title}
                createdAt={e.createdAt}
                wide={i == 0}
              />
            );
          })}

        {!loading &&
          posts.length === 0 && ( // If not posts
            <div className='col-span-full text-xl text-center flex flex-col justify-start items-center gap-4'>
              <p>It seems you have not posted a debatts yet!</p>
              <Link href='/post/'>
                <ButtonOutline>Click here to post one</ButtonOutline>
              </Link>
              <p>Or</p>
              <Link href='/'>
                <ButtonOutline>Follow other Debatts</ButtonOutline>
              </Link>
            </div>
          )}
      </main>

      {/* Load More Posts Button */}
      {!loading && posts?.length > 23 && posts?.length >= numberPosts && (
        <div className='flex justify-center align-center mb-6'>
          <button
            className='transition ease-in-out duration-250 bg-transparent hover:bg-blue-700 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-700 hover:border-transparent rounded'
            onClick={loadMorePosts}
          >
            Load More
          </button>
        </div>
      )}

      {loading && <div className='spinner'></div>}
    </div>
  );
}
