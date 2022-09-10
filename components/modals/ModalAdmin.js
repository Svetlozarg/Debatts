import ButtonOutline from '../buttons/ButtonOutline';
import Modal from './Modal';
import {
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  collection,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useRouter } from 'next/router';

export default function ModalAdmin({
  isOpen,
  onClose,
  userID,
  postID,
  commentID,
  type,
}) {
  const router = useRouter();

  // Ban User Function
  const banUser = async (id) => {
    if (id) {
      // Ban User
      const querySnapshot = await getDocs(collection(db, 'Users'));
      querySnapshot.forEach(async (user) => {
        if (user.data().displayName === id) {
          user.data().debatts.map(async (debatt, i) => {
            await updateDoc(doc(db, 'Users', id), {
              banned: true,
              debatts: arrayRemove(user.data().debatts[i]),
            });
          });
        }
      });

      const querySnapshot2 = await getDocs(collection(db, 'Debatts'));
      querySnapshot2.forEach(async (docID) => {
        // // Delete banned user's posts
        if (docID.data().author === id) {
          await deleteDoc(doc(db, 'Debatts', docID.data().title));
        }
        // Delete Agree Comments
        docID.data().agree.map(async (comment, i) => {
          if (comment.author === id) {
            await updateDoc(doc(db, 'Debatts', docID.data().title), {
              agree: arrayRemove(docID.data().agree[i]),
            });
          }
        });
        // Delete Disagree Comments
        docID.data().disagree.map(async (comment, i) => {
          if (comment.author === id) {
            await updateDoc(doc(db, 'Debatts', docID.data().title), {
              disagree: arrayRemove(docID.data().disagree[i]),
            });
          }
        });
      });

      if (window.location.pathname === '/') {
        location.reload();
      } else {
        router.push('/');
      }
    }
  };

  // Delete Post Function
  const deletePost = async (id) => {
    if (id) {
      // Remove post from user debatt's array
      const querySnapshot = await getDocs(collection(db, 'Users'));
      querySnapshot.forEach(async (user) => {
        if (user.data().displayName === userID) {
          user.data().debatts.map(async (debatt, i) => {
            if (debatt.title === id) {
              await updateDoc(doc(db, 'Users', userID), {
                debatts: arrayRemove(user.data().debatts[i]),
              });
            }
          });
        }
      });

      // Remove Post
      await deleteDoc(doc(db, 'Debatts', id));

      if (window.location.pathname === '/') {
        location.reload();
      } else {
        router.push('/');
      }
    }
  };

  // Delete Comment Function
  const deleteComment = async (id) => {
    if (id) {
      const querySnapshot = await getDocs(collection(db, 'Debatts'));
      querySnapshot.forEach(async (docID) => {
        if (docID.data().title === postID) {
          if (type === 'agree') {
            docID.data().agree.map(async (comment, i) => {
              if (comment.author === userID) {
                if (comment.comment === commentID) {
                  await updateDoc(doc(db, 'Debatts', postID), {
                    agree: arrayRemove(docID.data().agree[i]),
                  });
                  location.reload();
                }
              }
            });
          } else if (type === 'disagree') {
            docID.data().disagree.map(async (comment, i) => {
              if (comment.author === userID) {
                if (comment.comment === commentID) {
                  await updateDoc(doc(db, 'Debatts', postID), {
                    disagree: arrayRemove(docID.data().disagree[i]),
                  });
                  location.reload();
                }
              }
            });
          }
        }
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Admin Controls</h2>
      <div className='flex flex-col gap-2'>
        {userID && (
          <ButtonOutline onClick={() => banUser(userID)}>
            Ban user
          </ButtonOutline>
        )}
        {postID && (
          <ButtonOutline onClick={() => deletePost(postID)}>
            Remove post
          </ButtonOutline>
        )}
        {commentID && (
          <ButtonOutline onClick={() => deleteComment(commentID)}>
            Remove comment
          </ButtonOutline>
        )}
        <ButtonOutline onClick={onClose} negative>
          Close
        </ButtonOutline>
      </div>
    </Modal>
  );
}
