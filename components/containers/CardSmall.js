import { useState, useEffect } from 'react';
import ModalAdmin from '../modals/ModalAdmin';
import ButtonActionRound from '../buttons/ButtonActionRound';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';

export default function CardSmall({ title, body, post, onClick, type }) {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalShown, setIsAdminModalShown] = useState(false);

  // Check if user's role is admin
  const checkAdmin = async () => {
    if (user && user?.displayName !== undefined) {
      const docRef = doc(db, 'Users', user?.displayName);
      const docSnap = await getDoc(docRef);

      // Check if current user's role is admin
      if (docSnap.exists()) {
        if (docSnap.data().role === 'admin') {
          setIsAdmin(true);
        }
      }
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <div
      className='bg-backAccent w-full min-h-[150px] shadow-sm rounded-md p-2 relative [&:not(:hover)>#adminButton]:hidden'
      onClick={onClick}
    >
      <div className='relative w-full mb-2 italic'>
        <h4 className='text-center'>{title}</h4>
        <div className='absolute h-1 w-1/5 -right-2 bottom-0 bg-secondary'></div>
      </div>
      <p className='text-sm'>{body}</p>
      {isAdmin && (
        <div className='absolute top-1 left-1 ' id='adminButton'>
          <ButtonActionRound
            onClick={(e) => {
              e.stopPropagation();
              setIsAdminModalShown(!isAdminModalShown);
            }}
            className='dropdown'
          >
            <svg viewBox='0 0 24 24' className='w-6'>
              <path
                className='fill-gray-500'
                fill='currentColor'
                d='M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z'
              />
            </svg>
          </ButtonActionRound>
        </div>
      )}
      <ModalAdmin
        isOpen={isAdmin && isAdminModalShown}
        onClose={(e) => {
          e.stopPropagation();
          setIsAdminModalShown(false);
        }}
        userID={title}
        commentID={body}
        postID={post}
        type={type}
      />
    </div>
  );
}
