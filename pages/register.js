import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useRouter } from 'next/router';
import ButtonOutline from '../components/buttons/ButtonOutline';
import LargeContainer from '../components/containers/LargeContainer';
import TextInput from '../components/inputs/TextInput';
import Checkbox from '../components/inputs/Checkbox';
import Head from 'next/head';
import ModalError from '../components/modals/ModalError';
import { updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Register() {
  const router = useRouter();
  // Get user and register function
  const { user, register } = useAuth();
  // State for data
  const [data, setData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    rpassword: '',
  });

  //password state
  const [passwordReqs, setPasswordReqs] = useState({
    over6: false,
    upper: false,
    lower: false,
    symbol: false,
    matching: false,
  });
  const [isOver6, setIsOver6] = useState(false);
  const [isUpper, setIsUpper] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    if (data.password.length > 6) {
      setIsOver6(true);
    } else {
      setIsOver6(false);
    }

    if (data.password.match(/[0-9]/g)) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }

    if (data.password.match(/[A-Z]/g)) {
      setIsUpper(true);
    } else {
      setIsUpper(false);
    }

    if (data.password.match(/[^0-9a-zA-Z]/g)) {
      setIsSymbol(true);
    } else {
      setIsSymbol(false);
    }

    if (data.password === data.rpassword) {
      setIsMatching(true);
    } else {
      setIsMatching(false);
    }
  }, [data]);

  // Error modal
  const [errorToShow, setErrorToShow] = useState('');
  const [isErrorShowing, setIsErrorShowing] = useState(false);

  // Handle register on submit
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isOver6 || !isNumber || !isUpper || !isSymbol || !isMatching) {
      setErrorToShow('One or more of the password requirements are not met!');
      setIsErrorShowing(true);
      return;
    }

    // Try register user with email and password
    if (data?.password === data?.rpassword) {
      try {
        await register(data?.email, data?.password).then(
          async (userCredential) => {
            const userData = userCredential.user;

            console.log(userData);

            updateProfile(auth?.currentUser, {
              displayName: data?.userName,
            });

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            await setDoc(doc(db, 'Users', data?.userName), {
              fullName: data?.fullName,
              displayName: data?.userName,
              email: data?.userName,
              role: 'user',
              debatts: [],
              approved: false,
              banned: false,
              createdAt: (today = mm + '/' + dd + '/' + yyyy),
            });

            setTimeout(() => {
              location.reload();
              router.push('/');
            }, 1000);
          }
        );
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ' / ' + errorMessage);
      }
    }

    // try {
    //   if (data?.password === data?.rpassword) {
    //     var today = new Date();
    //     var dd = String(today.getDate()).padStart(2, '0');
    //     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //     var yyyy = today.getFullYear();

    //     if (data?.userName !== undefined && data?.userName !== '') {
    //       // Create User DB Doc
    //       await setDoc(doc(db, 'Users', data?.userName), {
    //         fullName: data?.fullName,
    //         displayName: data?.userName,
    //         email: data?.email,
    //         role: 'user',
    //         debatts: [],
    //         approved: false,
    //         banned: false,
    //         createdAt: (today = mm + '/' + dd + '/' + yyyy),
    //       });

    //       // Register user
    //       await register(data?.email, data?.password);

    //       const auth = getAuth();

    //       updateProfile(auth?.currentUser, {
    //         displayName: data?.userName,
    //       });

    //       location.reload();

    //       setTimeout(() => {
    //         router.push('/');
    //       }, 1000);
    //     }
    //   } else {
    //     setErrorToShow('Passwords do not match!');
    //     setIsErrorShowing(true);
    //     return;
    //   }
    // } catch (e) {
    //   setErrorToShow(e);
    //   setIsErrorShowing(true);
    // }
  };

  if (!user) {
    return (
      <main className='max-w-lg'>
        <Head>
          <title>Debatts · Register</title>
        </Head>
        <LargeContainer className='col-span-full'>
          <h1 className='text-center select-none'>Register Page</h1>
          {/* Register Form */}
          <form className='grid gap-4' onSubmit={handleRegister}>
            {/* Full Name */}
            <TextInput
              id='fullName'
              type='text'
              label='Full Name *'
              onChange={(e) => {
                setData({
                  ...data,
                  fullName: e.target.value,
                });
              }}
              required
              placeholder='Full name'
            ></TextInput>

            {/* Username */}
            <TextInput
              id='username'
              type='text'
              label='Username *'
              onChange={(e) => {
                setData({
                  ...data,
                  userName: e.target.value,
                });
              }}
              required
              placeholder='Username'
            ></TextInput>

            {/* Email Address */}
            <TextInput
              id='email'
              type='email'
              label='Email *'
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
              required
              placeholder='email@example.com'
            ></TextInput>

            {/* Password */}
            <TextInput
              id='password'
              type='password'
              label='Password *'
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
              placeholder='password'
              required
            ></TextInput>

            {/* Repeat Password */}
            <TextInput
              id='rpassword'
              type='password'
              label='Repeat Password *'
              onChange={(e) => {
                setData({
                  ...data,
                  rpassword: e.target.value,
                });
              }}
              placeholder='Repeat password'
              required
            ></TextInput>
            <ul className='list-disc ml-4 text-sm'>
              <li className={`${isOver6 ? 'text-green-600 ' : 'text-warning'}`}>
                Password is more than 6 characters long
              </li>
              <li
                className={`${isNumber ? 'text-green-600 ' : 'text-warning'}`}
              >
                Password has a number
              </li>
              <li className={`${isUpper ? 'text-green-600 ' : 'text-warning'}`}>
                Password has a uppercase character
              </li>
              <li
                className={`${isSymbol ? 'text-green-600 ' : 'text-warning'}`}
              >
                Password has a symbol
              </li>
              <li
                className={`${isMatching ? 'text-green-600 ' : 'text-warning'}`}
              >
                Passwords are matching
              </li>
            </ul>
            <p className='text-opacity-50'>* required</p>

            <Checkbox required id='TnCs'>
              I agree with the{' '}
              <Link href='/TermsAndConditions' passHref>
                <a>terms and conditions</a>
              </Link>
            </Checkbox>
            <ButtonOutline type='submit'>Submit</ButtonOutline>
          </form>
        </LargeContainer>
        <div className='col-span-full flex flex-col justify-center items-center w-full'>
          <span>Already have an account?</span>
          <Link
            href={{
              pathname: '/login',
            }}
            passHref={true}
          >
            <a>Go to login page</a>
          </Link>
        </div>
        <ModalError
          isOpen={isErrorShowing}
          onClose={() => {
            setErrorToShow('');
            setIsErrorShowing(false);
          }}
          error={errorToShow}
        />
      </main>
    );
  } else {
    router.push('/');
  }
}
